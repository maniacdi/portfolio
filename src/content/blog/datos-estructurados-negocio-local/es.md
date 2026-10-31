---
title: "Datos estructurados para negocios locales: qué son y cómo usarlos"
seoTitle: "Datos estructurados para negocios locales: guía práctica"
date: "2027-03-23"
excerpt: "Qué es el marcado schema, qué tipos le sirven a un restaurante, una clínica o una tienda y cómo comprobar que Google lo lee correctamente."
tags: ["SEO", "SEO local", "Datos estructurados", "Google"]
---

Cuando monté las páginas de servicio de esta web, tuve que decidir cómo explicarle a Google qué soy. No soy una tienda ni tengo un local con persiana: soy un desarrollador que trabaja en Santander, en Cantabria y en remoto. Para una persona eso se entiende leyendo la web. Para Google, mejor decírselo en su idioma. Para eso sirven los datos estructurados.

Son un bloque de código que el visitante no ve y que describe tu negocio de forma que una máquina no tenga que adivinar nada: nombre, tipo de negocio, dirección, horario, teléfono, servicios. En la [guía de SEO local](/blog/seo-local-negocios) los mencioné de pasada; aquí va la parte práctica.

## Qué hacen (y qué no) los datos estructurados

Lo que hacen: quitar ambigüedad. Si tu web dice «Abrimos de 9 a 2 y de 5 a 8» en un párrafo, Google probablemente lo entiende. Si además lo dice en datos estructurados, no tiene que interpretarlo. Lo mismo con la dirección, el tipo de negocio o la zona en la que trabajas. Y ciertos tipos pueden dar resultados enriquecidos en Google: recetas, eventos, productos con precio y disponibilidad, migas de pan en lugar de la URL.

Lo que no hacen: subirte posiciones por arte de magia. Google ha dicho muchas veces que no son un factor de posicionamiento directo. Tampoco te van a poner estrellas de valoración junto a tu negocio en los resultados: Google no las muestra cuando un negocio marca sus propias reseñas sobre sí mismo. Si alguien te vende eso, desconfía.

Mi opinión: para un negocio local son baratos de hacer bien y es raro que sobren. Por eso es de lo primero que reviso en cualquier web.

## El formato: JSON-LD y Schema.org

El vocabulario estándar es Schema.org, y el formato que recomienda Google es JSON-LD: un bloque de texto dentro de la página, separado del contenido visible. Para un restaurante, la versión mínima sería algo así:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Casa Ejemplo",
  "url": "https://casaejemplo.es",
  "telephone": "+34 942 000 000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Ejemplo 3",
    "addressLocality": "Santander",
    "postalCode": "39001",
    "addressCountry": "ES"
  },
  "servesCuisine": "Cocina cántabra",
  "menu": "https://casaejemplo.es/carta",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "13:00",
    "closes": "16:00"
  }]
}
```

La regla de oro: todo lo que pongas aquí tiene que coincidir con lo que se ve en la página y con tu ficha de Google. Si el horario de los datos estructurados dice una cosa y el de la ficha otra, has creado justo la ambigüedad que querías quitar.

## Qué tipo de schema LocalBusiness le sirve a tu negocio

LocalBusiness es el tipo genérico, pero conviene usar el más concreto que exista. Algunos ejemplos:

| Negocio | Tipo de Schema.org | Propiedades que merece la pena añadir |
| --- | --- | --- |
| Restaurante, bar, cafetería | `Restaurant`, `BarOrPub`, `CafeOrCoffeeShop` | `servesCuisine`, `menu`, `acceptsReservations` |
| Clínica dental, fisioterapia | `Dentist`, `MedicalClinic`, `Physiotherapy` | `medicalSpecialty`, horario |
| Peluquería, centro de estética | `HairSalon`, `BeautySalon` | horario, servicios |
| Tienda física | `Store` o uno concreto (`ClothingStore`, `BookStore`…) | horario, `priceRange` |
| Profesional sin local | `ProfessionalService` | `areaServed` en lugar de dirección completa |

El último es mi caso. Esta web usa `ProfessionalService` con la zona en la que trabajo (Santander, Cantabria y España) y sin dirección de calle, porque no recibo clientes en un local. Y cada página de servicio lleva su propio bloque `Service` que dice qué ofrezco y quién lo ofrece. Así Google no tiene que deducir que «sistemas de reservas» y «tiendas online» son servicios del mismo negocio.

Si vendes por internet, la historia cambia: ahí mandan los datos de producto (precio, disponibilidad, valoraciones), y eso lo trato en el artículo de [SEO para tiendas online](/blog/seo-tiendas-online).

## Cómo comprobar que Google lo lee bien

Tres herramientas, todas gratis:

- La prueba de resultados enriquecidos de Google: pegas la URL y te dice qué datos estructurados detecta y si alguno da error.
- El validador de Schema.org (validator.schema.org): más estricto con el vocabulario, útil para tipos que Google no convierte en resultado enriquecido.
- Google Search Console: una vez la web está publicada, te avisa de errores en los datos estructurados que detecta al rastrear.

Pásalas cada vez que cambies la web, no solo el día del lanzamiento. Un cambio de plantilla puede llevarse el bloque por delante sin que nadie se entere.

## Cómo se añaden según tu web

Con WordPress, los plugins de SEO más conocidos generan datos estructurados básicos; revisa qué tipo ponen por defecto, porque a menudo es un genérico que no te describe. Con Shopify o Wix depende del tema. Con una web a medida los escribes tú (o quien te la haga) y controlas cada campo, que es lo que hago yo. Y si la web además carga rápido, mejor: los datos estructurados ayudan a que Google te entienda, pero la [velocidad de la web](/blog/web-rapida-mejor-seo) decide si el visitante se queda.

## Por dónde empezaría

Pasa tu portada por la prueba de resultados enriquecidos. Si no aparece ningún tipo de negocio local, ya sabes qué falta. Si aparece uno genérico, cámbialo por el más concreto y añade dirección, horario y teléfono iguales a tu ficha de Google.

Si prefieres que lo revise yo o que tu web lo traiga de serie, tienes cómo trabajo en [diseño web para negocios](/servicios/web-para-negocios). O [escríbeme](/#contacto) y lo miramos.
