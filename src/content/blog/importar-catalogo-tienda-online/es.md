---
title: "Cómo importar y actualizar el catálogo de tu tienda de forma automática"
seoTitle: "Cómo importar y actualizar tu catálogo de forma automática"
date: "2027-08-10"
excerpt: "CSV, API o scripts: formas de cargar cientos de productos y mantener precios y stock al día sin hacerlo a mano, con el ejemplo de Ū Skin Store."
tags: ["Shopify", "E-commerce", "Automatización", "Tienda online"]
---

En [Ū Skin Store](/projects/uskinstore) nadie da de alta productos desde el panel de Shopify. El catálogo vive en un Excel que mantiene la clínica, y de ahí unos scripts en Python generan los ficheros que se suben a la tienda. Si un precio cambia, se cambia en el Excel y se vuelve a subir. Montarlo así cuesta más al principio que meter los productos a mano, pero cada actualización después es casi gratis. Si estás pensando en importar productos a Shopify (o a cualquier otra tienda), esto es lo que he aprendido.

## Tres formas de importar productos a Shopify

De menos a más automático:

El CSV de la propia plataforma. Shopify tiene una plantilla de CSV para productos: una fila por variante, con título, precio, stock, fotos y demás. Lo subes desde el panel y crea o actualiza los productos. Para una carga masiva de productos puntual, con un catálogo sencillo, es suficiente y no cuesta nada.

Una app de importación. Cuando necesitas más de lo que admite el CSV básico (metacampos, colecciones, Excel directamente o exportar y reimportar todo el catálogo), hay apps especializadas. Matrixify es la más conocida en Shopify. Si tu plan limita las filas por importación, parte el catálogo en bloques numerados y súbelos en orden.

La API. Shopify, como cualquier plataforma seria, tiene una API para crear y modificar productos desde un programa. Es la opción cuando la información vive en otro sistema (el de tu proveedor, tu programa de gestión, tu TPV) y quieres que la tienda se actualice sola, sin que nadie suba ficheros.

## La regla que lo sostiene: una sola fuente de verdad

Elijas lo que elijas, decide dónde vive el catálogo. Si es el Excel, todo se cambia en el Excel. Si es tu programa de gestión, todo se cambia ahí.

Lo que pasa si no: alguien crea un producto a mano directamente en Shopify "porque era urgente". Ese producto existe y se vende, pero la siguiente importación no lo conoce, así que nunca se actualiza y siempre sobra uno en el recuento sin que nadie sepa por qué.

## Los problemas que nadie te cuenta

Importar es fácil. Reimportar sin romper nada es lo difícil. Esto es lo que me encontré:

- **Las importaciones emparejan productos por su URL**, y en Shopify la URL sale del nombre. Si alguien renombra un producto, la siguiente importación no lo reconoce: crea uno nuevo y deja el viejo huérfano, con sus fotos colgando y sin ningún error. Por eso los scripts mantienen un mapa de URLs fijas.
- Si una foto no está subida cuando se importa el producto, la ficha entra sin foto. Tampoco avisa.
- Cuando cambias cómo se agrupan los productos (en Ū Skin Store, los tonos de una crema pasaron de ser fichas sueltas a variantes de una sola ficha), las fichas antiguas se quedan en la tienda como borradores huérfanos. Hay que buscarlas y retirarlas.

Lo que hago ahora por defecto: un bloque de prueba antes de subir el resto, un fichero "hacia atrás" para cada cambio delicado que lo deshace si sale mal, y una exportación completa de la tienda antes de borrar nada. Mejor que sobre que no que falte.

## Actualizar stock automáticamente

Precios y descripciones cambian poco. El stock cambia con cada venta. Si vendes también en el mostrador, el reto es que la web y la tienda física cuenten lo mismo.

Las opciones, según dónde lleves hoy el inventario:

- Si usas el TPV de la propia plataforma (Shopify POS, por ejemplo), comparten inventario y no hay nada que sincronizar.
- Si tu proveedor te da un fichero o una API con su stock, un script programado puede leerlo cada noche y actualizar la tienda.
- Si llevas el inventario en un programa de gestión, se puede conectar con la API de la tienda en los dos sentidos: lo que se vende online se descuenta allí y al revés.

## Cuándo compensa automatizarlo

Si tienes cincuenta productos que cambian dos veces al año, súbelos a mano o con el CSV y dedica el tiempo a las fotos. Si tienes cientos, varias marcas o precios que cambian cada temporada, un script se paga solo en la segunda actualización. Es el mismo criterio que cuento en [automatizar tareas de tu negocio](/blog/automatizar-tareas-negocio): si es repetitivo y tiene reglas claras, que lo haga un programa. Y si el catálogo vive en otra herramienta, la pregunta pasa a ser cómo [integrar las herramientas de tu negocio](/blog/integrar-herramientas-negocio) para que hablen entre ellas.

## Por dónde empezaría

Antes de pensar en scripts, ordena el catálogo en una hoja de cálculo: una fila por variante, marcas y categorías escritas siempre igual y una columna con la URL de cada foto. Ese fichero ya te sirve para la importación nativa de Shopify, y si algún día quieres automatizarlo, es justo lo que necesita un script. Si todavía estás decidiendo la tienda, empieza por [cómo montar una tienda online](/blog/como-montar-tienda-online).

La carga y actualización del catálogo forma parte de lo que hago en [desarrollo de tiendas online](/servicios/desarrollo-tiendas-online), y si la sincronización va más allá de la tienda, lo tienes en [software a medida](/servicios/software-a-medida). O [escríbeme](/#contacto) y me cuentas dónde tienes hoy tus productos.
