---
title: "Apps que funcionan sin conexión y sincronizan en tiempo real"
seoTitle: "Apps sin conexión y en tiempo real: cómo funcionan"
date: "2027-09-28"
excerpt: "Cuándo tu app debe funcionar sin cobertura, cómo se sincronizan los datos entre usuarios y dispositivos y qué complejidad añade cada opción técnica."
tags: ["Apps móviles", "Offline-first", "Tiempo real", "React Native"]
---

En el gimnasio el WiFi siempre falla. Por eso mi app de entrenos guarda todo en el móvil y no necesita conexión para nada. En casa, en cambio, la lista de la compra tiene que estar igual en el móvil de los dos al instante, o acabamos comprando la leche dos veces. Son dos apps mías con necesidades opuestas, y entre una y otra está casi todo lo que hay que saber sobre una app sin conexión y sobre la sincronización en tiempo real.

Si estás pensando en una app para tu negocio, esta es una de las decisiones que más mueven el presupuesto, y casi nunca aparece en la primera reunión.

Para entenderlo, ayuda pensar en cuatro niveles de app según cómo tratan los datos, de menos a más complejo.

## 1. Siempre conectada

La app pide los datos al servidor cada vez y, si no hay cobertura, muestra un mensaje de error. Es lo más sencillo de construir y sirve para muchas cosas: consultar un catálogo, reservar una cita, ver un pedido. Si tus usuarios siempre tienen conexión cuando la usan, no compliques más.

El error típico es quedarse aquí cuando el uso real no lo permite: un técnico que rellena partes en un sótano y pierde lo escrito porque no había señal al darle a guardar.

## 2. Solo en el móvil

Los datos viven en el teléfono y no hay servidor. Así funciona [IronLog](/blog/ironlog-app-de-gimnasio): rápida, privada y sin nada que mantener fuera del móvil.

El precio: si pierdes el móvil, pierdes los datos (salvo que montes copias), y no se comparten con nadie ni se ven desde otro dispositivo. Para una herramienta personal es perfecto. Para datos de un negocio, casi nunca basta.

## 3. Conectada y en tiempo real

Los datos están en un servidor y los cambios llegan a todos los dispositivos al momento, sin recargar. Es lo que hace [Compras App](/blog/como-construi-compras-app): si mi pareja tacha algo en su móvil, desaparece del mío en ese instante. Por debajo usa WebSockets, una conexión abierta permanente entre la app y el servidor por la que viajan los cambios en las dos direcciones.

Sirve cuando varias personas miran lo mismo a la vez: un tablero de pedidos en cocina, las tareas de un equipo, la ocupación de unas salas. La complejidad está en el servidor (mantener conexiones, reconectar cuando se caen) y en los cambios simultáneos.

## 4. Offline first con sincronización

La app guarda primero en el móvil, funciona sin conexión como si nada y, cuando vuelve la señal, sincroniza con el servidor y el resto de dispositivos. Es lo que esperas de las grandes apps de notas, y es bastante más difícil de lo que parece.

La razón tiene nombre: conflictos. Si dos personas editan el mismo dato sin conexión, cada una en su móvil, ¿cuál gana cuando se reconectan? Incluso en Compras App, que está en el nivel 3, tuve que pensar bien la reconciliación cuando dos personas editan a la vez y una pierde la conexión. Y es una lista de la compra.

## Cómo se resuelven los conflictos

Depende de qué datos son y de lo que pase si se pierde un cambio:

- Gana el último. Sencillo y suficiente cuando perder un cambio puntual no es grave, como marcar un producto como comprado.
- Mezclar por campos. Si uno cambió el teléfono de un cliente y otro su dirección, se guardan los dos cambios. Solo hay conflicto si tocaron el mismo campo.
- Preguntar al usuario. Para datos importantes, como un presupuesto o una historia clínica, lo honesto es enseñar las dos versiones y que decida una persona.
- Estructuras que se mezclan solas. Hay técnicas pensadas para que los cambios concurrentes se combinen sin conflictos, como en los editores colaborativos. Potentes, pero rara vez necesarias en una app de negocio.

Elegir la estrategia es una decisión de negocio tanto como técnica. Por eso pregunto siempre: si dos empleados cambian lo mismo sin cobertura, ¿qué debería pasar?

## Qué complejidad (y coste) añade cada opción

Ir del nivel 1 al 2 o al 3 es un salto razonable. El nivel 4 es otra liga: hay que diseñar desde el principio cómo se guardan los datos en local, cómo se marcan los cambios pendientes, cómo se reintenta el envío, cómo se resuelven los conflictos y cómo se prueba todo eso en condiciones de red malas. Añadir el modo sin conexión a una app que no se pensó para ello suele salir más caro que haberlo hecho desde el principio.

La tecnología del móvil influye menos de lo que parece: React Native, Flutter y nativo pueden con los cuatro niveles. Las diferencias están en las librerías, que comento en [React Native, Flutter o nativo](/blog/react-native-vs-flutter-vs-nativo).

## Cómo plantearía una app sin conexión para tu negocio

Haz una lista de los momentos en los que se usa la app y marca cuáles pueden pasar sin conexión. Si no hay ninguno, nivel 1 o 3 y a otra cosa. Si los hay, decide qué datos tienen que estar disponibles sin red y qué pasa si dos personas los cambian a la vez. Con esas respuestas se puede elegir el nivel mínimo que cubre el caso, que es el que te recomendaría.

Si estás empezando desde cero, el proceso general está en [cómo crear una app para tu negocio](/blog/crear-app-para-negocio). Y si quieres que pensemos juntos cómo debería funcionar la tuya, tienes cómo trabajo en [desarrollo de apps móviles](/servicios/app-movil) o [escríbeme](/#contacto).
