---
title: "Showcase: una plantilla para vender webs a comercios sin empezar de cero cada vez"
date: "2026-06-30"
excerpt: "Cada negocio local pide casi lo mismo: una web rápida, una tienda, reservar citas y un panel para gestionarlo. En vez de rehacerlo en cada cliente, me monté una base reescalable. Esto es Showcase."
tags: ["Next.js", "TypeScript", "SEO", "Plantilla", "Side project"]
cover: "/images/projects/showcase/cover.webp"
relatedProject: "showcase"
---

Cuando le enseñas opciones a un comercio local —una clínica, un restaurante, una tienda de barrio— casi siempre necesitan lo mismo: una web que cargue rápido, que se vea bien en el móvil, que aparezca en Google y, según el negocio, una tienda online o un sistema para reservar cita. Rehacer eso desde cero en cada cliente es tirar el tiempo. Así que me hice **Showcase**: una base limpia y reescalable que adapto a cada uno.

## La idea

Una sola plantilla con las cuatro piezas que más piden los negocios locales, cada una como demo funcional:

- **Landing de servicios** — negocio local con servicios, precios y contacto.
- **Tienda online** — catálogo, ficha de producto y carrito.
- **Reservas y citas** — calendario y reserva de cita.
- **Panel de administración** — gestión de citas y productos tras iniciar sesión.

El [demo está aquí](https://magaldi-showcase.vercel.app/). Son esquemas funcionales, no el diseño final: cada proyecto se adapta a la identidad, el contenido y las necesidades del cliente.

![Hub de demos de Showcase: landing, tienda, reservas y panel](/images/projects/showcase/1.webp)

![Tienda online con catálogo, producto y carrito](/images/projects/showcase/2.webp)

![Panel de administración: gestión de citas y productos](/images/projects/showcase/3.webp)

![Pantalla de inicio de sesión del panel](/images/projects/showcase/4.webp)

## El stack

- **Next.js + TypeScript** — App Router, renderizado en servidor y rutas estáticas donde tiene sentido.
- **SCSS modular** con patrón Container/Layout para separar lógica de presentación.
- **next-intl** — bilingüe (ES/EN) desde el primer día.
- **Auth con login** para el panel de administración.
- **SEO** cuidado: metadatos, Open Graph y datos estructurados.

## Por qué una plantilla y no un WordPress

Un negocio local no necesita el peso ni los plugins de un CMS genérico. Necesita una web rápida, accesible y que posicione — ya conté [por qué una web a medida rinde mejor que WordPress](/blog/web-a-medida-vs-wordpress). Partir de una base propia me da control total del rendimiento (Lighthouse alto, carga por debajo del segundo) y me deja entregar más rápido: cambio marca, colores, tipografías, contenido y verticales desde puntos centralizados, sin reescribir la arquitectura.

Y ojo: la plantilla es el punto de partida, no el producto. El diseño, las secciones y las funcionalidades finales las decide cada cliente; la base solo me ahorra la parte que nadie ve.

## Lo que me llevo

- Construir para reutilizar cambia el diseño: centralizar marca, textos, datos y temas obliga a separar bien lo que cambia de lo que no.
- Menos piezas, más velocidad. Sin CMS pesado, la web vuela y mantenerla es trivial.
- Una base sólida se vende mejor: enseñar un demo real que ya funciona convence más que una propuesta sobre papel.

El detalle técnico y las capturas están en la [página del proyecto](/projects/showcase). ¿Tienes un negocio y quieres algo así? [Escríbeme](/#contacto).
