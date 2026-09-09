---
title: "Ocultar el producto no es protegerlo"
date: "2026-09-09"
excerpt: "Una clínica quería vender online los productos que recomienda en consulta, pero las marcas no dejan venderlos a cualquiera. La solución que te sale sola —esconder el producto en la tienda— no aguanta ni cinco minutos. Esto es lo que monté en su lugar."
tags: ["Shopify", "Seguridad", "E-commerce", "Shopify Functions", "Cliente real"]
cover: "/images/projects/uskinstore/cover.webp"
relatedProject: "uskinstore"
---

Una clínica de medicina estética con la que trabajo quería vender online los productos que ya recomendaba en consulta. Problema: parte de ese catálogo es de marcas de distribución selectiva, y esas marcas no te dejan poner su crema a un clic para todo el mundo. Si cualquiera puede comprarla sin pasar por un profesional, se incumple el acuerdo. Pero tampoco querían un catálogo a medias.

Así que había que montar algo raro para una tienda online: productos que se ven, pero que solo compra quien tiene un código que da la clínica.

## Lo primero que se te ocurre está mal

En Shopify la tentación es obvia: ocultas el producto en el tema, o le pones un formulario de contraseña en la ficha y, si no la mete, no le muestras el botón de comprar. Se hace en una tarde.

Y funciona… regular. Porque **el tema de una tienda no es una cerradura, es pintura**. El botón de "añadir al carrito" no es lo que mete el producto en el carrito: es un formulario que apunta a un endpoint de Shopify. Quien conozca el identificador de la variante llega al carrito sin pasar por tu ficha, sin ejecutar tu JavaScript y sin ver tu formulario. El enlace directo del producto tampoco desaparece porque tú lo quites del menú.

O sea que la versión "de una tarde" no protege nada: solo hace que el producto sea incómodo de encontrar. Eso no es lo que la marca te está pidiendo.

## Tres capas y una regla

Lo que acabé montando reparte el trabajo:

- **El tema** oculta el producto y explica que hace falta un código. Es experiencia de usuario, y asumo que se puede saltar.
- **Un endpoint propio** es la única pieza que valida el código de verdad. Shopify firma las peticiones que le llegan por App Proxy, así que puedo comprobar que quien pregunta viene de la tienda y no de un script.
- **Una Validation Function** corriendo dentro de Shopify bloquea el checkout. Esta es la importante: no se ejecuta en el navegador de nadie, así que no hay forma de esquivarla desde el front.

La regla que lo sostiene todo: **el permiso vive en la cuenta del cliente**. Un carrito se vacía, se duplica y se manipula. Una cuenta, no.

Y no, la contraseña no se pide "en la pantalla de pago". Personalizar el checkout de Shopify entero requiere Shopify Plus, unos 2.300 € al mes. Para una clínica pequeña eso no se discute: se resuelve antes, al añadir al carrito, y la Validation Function se encarga de que no se cuele nadie por detrás.

Los códigos van hasheados con scrypt y con límite de intentos por cliente y por IP, porque un código de seis caracteres sin límite de intentos se adivina solo.

Lo siguiente es desplegar la app de gating y abrir la tienda al público. Mientras tanto, [el caso completo está aquí](/projects/uskinstore).
