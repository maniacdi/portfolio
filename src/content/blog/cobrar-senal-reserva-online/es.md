---
title: "Cobrar una señal al reservar: cuándo tiene sentido y cómo hacerlo"
seoTitle: "Cobrar una señal al reservar online: cuándo y cómo hacerlo"
date: "2027-05-11"
excerpt: "Cuándo compensa pedir un pago o una señal al reservar, cómo afecta a las cancelaciones y qué hace falta para cobrarlo de forma segura en tu web."
tags: ["Reservas online", "Pagos", "Negocios", "Citas"]
---

Te ha vuelto a pasar: un tratamiento de dos horas reservado para el sábado, el hueco bloqueado toda la semana, has dicho que no a dos personas y el cliente no aparece ni avisa. Es justo ahí cuando te planteas cobrar una señal en la reserva online. Bien hecho, funciona. Mal hecho, espanta a clientes que nunca te habrían fallado. Vamos por partes, con las preguntas que me haría yo antes de activarlo.

## ¿De verdad lo necesitas?

Primero, los números. ¿Cuántas ausencias tienes al mes y en qué servicios? Si son pocas y repartidas, una señal es pasarse de frenada: con recordatorios y un enlace fácil para cancelar se resuelve buena parte del problema, como cuento en [cómo reducir las citas no presentadas](/blog/reducir-citas-no-presentadas).

La señal tiene sentido cuando el resto ya no basta, o cuando el hueco perdido sale caro:

- Servicios largos o caros, donde una ausencia es media mañana perdida.
- Plazas limitadas: un taller de ocho personas, una mesa para doce, un menú degustación.
- Citas que exigen preparar algo antes (material, producto encargado).
- Clientes que ya han faltado alguna vez.

Para un corte de pelo de 20 minutos con clientela fija, en mi opinión, sobra.

## ¿Señal, pago completo o tarjeta en garantía?

Hay tres formas de pago por adelantado en reservas, y cada una cambia la experiencia del cliente:

- Señal fija o porcentaje. Se paga al reservar y se descuenta del precio final. Es lo más común y lo más fácil de entender.
- Pago completo al reservar. Tiene sentido cuando el precio está cerrado (un taller, una experiencia, una entrada). En servicios donde el precio final cambia según lo que se haga en consulta, complica las cosas.
- Tarjeta en garantía. El cliente deja la tarjeta guardada y solo se le cobra si no viene o cancela tarde. Es la que menos fricción da al reservar, pero técnicamente es más delicada: una simple retención en tarjeta caduca en pocos días, así que para citas lejanas lo habitual es guardar la tarjeta con el permiso explícito del cliente para cobrar después.

## ¿Qué dice tu política de cancelación?

**La señal sin una política de cancelación clara es una discusión esperando a pasar.** Antes de cobrar nada, deja escrito:

- Hasta cuándo se puede cancelar o cambiar la cita sin perder la señal.
- Qué pasa si el cliente no viene o cancela tarde.
- Qué pasa si cancelas tú (la devuelves entera, sin preguntas).

Y que el cliente la vea y la acepte antes de pagar, no en un PDF enlazado al pie de la web. Una casilla junto al botón de pago con el resumen en dos líneas basta.

Una nota: cómo se llama ese dinero y qué efectos tiene (señal, depósito, pago a cuenta) tiene matices legales, y también las normas de consumo que te apliquen. Si vas a quedarte con importes por cancelaciones, que lo revise tu gestor o un abogado antes de publicarlo.

## ¿Cómo cobrar la señal de una reserva online de forma segura?

Con una pasarela de pago. Stripe, Redsys a través de tu banco, PayPal y otras similares hacen el trabajo delicado: los datos de la tarjeta van directos a ellos y nunca pasan por tu servidor. Eso es importante, porque guardar números de tarjeta en tu propia base de datos te obligaría a cumplir unos estándares de seguridad (PCI DSS) que no tienen sentido para un negocio pequeño.

En Europa, además, la mayoría de pagos online exigen autenticación reforzada: la confirmación en la app del banco que todos conocemos. Las pasarelas modernas ya lo gestionan, pero tu sistema de reservas tiene que contemplarlo: si el cliente no completa ese paso, la reserva no puede quedar confirmada a medias.

Qué pasarela elegir depende de tus comisiones, de si quieres Bizum, de cómo cobras en el local y de cómo se integra con tu web. Lo comparo en [pasarelas de pago para tienda online](/blog/pasarelas-de-pago-tienda-online), que aplica igual a una reserva.

## ¿Qué hace el sistema de reservas con el pago?

Aquí es donde las herramientas se diferencian. Lo mínimo que yo le pediría:

- Que la cita no se confirme hasta que el pago se complete, y que el hueco se libere si el cliente abandona a medias.
- Que la confirmación por email incluya el importe pagado y la política de cancelación.
- Que el enlace para cancelar aplique la política sola: dentro de plazo, devuelve; fuera de plazo, avisa de que se pierde la señal.
- Que desde el panel puedas devolver una señal con un clic cuando decidas hacer una excepción (y las harás).

Muchas plataformas lo traen de serie; en un sistema propio se monta con tus reglas.

## ¿Y si pierdo clientes?

Alguno perderás, sobre todo al principio. La pregunta es si son los que te fallaban. Mi consejo: empieza solo por los servicios que más te duelen, mide un par de meses ausencias y reservas, y decide con datos. Si la señal no reduce las ausencias o te baja mucho las reservas, se quita.

Si estás empezando con las reservas online, la guía general es [cómo pasar tus citas del teléfono y WhatsApp a reservas online](/blog/pasar-citas-a-reservas-online). Y si quieres que lo montemos con tus reglas, en [desarrollo de sistemas de reservas online](/servicios/desarrollo-sistemas-reservas-online) te cuento cómo trabajo. O [escríbeme](/#contacto) y te respondo en menos de 48 horas.
