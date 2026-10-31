---
title: "Cómo cambiar de web sin perder posicionamiento en Google"
seoTitle: "Cómo cambiar de web sin perder posicionamiento en Google"
date: "2027-07-27"
excerpt: "Redirecciones, URLs, metadatos y Search Console: la lista de comprobación para lanzar una web nueva sin perder las visitas que ya te llegaban."
tags: ["SEO", "Desarrollo web", "Negocios", "Guía"]
---

Estrenas web. Más bonita, más rápida, con fotos nuevas. Durante dos semanas todo va bien, y de repente el teléfono suena menos. Miras Google y tu página de «fisioterapia deportiva», la que llevaba años saliendo arriba, ya no aparece. Quien busca pincha en el resultado antiguo y le sale un error 404.

Es lo que pasa cuando se cambia de web sin pensar en lo que ya funcionaba. La buena noticia: migrar una web sin perder SEO es, sobre todo, cuestión de orden: una lista y no saltarse pasos.

## Antes de tocar nada: el inventario

Lo primero es saber qué tienes. Y no me refiero a las páginas que ves en el menú, sino a todas las URLs que Google conoce y que reciben visitas.

- Exporta desde Google Search Console las páginas con clics de los últimos meses. Son las que no te puedes permitir perder.
- Saca la lista completa de URLs: el sitemap actual, un rastreo de la web o, si no hay otra cosa, recorriéndola a mano.
- Apunta el título y la descripción de las páginas que mejor funcionan. Si la nueva web los cambia sin motivo, también cambia lo que Google entiende de ellas.

Si en este punto descubres que no tienes Search Console conectado, conéctalo ya, antes de la migración. Te va a hacer falta para comparar el antes y el después.

## Redirecciones 301: la base para migrar la web sin perder SEO

Este es el paso que más se salta, y el que más daño hace. Cada URL antigua tiene que llevar a su equivalente en la web nueva con una redirección 301, que le dice a Google «esto se ha mudado aquí para siempre» y le pasa lo que había ganado esa página.

Un mapa de redirecciones es, literalmente, una tabla de dos columnas: URL antigua, URL nueva. Unas reglas:

- Cada página a su equivalente más parecido. Redirigir todo a la portada es casi lo mismo que borrarlo: Google lo trata como si la página hubiera desaparecido.
- Redirecciones permanentes (301 o 308), no temporales.
- Sin cadenas: si la URL A iba a B y ahora B va a C, haz que A vaya directamente a C.
- Si una página antigua no tiene equivalente y no recibía visitas, puede devolver 404 sin drama.

Si puedes mantener las URLs que ya funcionan, mejor que redirigirlas. Una URL que no cambia no hay que redirigirla.

## Lo que se pierde por el camino sin que nadie se dé cuenta

Además de las URLs, en una migración hay cosas que se caen sin hacer ruido:

- Títulos y meta descripciones, que vuelven a «Inicio» o al nombre de la plantilla.
- Textos de las páginas de servicio. Si la página que posicionaba tenía 600 palabras útiles y la nueva tiene tres líneas y una foto, perderás posiciones aunque la redirección sea perfecta.
- Datos estructurados, que el desarrollador anterior había puesto y la plantilla nueva no trae.
- Enlaces internos que siguen apuntando a URLs antiguas.

Y el clásico: la etiqueta `noindex` que se pone mientras la web está en pruebas para que Google no la vea… y que se queda puesta el día del lanzamiento. Con eso le estás pidiendo a Google que te saque de los resultados. Pasa más de lo que parece.

## Cambio de dominio: un paso más

Si además de la web cambias de dominio (de tunegocio.es a tunegocio.com, por ejemplo), la lista crece:

- Redirecciones 301 de todas las URLs del dominio antiguo a las del nuevo, página a página.
- La herramienta de cambio de dirección de Search Console, con los dos dominios verificados.
- No dejes caducar el dominio antiguo. Google recomienda mantener las redirecciones al menos un año; yo lo mantendría bastante más, porque hay enlaces y tarjetas impresas que no vas a poder cambiar.
- Actualiza el enlace en tu ficha de Google, en las redes y en los directorios donde aparezcas.

## El día del lanzamiento y las semanas siguientes

El día que se publica:

- Comprueba a mano diez URLs antiguas importantes. Tienen que llevar a la nueva, de un salto.
- Revisa que no quede ningún `noindex` y que el robots.txt no bloquee nada que deba verse.
- Sube el sitemap nuevo a Search Console.
- Comprueba que la analítica sigue midiendo.

Las semanas siguientes, mira en Search Console los errores 404 y las páginas que caen en clics. Es normal que haya algo de movimiento las primeras semanas. Si a las cuatro o seis semanas una página importante sigue sin recuperarse, hay que mirar qué ha cambiado en ella.

## Si estás pensando en cambiar de web

Antes de decidir el cambio, merece la pena saber si de verdad hace falta: en [cuándo rediseñar la web de tu negocio](/blog/cuando-redisenar-web) cuento las señales que yo miraría. Y si el cambio incluye pasar de WordPress a otra cosa (o al revés), en [web a medida o WordPress](/blog/web-a-medida-vs-wordpress) tienes la comparativa.

Si me toca sustituir una web, el inventario y las redirecciones son lo primero que preparo: es la parte poco vistosa que evita perder lo que ya tenías. La parte local de todo esto la tienes en la [guía de SEO local](/blog/seo-local-negocios). Si vas a cambiar de web y quieres hacerlo con cuidado, tienes cómo trabajo en [diseño web para negocios](/servicios/web-para-negocios), o [escríbeme](/#contacto) y repasamos tu caso.
