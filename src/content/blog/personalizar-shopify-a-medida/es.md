---
title: "Cuándo personalizar Shopify con desarrollo a medida"
seoTitle: "Shopify a medida: cuándo programar lo que falta"
date: "2027-05-18"
excerpt: "Temas propios, apps privadas y Shopify Functions: qué se puede añadir a Shopify cuando las apps de su tienda no cubren lo que necesita tu negocio."
tags: ["Shopify", "Shopify Functions", "E-commerce", "Tienda online"]
---

En [Ū Skin Store](/projects/uskinstore) había una regla que Shopify no trae: ciertos productos solo los puede comprar quien tiene un código de la clínica. Antes de escribir una línea, hice lo que haría cualquiera con sentido común: buscar en la tienda de apps de Shopify. Si una app ya lo resuelve bien, programarlo es tirar el dinero. Porque el desarrollo Shopify a medida tiene sentido cuando lo que necesitas no existe ya, o cuando lo que existe no aguanta.

Cómo resolví la parte del código lo conté en [ocultar el producto no es protegerlo](/blog/ocultar-el-producto-no-es-protegerlo). Aquí va el mapa general: qué se puede añadir a Shopify, de menos a más, y cuándo merece la pena cada cosa.

## Primero, la tienda de apps

Hay miles de apps, y para lo habitual (reseñas, filtros, traducciones, suscripciones) seguramente ya hay una que funciona. Una app existente tiene una ventaja que se suele subestimar: el mantenimiento es del fabricante. Cuando Shopify cambia algo, son ellos quienes lo arreglan.

Mi criterio para darla por buena: que haga exactamente lo que necesitas sin trucos, que funcione en tu plan de Shopify (no solo en la tienda de pruebas) y que su cuota mensual tenga sentido comparada con lo que costaría programarlo y mantenerlo durante años. Si falla una de las tres, sigo buscando o paso al siguiente nivel.

## Un tema propio, o el tuyo ajustado

El tema es lo que ve el cliente, y está escrito en Liquid, el lenguaje de plantillas de Shopify. Ajustar un tema existente (colores, secciones, cómo se ve una ficha de producto) es el desarrollo más común sobre Shopify y el más barato de mantener. En Ū Skin Store el tema es a medida y se despliega desde el código con la herramienta de línea de comandos de Shopify.

Ojo con una cosa: si el tema se gestiona desde código, el diseño no se toca desde el editor visual de Shopify, porque los dos cambios acaban pisándose. Los productos se editan desde el panel con normalidad; el diseño, no. Conviene dejarlo claro desde el principio a quien vaya a gestionar la tienda.

Lo que el tema no puede hacer es imponer una regla. Es pintura: decide qué se ve, no qué se permite. Ese fue justo el error que expliqué en el post de los productos con código.

## Apps personalizadas en Shopify

Cuando la regla tiene que cumplirse de verdad, hace falta una app propia: una aplicación que solo se instala en tu tienda y que habla con Shopify por su API. Puede guardar datos que Shopify no tiene, conectar la tienda con otros sistemas o exponer un endpoint propio a través de un App Proxy, que es lo que usé en Ū Skin Store para validar los códigos con peticiones firmadas por Shopify.

Esto ya es un programador Shopify trabajando con un proyecto propio: código, alojamiento y despliegues. Más potencia, y también algo más que mantener.

## Shopify Functions: lógica dentro de Shopify

Las Shopify Functions son pequeños programas que se ejecutan dentro de la infraestructura de Shopify en puntos concretos: descuentos, opciones de envío, métodos de pago y validación del carrito y del checkout. No corren en el navegador del cliente, así que no se pueden saltar desde fuera. En Ū Skin Store, una Validation Function bloquea el pago si el carrito lleva un producto protegido y el cliente no tiene permiso.

Para reglas de negocio que tienen que cumplirse siempre, es la pieza que más me gusta de Shopify. Antes de presupuestarla, eso sí, comprueba qué permite tu plan: hay funciones y personalizaciones del checkout que dependen del plan y de cómo se distribuye la app. **Que funcione en la tienda de desarrollo no garantiza que funcione en la tuya**, porque las tiendas de desarrollo traen desbloqueadas funciones de planes superiores.

## Cuándo no compensa el desarrollo Shopify a medida

Si todo lo que quieres cambiar es visual, no necesitas una app: basta con el tema. Si existe una app sensata que lo hace, úsala aunque te pique programarlo. Y si cada cosa que pides choca con el molde de Shopify, a lo mejor la pregunta es otra: lo planteo en [Shopify o tienda a medida](/blog/shopify-o-tienda-a-medida).

## Por dónde empezaría

Escribe en una frase la regla que Shopify no te resuelve. Luego busca en la tienda de apps con esa frase y prueba las dos mejores con un pedido de prueba real. Si ninguna la cumple sin trucos, ya sabes qué hay que programar y puedes pedir un presupuesto concreto. Si aún no tienes la tienda, empieza por [cómo montar una tienda online](/blog/como-montar-tienda-online).

En [desarrollo de tiendas online](/servicios/desarrollo-tiendas-online) tienes cómo trabajo sobre Shopify y a medida. O [escríbeme](/#contacto) con esa frase y te digo si se programa, si hay app o si no merece la pena.
