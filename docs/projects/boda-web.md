# Web de boda — `boda-web`

- **URL**: https://elena-y-javier.vercel.app (viva)
- **Cliente**: una amiga y su pareja. Proyecto personal, no encargo comercial
- **Permiso para publicarlo como caso**: sí
- **Código**: `DEV/boda-web`
- **Estado**: entrada ya en `data/projects.ts`. Falta portada y el POST al backend

> Nota: la web lleva `<meta name="robots" content="noindex, nofollow">` (`index.html:6`),
> o sea que está fuera de Google a propósito. Tu portfolio sí se indexa, así que enlazarla
> como `demo` la hace descubrible para quien lea tu portfolio. No rompe el `noindex` de su
> web, pero sí cambia quién puede llegar a ella. Con el permiso dado, queda como aviso: si
> algún día prefieren discreción, la entrada funciona igual sin `demo`, solo con capturas.

## Qué es

SPA en React + Vite con Supabase. Tres partes:

**Web pública** — inicio con cuenta atrás, información de la boda, y confirmación de
asistencia por invitado: alergias, dedicatoria y autobús por tramo.

**Panel privado** en `/diecisiete` — la pareja gestiona invitados, respuestas, textos,
colores y tramos de autobús (`PanelInvitados`, `PanelRespuestas`, `PanelTextos`,
`PanelColores`, `PanelTramos`). Un solo usuario compartido en Supabase Auth; la contraseña
no está en el código.

**Aviso de dedicatorias** — una Edge Function que dispara un Database Webhook sobre
`invitados`: cuando alguien deja una dedicatoria al confirmar, sale un correo por **Brevo**
a las direcciones que la pareja tenga puestas en el panel. Secretos en Edge Functions →
Secrets: `WEBHOOK_SECRET`, `BREVO_API_KEY`, `BREVO_REMITENTE`.

## La parte técnica que merece contarse

Los datos de los invitados **no son legibles públicamente**, y aun así un invitado puede
responder sin cuenta. Se resuelve con RLS y funciones de base de datos, no con lógica en
el navegador:

- `wedding_config` y `tramos_bus`: lectura pública, escritura solo para la pareja
- `invitados` e `invitado_tramos`: sin acceso público. Ni lectura ni escritura directa
- El invitado responde a través de RPC (`mi_respuesta`, `responder_invitado`), que es la
  única vía de entrada a esa tabla
- El aviso por correo va en una Edge Function y no en el cliente por dos razones: la API
  key del proveedor de correo no puede viajar al navegador, y disparar desde la base de
  datos significa que el aviso no depende de que el invitado deje la pestaña abierta ni se
  puede falsear desde fuera

## Stack

React · TypeScript · Vite · React Router · Supabase (Postgres + Auth + RLS + Edge
Functions) · Brevo · Vitest · Vercel

## Hecho ya en el portfolio

- [x] Entrada en `src/app/data/projects.ts` (antes de `portfolio`, `status: "production"`,
      `demo` a la URL de Vercel, sin `repo`)
- [x] `featuredProjects.bodaWebDesc` en `src/i18n/es.json` y `en.json`
- [x] Carpeta `public/images/projects/boda-web/`
- [x] Brevo añadido al carrusel de tecnologías

## Pendiente

- [x] **Permiso de Elena y su pareja** — dado
- [x] **Portada** subida y cableada
- [ ] Galería opcional: `1.webp`…`4.webp` y añadirlas a `images` del JSON
- [ ] **POST del JSON de abajo al backend** (si no, no aparece en `/projects`)
- [ ] Slug: dejé `boda-web` en vez de `elena-y-javier` para no meter sus nombres en la URL
      ni en el SEO de tu portfolio. La URL de la demo ya los lleva, así que si a ellos les
      da igual, se cambia
- [ ] ¿Dominio propio, o se queda en `vercel.app`?

## Privacidad — decidir antes de publicar

Es la única de las tres que expone datos de terceros por su propia naturaleza: la tabla
`invitados` guarda nombres, alergias y dedicatorias.

- **Ninguna captura del panel con datos reales.** Ni lista de invitados, ni respuestas, ni
  dedicatorias. Datos ficticios o nada
- Capturas seguras: inicio, cuenta atrás, información de la boda, formulario vacío
- Si la web acaba con acceso restringido, el `demo` del portfolio no puede ser la URL
  privada. Opciones: entrada sin `demo` (solo capturas) o una demo con datos inventados

## Documento para el backend

Listo para el POST tal cual.

```json
{
  "slug": "boda-web",
  "title": "Web de boda",
  "category": "web",
  "status": "production",
  "featured": false,
  "order": 5,
  "year": 2026,
  "tagline": {
    "es": "Web de boda con confirmación de asistencia y panel para los novios",
    "en": "A wedding website with RSVP and a back office for the couple"
  },
  "summary": {
    "es": "SPA en React + Vite con Supabase: información de la boda, confirmación por invitado con alergias, dedicatoria y autobús por tramo, y un panel privado donde la pareja lleva invitados, textos, colores y autobuses sin tocar código.",
    "en": "A React + Vite SPA with Supabase: wedding information, per-guest RSVP with allergies, a message and a bus leg, and a private back office where the couple manages guests, copy, colours and buses without touching code."
  },
  "problem": {
    "es": "Organizar una boda acaba siendo un grupo de WhatsApp y una hoja de cálculo: quién viene, quién no come gluten, quién coge el autobús y desde dónde. La información se repite, se contradice y siempre falta la última versión. Y para una web así hay dos caminos malos: una plantilla de pago que no deja tocar nada, o algo a medida que luego solo puedo actualizar yo cada vez que cambian una hora o un color.",
    "en": "Organising a wedding ends up being a WhatsApp group and a spreadsheet: who's coming, who avoids gluten, who takes the bus and from where. The information gets duplicated, contradicts itself, and the latest version is always missing. And for a site like this there are two bad options: a paid template you can't really change, or something custom that only I can update every time they change a time or a colour."
  },
  "solution": {
    "es": "Una SPA ligera en Vite con Supabase detrás, y un panel en una ruta privada para que la pareja se lo administre sola: invitados, respuestas, textos, colores y tramos de autobús. La parte interesante es cómo se protegen los datos de los invitados: la tabla no es legible públicamente y aun así un invitado puede responder sin crearse cuenta, porque la única entrada a esa tabla son funciones de base de datos, y las políticas de RLS dejan lectura pública solo a la configuración y los tramos. El aviso de dedicatorias sale de una Edge Function que dispara un webhook de la base de datos, no del navegador: así la clave del proveedor de correo no viaja al cliente y el aviso no depende de que el invitado deje la pestaña abierta.",
    "en": "A light Vite SPA with Supabase behind it, plus a back office on a private route so the couple can run it themselves: guests, replies, copy, colours and bus legs. The interesting part is how guest data is protected: the table isn't publicly readable, yet a guest can still reply without creating an account, because the only way into that table is through database functions, and the RLS policies grant public reads only to the config and the bus legs. The message notification comes from an Edge Function triggered by a database webhook rather than from the browser: that way the mail provider's key never reaches the client and the notification doesn't depend on the guest leaving the tab open."
  },
  "stack": [
    "React",
    "TypeScript",
    "Vite",
    "React Router",
    "Supabase",
    "Postgres",
    "Row Level Security",
    "Edge Functions",
    "Brevo",
    "Vitest",
    "Vercel"
  ],
  "demo": "https://elena-y-javier.vercel.app",
  "coverImage": "/images/projects/boda-web/cover.webp",
  "images": ["/images/projects/boda-web/cover.webp"],
  "seo": {
    "title": {
      "es": "Web de boda con confirmación de asistencia y panel de gestión",
      "en": "Wedding website with RSVP and a management back office"
    },
    "description": {
      "es": "Caso real: web de boda en React + Vite con Supabase, confirmación por invitado, autobuses por tramo y panel privado para la pareja.",
      "en": "Real case study: a wedding website in React + Vite with Supabase, per-guest RSVP, bus legs and a private back office for the couple."
    },
    "keywords": [
      "web de boda",
      "confirmación de asistencia",
      "React",
      "Supabase",
      "Row Level Security"
    ]
  }
}
```
