/**
 * Publica en la API del portfolio las fichas de esta carpeta.
 *
 * Lee el bloque ```json``` de cada `docs/projects/<slug>.md` y lo manda al
 * backend. Es idempotente: si el proyecto ya existe lo actualiza (PUT), y si no
 * lo crea (POST). Se puede volver a ejecutar cuando cambies un texto de la ficha.
 *
 * Uso (Git Bash, desde la raíz del repo):
 *
 *   ADMIN_API_KEY=xxxx node docs/projects/publicar.mjs                 # las tres
 *   ADMIN_API_KEY=xxxx node docs/projects/publicar.mjs uskinstore      # solo una
 *   ADMIN_API_KEY=xxxx DRY_RUN=1 node docs/projects/publicar.mjs       # sin escribir
 *
 * La clave se lee del entorno y no se imprime nunca. No la pongas en este archivo.
 */

import { readdirSync,readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.API_URL || "https://portfolio-backend-azure-one.vercel.app";
const KEY = process.env.ADMIN_API_KEY;
const DRY_RUN = !!process.env.DRY_RUN;
const DIR = path.dirname(fileURLToPath(import.meta.url));

if (!KEY && !DRY_RUN) {
  console.error("Falta ADMIN_API_KEY. Ejemplo:\n  ADMIN_API_KEY=xxxx node docs/projects/publicar.mjs");
  process.exit(1);
}

/** Saca el primer bloque ```json``` de una ficha. */
function leerFicha(file) {
  const raw = readFileSync(path.join(DIR, file), "utf8");
  const match = raw.match(/```json\n([\s\S]*?)\n```/);
  if (!match) return null;
  return JSON.parse(match[1]);
}

function todasLasFichas() {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => ({ file: f, doc: leerFicha(f) }))
    .filter(({ doc }) => doc);
}

function fichas() {
  const pedidos = process.argv.slice(2);
  const todas = todasLasFichas();
  return pedidos.length === 0 ? todas : todas.filter(({ doc }) => pedidos.includes(doc.slug));
}

async function api(method, ruta, body) {
  const res = await fetch(`${API}${ruta}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(KEY ? { "x-api-key": KEY } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // respuesta sin cuerpo JSON (404 de plataforma, por ejemplo)
  }
  return { ok: res.ok, status: res.status, data };
}

async function buscarId(slug) {
  const { ok, data } = await api("GET", `/api/projects/slug/${slug}`);
  return ok && data?.data?._id ? data.data._id : null;
}

const pendientes = fichas();

if (pendientes.length === 0) {
  console.error("Ninguna ficha coincide. Slugs disponibles:");
  for (const { doc } of todasLasFichas()) console.error(" -", doc.slug);
  process.exit(1);
}

let fallos = 0;

for (const { file, doc } of pendientes) {
  const id = await buscarId(doc.slug);
  const accion = id ? "actualizar" : "crear";

  if (DRY_RUN) {
    console.log(`[dry-run] ${accion} ${doc.slug} (${file}) — ${doc.status}, ${doc.stack.length} tecnologías`);
    continue;
  }

  const { ok, status, data } = id
    ? await api("PUT", `/api/projects/${id}`, doc)
    : await api("POST", "/api/projects", doc);

  if (ok) {
    console.log(`${accion === "crear" ? "creado" : "actualizado"}: ${doc.slug}`);
  } else {
    fallos++;
    const pista =
      status === 401
        ? "clave incorrecta o ausente"
        : status === 503
          ? "el servidor no tiene ADMIN_API_KEY configurada (¿redesplegaste?)"
          : data?.error || "";
    console.error(`ERROR ${status} en ${doc.slug}${pista ? `: ${pista}` : ""}`);
  }
}

if (fallos > 0) process.exit(1);
console.log(DRY_RUN ? "\nDry-run terminado, nada escrito." : "\nListo. Comprueba /projects.");
