---
title: "Dominio, hosting y SSL: lo que tu negocio necesita saber"
seoTitle: "Dominio, hosting y SSL explicados para negocios"
date: "2027-06-08"
excerpt: "Qué es cada cosa, a nombre de quién deben estar y qué preguntar antes de contratar, para que tu web no dependa de terceros ni caduque sin avisar."
tags: ["Desarrollo web", "Negocios", "Hosting", "Guía"]
---

Un lunes por la mañana tu web no carga y el correo de la empresa ha dejado de recibir mensajes. Llamas a quien te hizo la web hace años y no contesta. Al final resulta que el dominio caducó, que estaba registrado a su nombre y que los avisos de renovación iban a un email que nadie mira. Esta historia es más común de lo que debería, y se evita entendiendo tres cosas: dominio y hosting para empresas, y el certificado SSL.

No hace falta saber de servidores. Hace falta saber qué es cada pieza, de quién es y qué preguntar. Lo voy a hacer en formato pregunta y respuesta, que es como suelen llegar las dudas.

## ¿Qué es el dominio y por qué tiene que estar a tu nombre?

El dominio es tu dirección en internet: tunegocio.com o tunegocio.es. No se compra para siempre: se alquila por años a un registrador y se renueva.

Lo importante no es dónde lo registres, sino quién figura como titular. El titular es el dueño a efectos legales, y si no eres tú, en la práctica el dominio no es tuyo. Si el día de mañana quieres cambiar de proveedor o de programador, necesitarás que el titular autorice el traslado.

Lo que yo comprobaría hoy mismo:

- Que el titular del dominio es tu empresa o tú, con tus datos.
- Que el email de contacto del dominio es uno tuyo y que lo lees.
- Que tienes acceso a la cuenta del registrador, con tu usuario y contraseña.
- Que la renovación automática está activada.

Es lo mismo que hicimos con Ū Medicina Estética: todas las cuentas a nombre de la clínica, y yo como colaborador con acceso. Si mañana dejo de trabajar con ellos, no tienen que pedirme nada.

## ¿Y el hosting qué es? ¿En qué se diferencia del dominio?

El dominio es la dirección; el hosting es la casa. Es el servidor donde están los archivos de tu web y desde donde se sirve a quien la visita. Son cosas distintas y pueden estar en proveedores distintos: el dominio "apunta" al hosting mediante unos registros llamados DNS.

Cómo elegir hosting depende de qué tipo de web tengas:

- Hosting compartido: barato y suficiente para una web sencilla con poco tráfico. Compartes servidor con muchas otras webs, y a veces se nota en la velocidad.
- Hosting gestionado de WordPress: más caro, pero se encargan de actualizaciones y copias. Tiene sentido si tu web es WordPress y no quieres pelearte con ello.
- Plataformas para webs modernas (tipo Vercel o Netlify): pensadas para webs hechas a medida con frameworks como Next.js. Rápidas y con certificado incluido. La web de Ū, por ejemplo, está desplegada en Vercel.
- Servidor propio o VPS: control total, y también responsabilidad total. Para una web de negocio normal, rara vez compensa.

Mi opinión: para la web de un negocio local, la velocidad y la fiabilidad pesan más que el precio mensual del hosting. Ahorrar unos euros al mes en un hosting lento sale caro en clientes que cierran la pestaña.

## ¿Qué es un certificado SSL y lo necesito?

Un certificado SSL es lo que permite que tu web funcione con https y que la conexión entre el visitante y tu web vaya cifrada. Es el candado que ves en la barra del navegador.

Sí, lo necesitas. Sin él, los navegadores marcan tu web como "No segura", lo que espanta a cualquiera, y si tienes un formulario de contacto, los datos viajan sin cifrar. Además, Google lo tiene en cuenta.

La buena noticia: hoy hay certificados gratuitos (Let's Encrypt es el más conocido) y la mayoría de hostings los instalan y renuevan solos. Si alguien te cobra aparte cada año por "el SSL" de una web de negocio normal, pregunta qué incluye exactamente. Hay certificados de pago con validaciones extra, pero para una web informativa no suelen hacer falta.

Lo que sí hay que vigilar es que se renueve. Los certificados caducan, y si la renovación automática falla, tu web aparece de un día para otro con un aviso de seguridad a pantalla completa.

## Dominio y hosting para empresas: qué preguntar antes de contratar

Si alguien te va a hacer la web, estas preguntas te ahorran sustos:

- ¿A nombre de quién se registra el dominio? Respuesta correcta: al tuyo.
- ¿Quién paga el hosting y a nombre de quién está la cuenta?
- ¿Está incluido el certificado SSL y se renueva solo?
- ¿Qué pasa si quiero irme? ¿Me das los accesos y el código?
- ¿Quién recibe los avisos de caducidad?

Si alguna respuesta es vaga, pide que te la concreten por escrito. Sobre cómo evitar quedarte atado a quien te hizo la web, lo desarrollo en [cómo no depender de tu programador](/blog/no-depender-de-tu-programador).

## Por dónde empezaría yo

Haz hoy una lista con tres líneas: dónde está registrado tu dominio, dónde está el hosting y cuándo caduca cada cosa. Si no sabes alguna, esa es la primera tarea. Si estás empezando la web desde cero, en [cómo crear la página web de tu negocio](/blog/como-crear-pagina-web-negocio) tienes el orden completo.

Cuando hago una web, todo queda a nombre del cliente desde el primer día. Si quieres ver cómo trabajo, está en [diseño web para negocios](/servicios/web-para-negocios), o [escríbeme](/#contacto) y revisamos tu caso.
