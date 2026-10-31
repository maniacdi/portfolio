---
title: "Pasarelas de pago para tiendas online: cuál elegir"
seoTitle: "Pasarelas de pago para tiendas online: cuál elegir"
date: "2027-09-21"
excerpt: "Comisiones, métodos de pago, seguridad e integración: qué mirar al elegir la pasarela de pago de tu tienda online o de tu sistema de reservas."
tags: ["E-commerce", "Pagos", "Tienda online", "Negocios"]
---

Tu banco te ofrece un TPV virtual, la plataforma de la tienda te sugiere el suyo, alguien te dice que Stripe es lo más fácil y tus clientes te preguntan si pueden pagar con Bizum. Elegir la pasarela de pago de una tienda online parece un trámite, y es una de las decisiones que más se notan en cada venta: lo que te cobran, lo que tarda en llegarte el dinero y cuántos clientes abandonan en la pantalla de pago.

Lo voy a plantear con las preguntas que yo haría, porque la pasarela "mejor" no existe. Existe la que encaja con tu tienda.

## ¿Qué pasarela de pago admite tu tienda online?

Antes de comparar comisiones, mira qué te deja usar tu plataforma.

En Shopify, lo natural es Shopify Payments: viene integrado, se activa desde el panel y acepta tarjeta, Apple Pay y Google Pay. Puedes usar otra pasarela, pero entonces Shopify suele añadir su propia comisión por venta encima de la de la pasarela. Para un comercio pequeño, esa diferencia suele decidir el asunto.

En WooCommerce o en una tienda a medida eliges libremente. Hay integraciones para casi todo, y en una tienda a medida la pasarela se programa con la que prefieras. Si dudas entre plataformas, lo que cuesta cada una lo tienes en [cuánto cuesta una tienda online](/blog/cuanto-cuesta-tienda-online).

## ¿Cómo quieren pagar tus clientes?

Cada método que falta es un cliente que se lo piensa. Lo habitual en España:

- Tarjeta, siempre. Es lo mínimo.
- Apple Pay y Google Pay, que en el móvil ahorran teclear la tarjeta.
- PayPal, que hay quien prefiere para no dar la tarjeta a una tienda que no conoce.
- Bizum, muy extendido aquí. Ojo: no todas las plataformas lo integran igual. En unas llega a través del TPV de tu banco y en otras necesitas una app o una pasarela externa. Compruébalo antes de prometerlo.

## Redsys vs Stripe: banco o servicio online

Es la duda más típica en España.

Redsys es la plataforma detrás del TPV virtual de la mayoría de bancos españoles. Lo contratas con tu banco, las comisiones las negocias con ellos y suele ser la vía para ofrecer Bizum. A cambio, el alta pasa por la oficina y la integración técnica es más antigua y más laboriosa.

Stripe se contrata online en un rato, tiene tarifas públicas, una integración muy cuidada y acepta tarjeta, Apple Pay, Google Pay y otros métodos europeos. Para alguien que programa, es de lo más cómodo que hay.

Mi opinión: si tu plataforma no te lleva ya a una opción concreta, Stripe es más rápido de poner en marcha y Redsys puede compensar si tu banco te da buenas condiciones o si Bizum es imprescindible. Pide las dos tarifas por escrito y compara con tus ventas reales, no con un ejemplo.

## ¿Cuánto cuesta cada venta, de verdad?

Las comisiones cambian y dependen del volumen, del tipo de tarjeta y de si el cliente es de fuera de Europa, así que no te voy a dar cifras que caduquen. Lo que sí te digo es qué preguntar:

- Porcentaje por venta y cantidad fija por operación, si la hay. En tickets pequeños, la parte fija pesa mucho.
- Coste de las devoluciones y de los contracargos (cuando un cliente reclama el cargo a su banco).
- Cuota mensual o de alta, si existe.
- Cuántos días tarda el dinero en llegar a tu cuenta.

Con eso y tu ticket medio, calculas lo que te cuesta cada pedido. Mira siempre la tarifa actual en la web de cada proveedor o en tu contrato.

## Seguridad: lo que hace la pasarela por ti

Dos cosas que conviene conocer. La primera: en Europa, la normativa de pagos (PSD2) obliga a la autenticación reforzada, ese paso en el que el banco te pide confirmar la compra en el móvil. Cualquier pasarela seria lo gestiona sola.

La segunda: **los datos de tarjeta no deberían pasar nunca por tu servidor**. Con un formulario o una página de pago de la propia pasarela, el número de tarjeta va directo a ella y tú solo recibes la confirmación. Así te ahorras la mayor parte de las obligaciones de seguridad de datos de tarjeta (la norma PCI DSS) y el riesgo de guardar algo que no quieres tener.

## Si cobras reservas y no solo productos

En un sistema de reservas, la pasarela se usa distinto: cobrar una señal al reservar, retener un importe sin cobrarlo o devolver si se cancela a tiempo. No todas las pasarelas lo ponen igual de fácil. Lo cuento en [cobrar señal en reservas online](/blog/cobrar-senal-reserva-online).

## Lo que haría yo

Si la tienda está en Shopify, empezaría con Shopify Payments y solo me plantearía otra pasarela por un método de pago que mis clientes pidan y no tenga. En WooCommerce o a medida, Stripe para empezar rápido, y Redsys si el banco da buenas condiciones o Bizum es clave. Y en todos los casos, un pedido real de prueba con tarjeta antes de abrir. Si estás montando la tienda desde cero, la guía completa es [cómo montar una tienda online](/blog/como-montar-tienda-online).

En [desarrollo de tiendas online](/servicios/desarrollo-tiendas-online) tienes cómo trabajo, también la integración de pagos. O [escríbeme](/#contacto) con la plataforma que usas y cómo te pagan tus clientes hoy.
