---
title: "PWA o app nativa: ventajas, límites y cuándo elegir cada una"
seoTitle: "PWA o app nativa: ventajas, límites y cuándo elegir"
date: "2027-08-17"
excerpt: "Qué es una aplicación web progresiva, qué puede hacer hoy en iOS y Android y cuándo es una alternativa más barata a publicar una app en las tiendas."
tags: ["Apps móviles", "PWA", "Desarrollo web", "Negocios"]
---

Quieres que tus clientes tengan tu negocio en la pantalla de inicio del móvil, con su icono, pero el presupuesto de una app en las tiendas se te va. Alguien te habla de las PWA: "es una web, pero se instala como una app". Suena a tener lo mejor de los dos mundos. A veces lo es. Comparar PWA vs app nativa con honestidad pasa por saber qué hace bien cada una y, sobre todo, qué no hace una PWA en iPhone.

## Qué es una PWA

Una PWA (aplicación web progresiva) es una web construida para comportarse como una app: se puede añadir a la pantalla de inicio, se abre a pantalla completa sin la barra del navegador, puede guardar datos para funcionar parcialmente sin conexión y, en algunos casos, enviar notificaciones.

Por dentro sigue siendo una web: un único código que funciona en cualquier móvil y en el ordenador, que se actualiza al instante para todos y que Google puede indexar. No pasa por App Store ni por Google Play, así que no hay revisión, ni cuentas de desarrollador, ni comisiones de tienda.

## Lo que una PWA hace bien

- Coste: es un solo desarrollo, y si ya vas a tener una web, buena parte del trabajo está hecho.
- Actualizaciones: publicas y todos tienen la versión nueva la próxima vez que la abren. Sin esperar revisiones.
- Se encuentra en Google: tu cliente llega desde una búsqueda, la usa y, si le gusta, la instala. Con una app, primero hay que convencerle de descargarla.
- Funciona en todas partes: Android, iPhone, ordenador. Mismo enlace.

## Los límites, sobre todo en iPhone

Aquí está el matiz que casi nadie cuenta al vender una PWA. En Android, con Chrome, la experiencia está muy cerca de la de una app: el navegador ofrece instalarla, tiene acceso a bastantes funciones del teléfono e incluso se puede publicar en Google Play envuelta como app.

En iPhone es otra historia:

- No hay aviso automático de instalación. El usuario tiene que ir al menú de compartir y elegir "Añadir a pantalla de inicio". La mayoría de la gente no sabe que existe.
- Las notificaciones push funcionan desde iOS 16.4, pero solo si el usuario ha instalado antes la PWA en la pantalla de inicio. Desde Safari sin instalar, no.
- Funciones como Bluetooth o NFC desde la web no están disponibles en iPhone.
- Las tareas en segundo plano son muy limitadas: si la PWA no está abierta, prácticamente no hace nada.
- Safari puede borrar los datos guardados de webs que no se usan en un tiempo, aunque las PWA instaladas están más protegidas. Para una app que dependa de guardar datos en el móvil, es un riesgo a tener en cuenta.

Apple ha ido añadiendo soporte poco a poco, y en 2024 llegó a anunciar que quitaba las PWA instaladas en la Unión Europea antes de dar marcha atrás. Lo que puedes hacer en iPhone cambia de una versión a otra, así que conviene revisarlo cuando decidas.

## Cuándo una PWA es suficiente

- Tu cliente te encuentra en Google y la app es sobre todo consulta, reservas o pedidos sencillos.
- Necesitas que funcione en móvil y ordenador, por ejemplo una herramienta interna para tu equipo.
- La mayoría de tus usuarios están en Android, o lo que necesitas funciona igual en los dos sistemas.
- Quieres probar si tus clientes usarían una app antes de invertir en una de tienda.

Esto último es una buena estrategia: una PWA bien hecha te sirve de prueba real con un coste menor, y si funciona, ya tienes datos para justificar la app.

## Cuándo necesitas una app nativa (o multiplataforma)

- Las notificaciones son centrales y tus clientes usan iPhone sin haber instalado nada.
- Necesitas Bluetooth, NFC, ubicación en segundo plano o integración profunda con el sistema.
- Funcionar sin conexión de forma fiable es imprescindible, no un extra.
- Estar en la tienda importa: hay sectores donde el cliente espera buscarte en App Store.

Aquí "nativa" no significa necesariamente dos apps escritas en Swift y Kotlin. Con React Native o Flutter haces una app de tienda con una sola base de código; lo explico en [React Native, Flutter o nativo](/blog/react-native-vs-flutter-vs-nativo).

## PWA o app nativa: lo que haría yo

Si todavía no tienes claro si necesitas app, empieza por la pregunta anterior: [app o web para tu negocio](/blog/app-o-web-para-negocio). Si ya sabes que quieres algo instalable, mira primero quién va a usarla y con qué móvil. Con usuarios mayoritariamente en iPhone y notificaciones como parte central, iría a app de tienda. Si es más bien consulta y reservas, una PWA te da mucho por bastante menos. El proceso completo de una app está en [cómo crear una app para tu negocio](/blog/crear-app-para-negocio).

Hago las dos cosas, así que no tengo interés en venderte una u otra. Tienes cómo trabajo en [diseño web para negocios](/servicios/web-para-negocios) y en [desarrollo de apps móviles](/servicios/app-movil), o [escríbeme](/#contacto) y lo vemos con tu caso.
