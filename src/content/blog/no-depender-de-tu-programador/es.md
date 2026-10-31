---
title: "Cómo no depender de tu programador: código, accesos y documentación"
seoTitle: "Cómo no depender de tu programador: código y accesos"
date: "2027-08-24"
excerpt: "Repositorio, dominio, hosting, cuentas y documentación a tu nombre: qué pedir al encargar software para que cualquier desarrollador pueda continuar."
tags: ["Software a medida", "Negocios", "Propiedad intelectual", "Guía"]
---

El programador que te hizo la web o la aplicación ya no contesta. Puede que haya cambiado de trabajo, que haya cerrado o que simplemente no tenga tiempo. Y tú descubres que el dominio está a su nombre, que no sabes dónde está alojada la web y que el código "lo tiene él". Si lo has vivido, sabes que la propiedad del código fuente y de los accesos no es un detalle legal. Es lo que decide si tu negocio puede seguir sin esa persona.

Lo digo siendo yo programador: lo sano es que puedas despedirme mañana y que otro siga el trabajo sin perder nada. Esta es la lista de lo que pediría si estuviera en tu lado de la mesa.

## Propiedad del código fuente: dónde vive y de quién es

Hay dos preguntas distintas, y conviene tener resueltas las dos.

Dónde vive. El código de tu proyecto tiene que estar en un repositorio (GitHub, GitLab o similar) en una cuenta u organización tuya, con tu email, en la que tú eres propietario y el desarrollador es un invitado con permisos. Si mañana deja de trabajar contigo, le quitas el acceso y el código sigue ahí, con todo su historial.

De quién es. Aquí entra la propiedad intelectual. Si encargas software a un autónomo o a una empresa que no es tu empleado, no des por hecho que los derechos son tuyos solo por pagarlo. Lo prudente es que el contrato o el presupuesto aceptado diga por escrito que se te ceden los derechos de explotación del código hecho para ti. Si tienes dudas sobre tu caso concreto, consúltalo con un abogado; un párrafo bien escrito te ahorra un problema serio.

Matiz razonable: muchos desarrolladores usan piezas propias o librerías de código abierto que reutilizan en todos sus proyectos. Eso no te lo pueden ceder en exclusiva, y está bien, siempre que tengas licencia para seguir usándolo.

## Entrega de accesos web: dominio, hosting y cuentas

Lo que no es código también cuenta, y a menudo más. Todo esto debería estar a tu nombre, con tu email y tu tarjeta:

- El dominio. Es tu dirección en internet; si no está a tu nombre, no es tuyo. Lo explico con más detalle en [dominio, hosting y SSL para tu negocio](/blog/dominio-hosting-ssl-negocio).
- El hosting o el servidor, y la base de datos.
- Los servicios externos: correo transaccional, pasarela de pago, inicio de sesión, analítica, mapas.
- Si hay app móvil, las cuentas de desarrollador de Apple y Google Play. Publicar una app con la cuenta de otro es de los errores más caros de deshacer; cuento cómo hacerlo bien en [cómo publicar tu app en App Store y Google Play](/blog/publicar-app-app-store-google-play).

El desarrollador puede tener acceso como usuario invitado o con su propio rol, pero la cuenta principal es tuya. Y las contraseñas, en un gestor de contraseñas compartido, no en un correo de hace dos años.

## Documentación de software: lo mínimo que tienes que tener

No hace falta un manual de cien páginas. Para que otro desarrollador pueda continuar, basta con:

- Un README en el repositorio: qué es el proyecto, cómo se arranca en local y cómo se despliega.
- Qué servicios externos usa, para qué y en qué cuenta están.
- Las variables de configuración necesarias (sin los valores secretos, que van en otro sitio).
- Las decisiones raras explicadas. Si algo se hizo de una forma poco obvia, una línea de por qué.

En mi trabajo en AMS Solutions, donde varios equipos tocan el mismo ecosistema, esto no es opcional: si no está documentado y probado, el siguiente que llega se pasa días adivinando. Los tests también son documentación: dicen qué se supone que hace el código y avisan cuando alguien lo rompe. Un proyecto con buena cobertura de tests es mucho más fácil de heredar.

## Cómo pedirlo sin que suene a desconfianza

No suena a desconfianza si lo hablas antes de empezar. Un buen desarrollador no debería poner pegas a nada de esta lista; de hecho, a mí me facilita la vida que el cliente tenga sus cuentas en orden. Si alguien se resiste a que el código o el dominio estén a tu nombre, esa resistencia ya es información.

Tres cosas que pediría por escrito antes de empezar:

1. Que el repositorio y las cuentas se creen a nombre del negocio desde el primer día.
2. La cesión de derechos sobre el código hecho a medida.
3. Una entrega final con la documentación mínima de arriba.

Esto vale igual para una [web para tu negocio](/servicios/web-para-negocios), una [app móvil](/servicios/app-movil) o un panel de gestión. Si todavía estás decidiendo si te compensa algo hecho para ti, empieza por [software a medida o estándar](/blog/software-a-medida-vs-estandar).

## Si ya dependes de alguien

No hace falta un drama. Pide, con buenas formas, que te transfiera el dominio y te dé acceso de propietario al hosting y al repositorio. Hazlo mientras la relación es buena; es mucho más fácil que cuando ya no contesta.

Si quieres que revise cómo tienes las cosas o que el próximo proyecto nazca así, en [software a medida](/servicios/software-a-medida) tienes cómo trabajo. O [escríbeme](/#contacto) y lo miramos.
