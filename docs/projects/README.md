# Fichas de proyectos

Los proyectos del portfolio **no viven en este repo**. `src/app/services/projectsService.ts`
los pide a la API (`/api/projects`, Mongo; código en `DEV/portfolio-backend`).
`src/app/data/projects.ts` es solo el fallback que se usa cuando la API falla o devuelve vacío.

Consecuencia práctica:

| Sitio | De dónde saca los datos |
|---|---|
| Home (`FeaturedProjects.tsx`) | `data/projects.ts` **directo** |
| `/projects` (listado) | API. Si la API responde, el fallback no se usa |
| `/projects/[slug]` (detalle) | API; si no está, cae al fallback y sale la versión pobre (sin `tagline`/`problem`/`solution`/galería) |
| `sitemap.xml` | API |

Por eso añadir un proyecto son **tres pasos**, y el orden importa:

1. **POST del documento al backend** (el JSON de cada ficha de esta carpeta).
2. Entrada en `src/app/data/projects.ts` + `<slug>Desc` en `src/i18n/es.json` y `en.json`.
3. Imágenes en `public/images/projects/<slug>/` (`cover.webp` + `1.webp`…`4.webp`).

Si solo haces el paso 2, el proyecto sale en la home pero el detalle queda cojo y no
aparece en el listado.

## Campos del modelo

El esquema manda: `DEV/portfolio-backend/src/models/Project.ts`.

- Obligatorios: `slug` (kebab-case, único), `title` (≤100), `category`
  (`web`|`mobile`|`game`), `status` (`production`|`development`|`daily`), `tagline` y
  `summary` (ambos con `es` y `en`).
- Opcionales que conviene rellenar: `problem`, `solution`, `stack[]`, `demo`, `repo`,
  `coverImage`, `images[]`, `featured`, `order`, `year`, `seo`.
- `order` ordena el listado (`order: 1, createdAt: -1`). Los cinco existentes usan 1..5.

Para el POST puedes seguir el patrón de `DEV/portfolio-backend/src/scripts/seedProjects.ts`,
que ya escribe documentos con esta forma.

## Estado

| Proyecto | Slug | Estado |
|---|---|---|
| Ū Medicina Estética | `umedicinaestetica` | En producción. Pasos 2 y 3 hechos; **falta el POST** |
| Ū Skin Store | `uskinstore` | En producción (entrada con contraseña por ahora). Pasos 2 y 3 hechos; **falta el POST**. Gating sin desplegar |
| Web de boda | `boda-web` | Viva en `elena-y-javier.vercel.app`, con permiso. Pasos 2 y 3 hechos; **falta el POST** |

## Cómo hacer el POST

Las rutas de escritura del backend ya piden clave (`requireApiKey`). Antes de poder crear
proyectos hay que configurarla:

1. Generar la clave: `openssl rand -hex 32`
2. Ponerla como `ADMIN_API_KEY` en las variables de entorno de Vercel del backend, y en
   el `.env` local
3. Redesplegar el backend

Y entonces:

```bash
curl -X POST https://portfolio-backend-azure-one.vercel.app/api/projects \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ADMIN_API_KEY" \
  -d @umedicinaestetica.json
```

(El JSON de cada ficha está en el bloque ```json``` correspondiente; extráelo a un archivo.)

Si `ADMIN_API_KEY` no está configurada en el servidor, la escritura responde `503`: falla
cerrada a propósito, para que no quede abierta por olvido.
