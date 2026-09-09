import { describe, expect, it } from "vitest";

import { clientIp, consume } from "@/utils/rateLimit";

/**
 * Rate limit del endpoint del chat.
 *
 * `consume` acepta un `now` inyectable, así que no hace falta tocar los timers:
 * se avanza el reloj a mano.
 */

const ONE_MINUTE = 60_000;

describe("consume", () => {
  it("deja pasar hasta el límite y bloquea la siguiente", () => {
    const key = `bajo-limite-${Math.random()}`;
    const windows = [{ limit: 3, windowMs: ONE_MINUTE }];

    expect(consume(key, windows, 0).allowed).toBe(true);
    expect(consume(key, windows, 0).allowed).toBe(true);
    expect(consume(key, windows, 0).allowed).toBe(true);

    const blocked = consume(key, windows, 0);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(60);
  });

  it("vuelve a permitir cuando la ventana caduca", () => {
    const key = `caduca-${Math.random()}`;
    const windows = [{ limit: 1, windowMs: ONE_MINUTE }];

    expect(consume(key, windows, 0).allowed).toBe(true);
    expect(consume(key, windows, ONE_MINUTE - 1).allowed).toBe(false);
    expect(consume(key, windows, ONE_MINUTE + 1).allowed).toBe(true);
  });

  it("aísla claves distintas", () => {
    const windows = [{ limit: 1, windowMs: ONE_MINUTE }];
    const a = `aislada-a-${Math.random()}`;
    const b = `aislada-b-${Math.random()}`;

    expect(consume(a, windows, 0).allowed).toBe(true);
    expect(consume(a, windows, 0).allowed).toBe(false);
    expect(consume(b, windows, 0).allowed).toBe(true);
  });

  it("bloquea por la ventana larga aunque la corta esté libre", () => {
    const key = `dos-ventanas-${Math.random()}`;
    const windows = [
      { limit: 2, windowMs: ONE_MINUTE },
      { limit: 3, windowMs: 60 * ONE_MINUTE },
    ];

    // Dos por minuto, en dos minutos distintos: 3 consumidas en la ventana larga.
    expect(consume(key, windows, 0).allowed).toBe(true);
    expect(consume(key, windows, 0).allowed).toBe(true);
    expect(consume(key, windows, ONE_MINUTE + 1).allowed).toBe(true);

    // La ventana corta está libre, pero la de la hora ya no.
    const blocked = consume(key, windows, ONE_MINUTE + 2);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(60);
  });

  it("no gasta cuota de las demás ventanas cuando una ya bloquea", () => {
    const key = `sin-doble-gasto-${Math.random()}`;
    const windows = [
      { limit: 1, windowMs: ONE_MINUTE },
      { limit: 5, windowMs: 60 * ONE_MINUTE },
    ];

    expect(consume(key, windows, 0).allowed).toBe(true);
    // Cuatro rechazos por la ventana corta no deben agotar la larga.
    for (let i = 0; i < 4; i++) {
      expect(consume(key, windows, 1_000).allowed).toBe(false);
    }
    // Pasado el minuto sigue habiendo cuota en la ventana de la hora.
    expect(consume(key, windows, ONE_MINUTE + 1).allowed).toBe(true);
  });
});

describe("clientIp", () => {
  it("coge la primera IP de x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178" });
    expect(clientIp(headers)).toBe("203.0.113.5");
  });

  it("cae a x-real-ip si no hay x-forwarded-for", () => {
    expect(clientIp(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("devuelve null sin cabeceras de proxy", () => {
    expect(clientIp(new Headers())).toBeNull();
  });
});
