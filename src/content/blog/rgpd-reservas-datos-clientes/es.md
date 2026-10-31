---
title: "Protección de datos en reservas y fichas de clientes: lo básico"
seoTitle: "RGPD en reservas online y fichas de clientes: lo básico"
date: "2027-08-03"
excerpt: "Qué datos pedir, dónde guardarlos, quién puede verlos y cuánto tiempo conservarlos: lo esencial para un negocio que gestiona citas online."
tags: ["Reservas online", "RGPD", "Privacidad", "Negocios"]
---

Cada vez que alguien reserva cita en tu web te deja, como mínimo, su nombre, su teléfono o su email y lo que viene a hacerse. En una peluquería eso es poca cosa. En una clínica, que alguien pida hora para un tratamiento concreto ya es un dato de salud. Cumplir el RGPD en las reservas online no es un papeleo que se hace una vez: son decisiones que se toman al diseñar el sistema. Cuando monté la agenda y la ficha de paciente de Ū Medicina Estética, esa parte pesó tanto como la propia agenda.

Una advertencia antes de seguir: soy desarrollador, no abogado. Esto es lo que tengo en cuenta al construir un sistema de reservas, y conviene que lo revise un profesional para tu caso.

Vamos a seguir los datos de una reserva desde que entran hasta que se borran.

## RGPD en las reservas online: pide solo lo que vas a usar

El principio se llama minimización y es de sentido común: si no necesitas la fecha de nacimiento para darle cita a alguien, no la pidas. Nombre, una forma de contacto y el servicio suelen bastar.

Junto al botón de reservar, un texto corto que diga quién trata los datos, para qué y dónde ampliar la información, con enlace a tu política de privacidad. Los textos legales de la web (aviso legal, privacidad, cookies) son tema aparte y los cuento en [requisitos legales de la web de un negocio](/blog/requisitos-legales-web-negocio).

Y una casilla que suele hacerse mal: para gestionar la cita no necesitas el consentimiento del cliente, porque es lo que él mismo te ha pedido. Para mandarle promociones, sí, y es otra casilla, sin marcar por defecto.

## Los datos de salud, aparte

Si tienes una clínica, un centro de fisioterapia o algo parecido, la protección de datos de pacientes tiene un nivel más. Los datos de salud son una categoría especial en el RGPD, con más exigencias de seguridad, de control de accesos y de documentación. Entre otras cosas, tendrás que llevar el registro de actividades de tratamiento aunque seas un negocio pequeño.

En un sistema de citas, eso significa: el recordatorio por email no dice el tratamiento, el título de la cita en un calendario compartido tampoco, y las notas clínicas no viajan por WhatsApp. Lo cuento con más detalle para clínicas en [agenda online para clínicas](/blog/agenda-online-clinicas).

## Dónde se guardan: tus proveedores también cuentan

Los datos de clientes en la web casi nunca están solo en tu casa. Están en el hosting, en la base de datos, en el servicio que envía los emails, en la plataforma de reservas si usas una. Cada uno de esos proveedores es un encargado del tratamiento, y con cada uno necesitas un contrato que lo regule. Los grandes lo tienen ya preparado (suele llamarse DPA, *data processing agreement*); se trata de saber cuál es y aceptarlo.

Mira también dónde guardan los datos. Si salen del Espacio Económico Europeo, hacen falta garantías adicionales. Cuando elijo proveedores para un sistema con datos sensibles, prefiero los que permiten fijar la región en Europa.

## Quién puede verlos

**En un negocio pequeño, la fuga de datos más probable es una contraseña compartida.**

Lo mínimo que pido en un panel de reservas:

- Un usuario por persona, nunca cuentas compartidas.
- Permisos por perfil: recepción ve la agenda y los contactos; las notas, solo quien las necesita.
- Verificación en dos pasos para entrar.
- Quitar el acceso el mismo día que alguien deja de trabajar contigo.

En Ū el acceso al panel va con Clerk, un servicio especializado en autenticación.

## Cuánto tiempo conservarlos

Los datos se guardan mientras hagan falta para lo que se pidieron, más lo que obligue la ley.

Aquí hay plazos que no decides tú. La documentación clínica, por ejemplo, tiene periodos mínimos de conservación fijados por la normativa sanitaria, y las facturas, los suyos por la parte fiscal. Define tus plazos con tu asesor y que el sistema te ayude a cumplirlos: que borre o anonimice solo lo que ya ha caducado.

## Cuando el cliente pide sus datos o que los borres

Cualquier cliente puede pedirte qué datos tienes de él, que los corrijas o que los borres (con las excepciones de lo que estás obligado a conservar). Tienes un mes para responder. Si tu sistema permite buscar a un cliente y exportar o eliminar sus datos desde el panel, es un trámite de cinco minutos. Si están repartidos entre la libreta, el WhatsApp y tres hojas de cálculo… ya no tanto.

## Y si algo sale mal

Si hay una brecha de seguridad (un acceso indebido, un portátil robado con datos, un envío de emails a quien no toca) y supone un riesgo para las personas, hay que notificarla a la Agencia Española de Protección de Datos en un plazo de 72 horas.

## Por dónde empezaría

Haz una lista de dónde está hoy cada dato de tus clientes: formulario, email, WhatsApp, agenda, hojas de cálculo. Si estás pasando de la libreta a una agenda digital, es el mejor momento para hacerlo bien desde el principio, y lo explico en [cómo pasar tus citas a reservas online](/blog/pasar-citas-a-reservas-online).

En [desarrollo de sistemas de reservas online](/servicios/desarrollo-sistemas-reservas-online) te cuento cómo diseño la agenda con la protección de datos desde el principio, y si necesitas algo más amplio, en [software a medida](/servicios/software-a-medida). O [escríbeme](/#contacto) y te respondo en menos de 48 horas.
