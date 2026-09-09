# Ū Skin Store — `uskinstore`

- **URL**: https://uskinstore.com (en producción; de momento la entrada pide contraseña,
  redirige a `/password` hasta que se abra al público)
- **Cliente**: el mismo que `umedicinaestetica` (Ū Medicina Estética, Santander)
- **Código**: `DEV/PSUMA/SUMA` (tema Liquid) y `DEV/PSUMA/suma-gating-app` (app Shopify)
- **Autoría del tema**: **90% mío, 10% del dev anterior**. Dejó un esqueleto sobre Prestige
  y nada de la configuración de Shopify; lo poco que había estaba mal
- **Estado**: entrada ya en `data/projects.ts` con `status: "production"` y `demo` puesto.
  La app de gating sigue sin desplegar (`shopify.app.toml:7` con
  `application_url = "https://REEMPLAZAR.vercel.app"`)

## Qué es

Tienda Shopify de cosmética y dermofarmacia para la clínica. Tres piezas que se despliegan
por separado:

**1. Tema Liquid a medida** (`PSUMA/SUMA`) — sobre Prestige. Es la única parte del proyecto
que **no** arranca de cero, y aun así el reparto acabó en 90% mío, 10% suyo: del esqueleto
que dejó quedó poco, y de configuración de Shopify no había nada hecho. La auditoría del
estado en que llegó está en `PSUMA/AUDITORIA-TEMA-SUMA.md`.

**2. Gating de productos con contraseña** (`PSUMA/suma-gating-app`) — la chicha técnica.
Las marcas de distribución selectiva exigen que su venta online no sea indiscriminada: esos
productos solo se pueden comprar con un código que da la clínica. Defensa en tres capas:

| Capa | Qué hace | Por qué |
|---|---|---|
| Tema (snippets en `theme/`) | Oculta y bloquea el producto en la tienda | UX. Se puede saltar, no es seguridad |
| App Proxy (`/api/gating/validate`) | **La única capa que valida** el código | Firma HMAC de Shopify verificada; el permiso se guarda en el cliente (metafield `gating.unlocked`), no en el carrito |
| Shopify Validation Function (`extensions/gating-validation`) | Bloquea el checkout | Corre en Shopify: no hay forma de esquivarla desde el front |

Los códigos se hashean con scrypt + pimienta, hay rate limit por cliente y por IP, y el
estado vive en Postgres con Drizzle. El checkout sigue siendo de Shopify (personalizarlo
entero pide Shopify Plus, ~2.300 €/mes: no compensa para una clínica pequeña).

**3. Automatización del catálogo** (`PSUMA/scripts/`, Python) — clasificación del catálogo,
generación de colecciones, CSV para Matrixify, partición de los ficheros para subirlos y
mapeo de fotos de producto al CDN. Es lo que convierte un Excel de catálogo en una tienda
cargada sin meter productos a mano.

## Stack

Shopify (tema Liquid sobre Prestige) · Shopify Functions · App Proxy + Admin API ·
Next.js (la app de gating) · TypeScript · Postgres + Drizzle ORM · Zod · scrypt ·
Python (scripts de catálogo) · Matrixify · Vercel

## Decisiones ya cerradas

- **Ruta A (full Shopify con tema Liquid), no headless.** Estaba abierto y se decidió A:
  más rápida, más barata, la clínica lo gestiona sola y baja la superficie de seguridad
  que asumes tú. Esto ya no es una duda del proyecto

## Hecho ya en el portfolio

- [x] `uskinstore.com` en producción (con contraseña de entrada por ahora)
- [x] Entrada en `src/app/data/projects.ts` (`status: "production"`, `demo` puesto, sin `repo`)
- [x] Reparto de autoría del tema cerrado: 90/10
- [x] `featuredProjects.uskinstoreDesc` en `src/i18n/es.json` y `en.json`
- [x] Carpeta `public/images/projects/uskinstore/`

## Pendiente

- [ ] **Quitar la contraseña de entrada** cuando se abra al público. La entrada del portfolio
      no hay que tocarla: el `demo` ya apunta al dominio bueno
- [ ] **App de gating desplegada** y `application_url` real en `shopify.app.toml`. Mientras
      no lo esté, el gancho técnico del caso no se puede demostrar en vivo
- [x] Portada subida y cableada
- [ ] Galería opcional: `1.webp`…`4.webp` y añadirlas a `images` del JSON
- [ ] POST del JSON de abajo al backend
- [ ] Enlazar con el caso de la clínica: mismo cliente, se cuentan mejor juntos

## Documento para el backend

Listo para el POST tal cual.

```json
{
  "slug": "uskinstore",
  "title": "Ū Skin Store",
  "category": "web",
  "status": "production",
  "featured": true,
  "order": 2,
  "year": 2026,
  "tagline": {
    "es": "Tienda Shopify con productos bajo contraseña para una clínica estética",
    "en": "A Shopify store with password-gated products for an aesthetic clinic"
  },
  "summary": {
    "es": "Tienda de cosmética y dermofarmacia para Ū Medicina Estética, con una parte del catálogo que solo se puede comprar con un código que da la clínica. Tema Liquid a medida, app propia de gating con Shopify Functions y el catálogo cargado con scripts en vez de a mano.",
    "en": "A cosmetics and dermo-pharmacy store for Ū Medicina Estética, where part of the catalogue can only be bought with a code the clinic hands out. Custom Liquid theme, a purpose-built gating app using Shopify Functions, and a catalogue loaded by scripts instead of by hand."
  },
  "problem": {
    "es": "La clínica quería vender online los productos que ya recomendaba en consulta, pero las marcas de distribución selectiva no dejan venderlos a cualquiera: si el producto está a un clic para todo el mundo, se incumple el acuerdo con la marca. La solución típica de tienda —ocultar el producto en el tema— no vale: cualquiera con el enlace directo o la API llega al carrito igual. Y el catálogo eran miles de referencias en un Excel, imposible de meter a mano.",
    "en": "The clinic wanted to sell online the products it already recommended in consultation, but selective-distribution brands don't allow selling them to just anyone: if the product is one click away for everybody, the agreement with the brand is broken. The usual storefront trick — hiding the product in the theme — doesn't cut it: anyone with the direct link or the API still reaches the cart. And the catalogue was thousands of references in a spreadsheet, impossible to enter by hand."
  },
  "solution": {
    "es": "El tema venía empezado por otro desarrollador sobre Prestige, pero de configuración de Shopify no había nada y lo poco que había estaba mal, así que de lo que hay ahora nueve de cada diez partes son mías. Lo que sí es entero mío es el gating, y ahí está la chicha: tres capas, con la validación fuera del tema. El tema solo oculta y avisa; la única capa que valida el código es un endpoint por App Proxy que comprueba la firma HMAC de Shopify, y el permiso se guarda en el cliente (metafield), no en el carrito, para que no se pierda ni se falsifique. La última palabra la tiene una Validation Function corriendo en Shopify, que bloquea el checkout aunque alguien se salte todo el front. Los códigos van hasheados con scrypt más pimienta, con límite de intentos por cliente y por IP. Aparte, unos scripts en Python clasifican el catálogo, generan las colecciones y los CSV de Matrixify y parten los ficheros para subirlos: el Excel del proveedor entra por un lado y la tienda queda cargada por el otro.",
    "en": "The theme had been started by another developer on top of Prestige, but none of the Shopify configuration was in place and what little existed was wrong, so nine tenths of what is there now is mine. What is entirely mine is the gating, and that is where the real work is: three layers, with validation living outside the theme. The theme only hides and warns; the single layer that validates a code is an App Proxy endpoint that verifies Shopify's HMAC signature, and the grant is stored on the customer (a metafield) rather than the cart, so it can't be lost or forged. The last word belongs to a Validation Function running inside Shopify, which blocks checkout even if someone bypasses the whole front end. Codes are hashed with scrypt plus a pepper, with attempt limits per customer and per IP. Alongside that, Python scripts classify the catalogue, generate collections and Matrixify CSVs and split the files for upload: the supplier's spreadsheet goes in one end and the store comes out loaded at the other."
  },
  "demo": "https://uskinstore.com",
  "stack": [
    "Shopify",
    "Liquid",
    "Shopify Functions",
    "Shopify Admin API",
    "Next.js",
    "TypeScript",
    "Postgres",
    "Drizzle ORM",
    "Python",
    "Vercel"
  ],
  "coverImage": "/images/projects/uskinstore/cover.webp",
  "images": ["/images/projects/uskinstore/cover.webp"],
  "seo": {
    "title": {
      "es": "Ū Skin Store — tienda Shopify con productos bajo contraseña",
      "en": "Ū Skin Store — a Shopify store with password-gated products"
    },
    "description": {
      "es": "Caso real: tienda Shopify para una clínica estética con gating de productos de distribución selectiva, Shopify Functions y carga de catálogo automatizada.",
      "en": "Real case study: a Shopify store for an aesthetic clinic with gating for selective-distribution products, Shopify Functions and automated catalogue loading."
    },
    "keywords": [
      "tienda online Shopify",
      "productos con contraseña Shopify",
      "distribución selectiva",
      "Shopify Functions",
      "e-commerce cosmética"
    ]
  }
}
```

## Nota de seguridad para las capturas

Ni códigos de gating reales ni sus hashes, ni el valor de la pimienta, ni URLs del App
Proxy con firma. Si sale la pantalla de canje de código, con un código de prueba.
