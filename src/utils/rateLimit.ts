/**
 * Rate limit en memoria, por clave y con varias ventanas a la vez.
 *
 * En memoria significa por instancia: en Vercel cada lambda tiene su propio
 * mapa y un arranque en frío lo vacía, así que esto frena el abuso normal
 * (alguien dándole al chat en bucle) pero no a quien reparta las peticiones a
 * propósito. Para eso hace falta un contador compartido (Upstash/Redis);
 * mientras no lo haya, este módulo es la única barrera.
 */

export interface RateLimitWindow {
  /** Peticiones permitidas dentro de la ventana. */
  limit: number;
  /** Tamaño de la ventana en milisegundos. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Segundos que faltan para que se libere la ventana que ha bloqueado. */
  retryAfterSeconds: number;
}

interface Counter {
  count: number;
  resetAt: number;
}

const counters = new Map<string, Counter>();

/** Cada cuánto se barren las entradas caducadas del mapa. */
const PURGE_INTERVAL = 5 * 60_000;
let nextPurgeAt = 0;

function purgeExpired(now: number) {
  if (now < nextPurgeAt) return;
  nextPurgeAt = now + PURGE_INTERVAL;

  for (const [key, counter] of counters) {
    if (now > counter.resetAt) {
      counters.delete(key);
    }
  }
}

/**
 * Consume una petición para `key`. Bloquea si cualquiera de las ventanas está
 * agotada, y solo suma en todas ellas si ninguna lo está: así una ventana
 * agotada no sigue engordando el contador de las demás.
 */
export function consume(
  key: string,
  windows: RateLimitWindow[],
  now: number = Date.now()
): RateLimitResult {
  purgeExpired(now);

  const entries = windows.map((window) => {
    const mapKey = `${window.windowMs}:${key}`;
    const counter = counters.get(mapKey);
    const live = counter && now <= counter.resetAt ? counter : undefined;
    return { window, mapKey, live };
  });

  const blocked = entries.find(({ window, live }) => live && live.count >= window.limit);

  if (blocked?.live) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((blocked.live.resetAt - now) / 1000)),
    };
  }

  for (const { window, mapKey, live } of entries) {
    if (live) {
      live.count++;
    } else {
      counters.set(mapKey, { count: 1, resetAt: now + window.windowMs });
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * IP del cliente a partir de las cabeceras del proxy. `x-forwarded-for` llega
 * como "cliente, proxy1, proxy2": la primera es la que pone Vercel y la que
 * identifica a quien llama. Sin cabecera se devuelve `null` para que quien
 * llame decida (agrupar todo lo desconocido en una sola clave permitiría
 * agotarle la cuota a los demás).
 */
export function clientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return headers.get("x-real-ip")?.trim() || null;
}
