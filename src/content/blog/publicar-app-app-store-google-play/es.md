---
title: "Cómo publicar tu app en App Store y Google Play"
seoTitle: "Cómo publicar tu app en App Store y Google Play"
date: "2027-07-06"
excerpt: "Cuentas de desarrollador, revisión, capturas, privacidad y actualizaciones: qué hace falta para publicar una app y por qué las cuentas deben ir a tu nombre."
tags: ["Apps móviles", "App Store", "Google Play", "Guía"]
---

La app está terminada, funciona en tu móvil y quieres que tus clientes la descarguen mañana. No tan rápido. Entre "funciona" y "está en la tienda" hay cuentas, verificaciones, fichas y una revisión que puede devolverte la app. Si vas a publicar una app en App Store y Google Play, conviene saber qué te espera para meterlo en el calendario.

Una aclaración honesta: mis apps personales, como IronLog o Compras App, las distribuyo como APK en Android, sin pasar por tienda, porque solo las usamos en casa. Lo que sigue es el proceso tal y como lo documentan Apple y Google, que conviene revisar cuando vayas a publicar porque cambia con frecuencia.

## Antes de nada: las cuentas, a nombre de tu negocio

La app se publica desde una cuenta de desarrollador, y quien es dueño de esa cuenta es, a efectos prácticos, dueño de la app: puede actualizarla o retirarla. Si la abre a su nombre quien te hace la app, tu app depende de esa persona para siempre.

Ábrelas tú, con los datos de tu empresa, y da acceso a tu desarrollador como miembro del equipo. Hablo de esto en general en [cómo no depender de tu programador](/blog/no-depender-de-tu-programador).

## La cuenta de desarrollador de Apple

Para publicar en App Store necesitas inscribirte en el Apple Developer Program. Tiene una cuota anual (a la hora de escribir esto, 99 dólares o su equivalente en euros) y, si dejas de pagarla, tus apps dejan de estar disponibles.

Si la cuenta es de empresa, Apple te pedirá un número D-U-N-S, un identificador de empresas gratuito que puede tardar días en llegar. Como persona física también puedes inscribirte, pero la app aparece con tu nombre personal.

Si vas a distribuir en la Unión Europea, Apple te pide además declarar si eres comerciante y, en ese caso, publicar tus datos de contacto en la ficha.

## La cuenta de Google Play

Google cobra un pago único al registrarte en Play Console (25 dólares en el momento de escribir esto) y verifica tu identidad. Las cuentas de organización también suelen pedir el D-U-N-S.

Un detalle que pilla a mucha gente: las cuentas personales creadas en los últimos años tienen que hacer una prueba cerrada con un número mínimo de testers durante un periodo continuado antes de poder publicar en abierto. Si eres una empresa, abre cuenta de organización y te ahorras ese paso. Si no, cuenta con esas semanas extra.

## Lo que tienes que preparar para la ficha

En las dos tiendas vas a necesitar:

- Nombre, descripciones, categoría e icono.
- Capturas de pantalla en los tamaños que pide cada tienda. Apple las exige para ciertos tamaños de iPhone (y de iPad si la app funciona en iPad).
- Una URL con tu política de privacidad pública.
- La declaración de datos: en Apple se llama "privacidad de la app" y en Google "seguridad de los datos". Indicas qué datos recoge la app, para qué y si se comparten con terceros. Tiene que cuadrar con lo que hace la app de verdad, incluidas las librerías de analítica que lleve dentro.
- La clasificación por edades, que se hace con un cuestionario.
- Si la app tiene login, una cuenta de prueba para que el revisor pueda entrar.

Y un requisito de Apple que conviene diseñar desde el principio: si tu app permite crear una cuenta, también tiene que permitir borrarla desde dentro de la app.

## Pruebas y revisión

Antes de publicar, prueba con gente real: Apple tiene TestFlight para instalar versiones de prueba en iPhones de personas invitadas, y Google tiene pistas de prueba internas, cerradas y abiertas.

Cuando envías la app, cada tienda la revisa. En Apple la revisión la hace una persona con las App Review Guidelines en la mano, y suele resolverse en uno o pocos días, aunque puede alargarse. Los rechazos más habituales: la app se cuelga, hay enlaces rotos o pantallas a medio hacer, la ficha promete algo que la app no hace, falta información de privacidad o la app es poco más que una web metida en un envoltorio.

Un rechazo no es el fin del mundo: te dicen el motivo, corriges y vuelves a enviar. Google también revisa, con más automatización.

## Después: actualizaciones y requisitos que cambian

Cada versión nueva pasa otra vez por revisión. Algunas correcciones que no tocan código nativo se pueden enviar directamente a los móviles con herramientas como EAS Update de Expo (lo uso en Compras App), pero siempre dentro de las normas de cada tienda: no puedes cambiar lo que hace la app por esa vía.

Además, las tiendas suben sus requisitos con regularidad: Google exige apuntar a versiones recientes de Android y Apple compilar con herramientas recientes.

## Mi recomendación para publicar una app en App Store sin sustos

Abre las dos cuentas a nombre de tu negocio en cuanto decidas hacer la app, porque la verificación y el D-U-N-S pueden tardar. Prepara la política de privacidad y la declaración de datos en paralelo al desarrollo. Y deja al menos un par de semanas entre "app terminada" y "fecha de lanzamiento".

Si quieres ver el proceso completo desde la idea, está en [cómo crear una app para tu negocio](/blog/crear-app-para-negocio). Y si quieres que me encargue yo, con las cuentas siempre a tu nombre, tienes cómo trabajo en [desarrollo de apps móviles](/servicios/app-movil) o [escríbeme](/#contacto).
