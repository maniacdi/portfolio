# Ū Medicina Estética — `umedicinaestetica`

- **URL**: https://umedicinaestetica.com (en producción)
- **Cliente**: Ū Medicina Estética, Paseo de Pereda 36, Santander. Clínica de medicina
  estética y dermatología recién abierta. Segundo teléfono en Bilbao
- **Código**: `DEV/PSUMA/clinica_suma_remoto` (repo privado, cuenta profesional personal)
- **Permiso para publicarlo como caso**: sí
- **Autoría**: hecho por mí desde cero. No parte de la plantilla Showcase
- **Sector sensible**: datos de salud = categoría especial (RGPD art. 9). Condiciona el
  proyecto entero y también lo que se puede publicar en el portfolio

## Qué es en realidad

No es una landing. Son dos cosas en un repo:

**Web pública** (`src/app/[locale]/(website)/`), bilingüe es/en con diccionarios propios:
portada, unidades médicas, tratamientos, clínica, sobre nosotros, blog, divulgación,
contacto, páginas legales y páginas dinámicas por slug.

**Panel de gestión** (`src/app/admin/`), detrás de Clerk: dashboard, agenda, citas,
pacientes, contactos, equipo, servicios, tratamientos, unidades médicas, testimonios,
divulgación, páginas, portada, avisos, Instagram y auditoría de accesos.

**Base de datos**: 27 tablas en Postgres (Neon) con Drizzle. Además del contenido
editable, modela disponibilidad por doctora y días libres, citas, perfiles clínicos,
historia clínica, consentimientos, fotos clínicas, documentos de paciente, presupuestos,
pagos y un log de accesos.

**Automatizaciones** (`src/app/api/cron/`): recordatorios de cita, purga de logs de
acceso y refresco del feed de Instagram.

## Stack real

Next.js (App Router, route groups) · TypeScript · Tailwind + Radix UI · Framer Motion ·
Lenis · Postgres (Neon) + Drizzle ORM · Clerk · Resend + React Email · UploadThing ·
Tiptap · zod + react-hook-form · sanitize-html · Vitest · Vercel + cron

> El blog **no es MDX**. Los artículos viven en la tabla `articles` y se editan con Tiptap
> desde el panel. Corregido: la primera versión de esta ficha decía MDX.

## Hecho ya en el portfolio

- [x] Entrada en `src/app/data/projects.ts`, primera del array, `featured: true`
- [x] `featuredProjects.umedicinaesteticaDesc` en `src/i18n/es.json` y `en.json`
- [x] Carpeta `public/images/projects/umedicinaestetica/`

## Pendiente

- [x] **Portada** `cover.webp` subida y cableada en `data/projects.ts`
- [ ] Galería opcional: `1.webp`…`4.webp` y añadirlas a `images` del JSON
- [ ] **POST del JSON de abajo al backend.** Sin esto sale en la home pero no en `/projects`,
      y el detalle se queda en la versión pobre del fallback
- [ ] **Confirmar qué módulos del panel están en producción de verdad.** El esquema modela
      historia clínica, consentimientos y pagos; el JSON de abajo dice "por fases" para no
      vender de más. Si ya está todo en uso, dilo y lo afino
- [ ] Decidir si el caso menciona explícitamente ficha de paciente e historia clínica.
      Es tu mejor argumento técnico, pero también anuncia que manejas datos de salud

## Documento para el backend

```json
{
  "slug": "umedicinaestetica",
  "title": "Ū Medicina Estética",
  "category": "web",
  "status": "production",
  "featured": true,
  "order": 1,
  "year": 2026,
  "tagline": {
    "es": "Web y sistema de gestión para una clínica de medicina estética",
    "en": "Website and management system for an aesthetic medicine clinic"
  },
  "summary": {
    "es": "Web pública bilingüe más un panel de gestión propio para una clínica recién abierta en Santander: agenda, citas, contenidos y ficha de paciente en el mismo sitio. Next.js con Postgres y Drizzle, desplegado en Vercel. Todo lo que sale en la web lo edita la clínica sin tocar código.",
    "en": "A bilingual public website plus a custom back office for a newly opened clinic in Santander: scheduling, appointments, content and patient records in one place. Next.js with Postgres and Drizzle, deployed on Vercel. Everything on the site is edited by the clinic without touching code."
  },
  "problem": {
    "es": "La clínica acababa de abrir y arrancaba de cero: sin web, con la agenda y el contacto con los pacientes repartidos entre Instagram, WhatsApp y papel. Querían modernizarse y automatizar lo que se pudiera, pero en medicina estética cualquier dato de un paciente es dato de salud, así que la opción fácil (un WordPress con plugins para citas y formularios) traía más problema que solución: cada plugin es una puerta más que mantener actualizada, y aquí una fuga no es un susto, es una sanción.",
    "en": "The clinic had just opened and was starting from zero: no website, with scheduling and patient contact spread across Instagram, WhatsApp and paper. They wanted to modernise and automate what they could, but in aesthetic medicine any patient detail counts as health data, so the easy option — a WordPress with plugins for booking and forms — created more problems than it solved: every plugin is one more door to keep patched, and here a leak isn't a scare, it's a fine."
  },
  "solution": {
    "es": "Un solo Next.js con dos caras. La pública, bilingüe es/en, con las unidades médicas y los tratamientos como secciones navegables, blog y petición de cita a un clic desde cualquier página. La privada, detrás de Clerk, es el panel donde la clínica lleva su agenda, las citas, el equipo, los contenidos y la ficha de paciente; el contenido de la web se edita ahí, no en el código. Debajo, Postgres en Neon con Drizzle: 27 tablas que además de contenido modelan disponibilidad por doctora, consentimientos, historia clínica y un log de accesos, porque con datos de salud hay que poder demostrar quién vio qué. Tres cron jobs se encargan de lo repetitivo: recordatorios de cita, purga de logs viejos y refresco del feed de Instagram. Se entregó por fases, empezando por la web y la petición de cita.",
    "en": "One Next.js app with two faces. The public one, bilingual ES/EN, with medical units and treatments as browsable sections, a blog, and appointment requests one click away from any page. The private one, behind Clerk, is the back office where the clinic runs its calendar, appointments, team, content and patient records; site content is edited there, not in code. Underneath, Postgres on Neon with Drizzle: 27 tables that model not just content but per-doctor availability, consents, clinical records and an access log, because with health data you have to be able to prove who saw what. Three cron jobs handle the repetitive part: appointment reminders, purging old logs and refreshing the Instagram feed. Delivered in phases, starting with the site and appointment requests."
  },
  "stack": [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Radix UI",
    "Postgres (Neon)",
    "Drizzle ORM",
    "Clerk",
    "Resend",
    "UploadThing",
    "Tiptap",
    "Zod",
    "Vitest",
    "Vercel"
  ],
  "demo": "https://umedicinaestetica.com",
  "coverImage": "/images/projects/umedicinaestetica/cover.webp",
  "images": ["/images/projects/umedicinaestetica/cover.webp"],
  "seo": {
    "title": {
      "es": "Ū Medicina Estética — web y gestión para una clínica en Santander",
      "en": "Ū Medicina Estética — website and back office for a clinic in Santander"
    },
    "description": {
      "es": "Caso real: web bilingüe en Next.js y panel de gestión para una clínica de medicina estética. Agenda, citas, contenidos y ficha de paciente con Postgres, Drizzle y Clerk.",
      "en": "Real case study: a bilingual Next.js website and back office for an aesthetic medicine clinic. Scheduling, appointments, content and patient records with Postgres, Drizzle and Clerk."
    },
    "keywords": [
      "web para clínica estética",
      "software de gestión de clínica",
      "web a medida Santander",
      "Next.js",
      "medicina estética Santander"
    ]
  }
}
```

> `images` solo lleva la portada. El detalle filtra la portada de la galería
> (`[slug]/page.tsx:80`), así que ahora no sale galería. Cuando subas `1.webp`…`4.webp`,
> añádelas al array y reaparece.

## RGPD — qué no puede ir al portfolio

- Nada de fotos de pacientes, antes/después ni fotos clínicas
- Ninguna captura del panel con datos reales: ni listado de pacientes, ni agenda con
  nombres, ni contactos, ni el log de accesos. Si quieres mostrar el panel, con datos
  ficticios (hay `db:seed:demo` en el repo del cliente)
- Capturas seguras: web pública, unidades médicas, tratamientos, blog, formulario vacío
