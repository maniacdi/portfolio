/**
 * Legal texts (privacy policy, cookie policy, legal notice).
 *
 * Kept out of src/i18n/*.json on purpose: NextIntlClientProvider ships the
 * whole message bundle to the client on every route, and these documents are
 * only ever read on three pages. Here they stay in the server bundle of those
 * routes.
 *
 */

export const OWNER = {
  name: "Javier García Magaldi",
  brand: "Magaldidev",
  nif: "72178446F",
  address: "Federico Vial 1A 1ºB, 39009 Santander, Cantabria, España",
  email: "magaldi6@gmail.com",
  site: "javimagaldi.com",
} as const;

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export type Locale = "es" | "en";

const UPDATED = {
  es: "3 de agosto de 2026",
  en: "3 August 2026",
} as const;

/* ============================================================
   PRIVACY POLICY
============================================================ */

const privacyEs: LegalDoc = {
  title: "Política de privacidad",
  updated: UPDATED.es,
  intro:
    "Esta política explica qué datos personales se tratan cuando visitas javimagaldi.com, con qué finalidad, con qué base jurídica y qué puedes hacer al respecto.",
  sections: [
    {
      heading: "1. Responsable del tratamiento",
      blocks: [
        {
          type: "ul",
          items: [
            `Titular: ${OWNER.name} (${OWNER.brand})`,
            `NIF: ${OWNER.nif}`,
            `Domicilio: ${OWNER.address}`,
            `Correo de contacto y ejercicio de derechos: ${OWNER.email}`,
            `Sitio web: https://${OWNER.site}`,
          ],
        },
        {
          type: "p",
          text: "No se ha designado Delegado de Protección de Datos: el tratamiento no alcanza los supuestos del artículo 37 del RGPD.",
        },
      ],
    },
    {
      heading: "2. Qué datos se tratan y para qué",
      blocks: [
        {
          type: "table",
          headers: ["Tratamiento", "Datos", "Finalidad", "Base jurídica", "Conservación"],
          rows: [
            [
              "Formulario de contacto",
              "Nombre, correo electrónico, tipo de servicio y contenido del mensaje",
              "Responder a tu consulta y, si procede, preparar un presupuesto",
              "Consentimiento y medidas precontractuales (art. 6.1.a y 6.1.b RGPD)",
              "12 meses desde el último contacto, salvo que exista relación contractual o obligación legal",
            ],
            [
              "Asistente virtual (chatbot)",
              "Contenido de los mensajes que escribes; dirección IP para limitar abuso",
              "Responder preguntas sobre el portfolio y evitar el uso abusivo del servicio",
              "Consentimiento al iniciar la conversación e interés legítimo en la seguridad (art. 6.1.a y 6.1.f RGPD)",
              "Los mensajes no se almacenan en este sitio; la IP se guarda en memoria volátil un máximo de 1 minuto",
            ],
            [
              "Analítica web (Google Analytics 4)",
              "Identificadores de cookie, IP anonimizada, páginas vistas, idioma, dispositivo aproximado",
              "Medir el tráfico y entender qué contenidos interesan",
              "Consentimiento (art. 6.1.a RGPD y art. 22.2 LSSI-CE)",
              "Hasta 14 meses",
            ],
            [
              "Analítica sin cookies (Vercel Analytics y Speed Insights)",
              "Métricas agregadas de visitas y rendimiento; no se usan cookies ni identificadores persistentes",
              "Conocer el volumen de visitas y la velocidad real del sitio",
              "Interés legítimo en mantener y mejorar el sitio (art. 6.1.f RGPD)",
              "Hasta 25 meses en formato agregado",
            ],
            [
              "Monitorización de errores (Sentry)",
              "Mensaje de error, navegador, sistema operativo, URL y traza técnica. La opción de PII está desactivada",
              "Detectar y corregir fallos del sitio",
              "Interés legítimo en la seguridad y el correcto funcionamiento (art. 6.1.f RGPD)",
              "90 días",
            ],
            [
              "Grabación de sesión (Sentry Session Replay)",
              "Reconstrucción de la navegación: clics, desplazamientos y cambios de página",
              "Reproducir el contexto exacto de un error",
              "Consentimiento (art. 6.1.a RGPD)",
              "90 días",
            ],
            [
              "Widget del tiempo",
              "Coordenadas de geolocalización, solo si aceptas el permiso del navegador",
              "Mostrar la previsión meteorológica de tu ubicación",
              "Consentimiento otorgado en el propio navegador (art. 6.1.a RGPD)",
              "No se almacenan: se usan en la petición y se descartan",
            ],
            [
              "Alojamiento y registros del servidor",
              "Dirección IP, fecha y hora, agente de usuario, recurso solicitado",
              "Servir la web y garantizar su seguridad",
              "Interés legítimo (art. 6.1.f RGPD)",
              "Según la política de retención de Vercel (por defecto, 30 días)",
            ],
          ],
        },
        {
          type: "p",
          text: "Las tipografías se sirven desde este mismo dominio, por lo que no se realiza ninguna petición a servidores de Google al cargar la página.",
        },
      ],
    },
    {
      heading: "3. Encargados y terceros que intervienen",
      blocks: [
        {
          type: "p",
          text: "Para prestar el servicio intervienen los siguientes proveedores, cada uno con su propio acuerdo de tratamiento de datos:",
        },
        {
          type: "table",
          headers: ["Proveedor", "Servicio", "Ubicación"],
          rows: [
            [
              "Vercel Inc.",
              "Alojamiento, analítica sin cookies y Speed Insights",
              "EE. UU. (Data Privacy Framework)",
            ],
            [
              "Google Ireland Ltd. / Google LLC",
              "Google Analytics 4",
              "UE con transferencias a EE. UU. (Data Privacy Framework)",
            ],
            [
              "Functional Software, Inc. (Sentry)",
              "Monitorización de errores y grabación de sesión",
              "Región de datos de la UE (Alemania)",
            ],
            ["Groq, Inc.", "Modelo de lenguaje que responde en el chatbot", "EE. UU."],
            [
              "Web3Forms",
              "Entrega por correo de los formularios de contacto",
              "Según el proveedor; ver su política",
            ],
            [
              "OpenStreetMap Foundation y CARTO",
              "Teselas del mapa de la sección Viajes",
              "UE / EE. UU.",
            ],
            ["Open-Meteo", "Datos meteorológicos", "UE (Alemania)"],
            [
              "GitHub, Inc.",
              "Estadísticas públicas de repositorios",
              "EE. UU. (Data Privacy Framework)",
            ],
            ["Cloudinary", "Entrega de imágenes", "EE. UU. (Data Privacy Framework)"],
          ],
        },
        {
          type: "p",
          text: "Al cargar mapas, imágenes o datos de estos servicios, tu dirección IP es visible para ellos por necesidad técnica. No se ceden datos a terceros con finalidades distintas de las descritas, ni se venden.",
        },
      ],
    },
    {
      heading: "4. Transferencias internacionales",
      blocks: [
        {
          type: "p",
          text: "Algunos proveedores están establecidos en Estados Unidos. Esas transferencias se amparan en el EU-US Data Privacy Framework, en cláusulas contractuales tipo aprobadas por la Comisión Europea o en ambas, según el proveedor. Puedes solicitar información sobre las garantías aplicables escribiendo a la dirección de contacto.",
        },
      ],
    },
    {
      heading: "5. Uso del asistente virtual",
      blocks: [
        {
          type: "p",
          text: "El contenido que escribes en el chatbot se envía a un modelo de lenguaje alojado por Groq, Inc. para generar la respuesta. No introduzcas datos personales de terceros, credenciales, información confidencial ni datos de categorías especiales (salud, ideología, orientación sexual u otros del art. 9 RGPD). Si necesitas tratar algo así, escríbeme por correo.",
        },
      ],
    },
    {
      heading: "6. Tus derechos",
      blocks: [
        {
          type: "p",
          text: `Puedes ejercer los siguientes derechos escribiendo a ${OWNER.email}, indicando el derecho que ejercitas y acreditando tu identidad:`,
        },
        {
          type: "ul",
          items: [
            "Acceso a los datos que se tratan sobre ti.",
            "Rectificación de los datos inexactos.",
            "Supresión cuando ya no sean necesarios.",
            "Oposición al tratamiento basado en interés legítimo.",
            "Limitación del tratamiento en los casos previstos por la norma.",
            "Portabilidad de los datos que hayas facilitado.",
            "Retirada del consentimiento en cualquier momento, sin efectos retroactivos.",
          ],
        },
        {
          type: "p",
          text: "La respuesta se dará en el plazo máximo de un mes. Si consideras que el tratamiento no se ajusta a la normativa, puedes reclamar ante la Agencia Española de Protección de Datos (C/ Jorge Juan 6, 28001 Madrid — www.aepd.es).",
        },
      ],
    },
    {
      heading: "7. Menores de edad",
      blocks: [
        {
          type: "p",
          text: "Este sitio no está dirigido a menores de 14 años y no se recaban datos de forma consciente sobre ellos. Si detectas lo contrario, comunícalo a la dirección de contacto y se eliminarán.",
        },
      ],
    },
    {
      heading: "8. Seguridad",
      blocks: [
        {
          type: "p",
          text: "El sitio se sirve íntegramente por HTTPS y se aplican medidas técnicas razonables para proteger la información. Ningún sistema es infalible: si detectas una vulnerabilidad, avísame antes de divulgarla.",
        },
      ],
    },
    {
      heading: "9. Cambios en esta política",
      blocks: [
        {
          type: "p",
          text: "Si cambian las herramientas o las finalidades, esta política se actualizará y se modificará la fecha del encabezado. Cuando el cambio afecte a tratamientos basados en consentimiento, se volverá a solicitar.",
        },
      ],
    },
  ],
};

const privacyEn: LegalDoc = {
  title: "Privacy policy",
  updated: UPDATED.en,
  intro:
    "This policy explains what personal data is processed when you visit javimagaldi.com, for what purpose, on what legal basis, and what you can do about it.",
  sections: [
    {
      heading: "1. Data controller",
      blocks: [
        {
          type: "ul",
          items: [
            `Owner: ${OWNER.name} (${OWNER.brand})`,
            `Tax ID: ${OWNER.nif}`,
            `Address: ${OWNER.address}`,
            `Contact and data-rights requests: ${OWNER.email}`,
            `Website: https://${OWNER.site}`,
          ],
        },
        {
          type: "p",
          text: "No Data Protection Officer has been appointed: the processing carried out does not meet the thresholds of Article 37 GDPR.",
        },
      ],
    },
    {
      heading: "2. What data is processed and why",
      blocks: [
        {
          type: "table",
          headers: ["Processing", "Data", "Purpose", "Legal basis", "Retention"],
          rows: [
            [
              "Contact form",
              "Name, email address, service type and message content",
              "Reply to your enquiry and, where relevant, prepare a quote",
              "Consent and pre-contractual steps (Art. 6(1)(a) and 6(1)(b) GDPR)",
              "12 months from the last contact, unless a contract or legal duty applies",
            ],
            [
              "Virtual assistant (chatbot)",
              "The content of the messages you type; IP address for abuse limiting",
              "Answer questions about the portfolio and prevent abuse of the service",
              "Consent when starting the conversation and legitimate interest in security (Art. 6(1)(a) and 6(1)(f) GDPR)",
              "Messages are not stored on this site; the IP is held in volatile memory for at most 1 minute",
            ],
            [
              "Web analytics (Google Analytics 4)",
              "Cookie identifiers, anonymised IP, pages viewed, language, approximate device",
              "Measure traffic and understand which content is of interest",
              "Consent (Art. 6(1)(a) GDPR and Art. 22.2 of Spanish Law 34/2002)",
              "Up to 14 months",
            ],
            [
              "Cookieless analytics (Vercel Analytics and Speed Insights)",
              "Aggregated visit and performance metrics; no cookies or persistent identifiers",
              "Know the volume of visits and the real speed of the site",
              "Legitimate interest in maintaining and improving the site (Art. 6(1)(f) GDPR)",
              "Up to 25 months in aggregated form",
            ],
            [
              "Error monitoring (Sentry)",
              "Error message, browser, operating system, URL and technical stack trace. The PII option is disabled",
              "Detect and fix site failures",
              "Legitimate interest in security and correct operation (Art. 6(1)(f) GDPR)",
              "90 days",
            ],
            [
              "Session replay (Sentry Session Replay)",
              "Reconstruction of your browsing: clicks, scrolling and page changes",
              "Reproduce the exact context of an error",
              "Consent (Art. 6(1)(a) GDPR)",
              "90 days",
            ],
            [
              "Weather widget",
              "Geolocation coordinates, only if you accept the browser permission",
              "Show the weather forecast for your location",
              "Consent given in the browser itself (Art. 6(1)(a) GDPR)",
              "Not stored: used in the request and discarded",
            ],
            [
              "Hosting and server logs",
              "IP address, date and time, user agent, requested resource",
              "Serve the website and keep it secure",
              "Legitimate interest (Art. 6(1)(f) GDPR)",
              "As per Vercel's retention policy (30 days by default)",
            ],
          ],
        },
        {
          type: "p",
          text: "Fonts are served from this same domain, so no request is made to Google servers when the page loads.",
        },
      ],
    },
    {
      heading: "3. Processors and third parties involved",
      blocks: [
        {
          type: "p",
          text: "The following providers take part in delivering the service, each under its own data processing agreement:",
        },
        {
          type: "table",
          headers: ["Provider", "Service", "Location"],
          rows: [
            [
              "Vercel Inc.",
              "Hosting, cookieless analytics and Speed Insights",
              "USA (Data Privacy Framework)",
            ],
            [
              "Google Ireland Ltd. / Google LLC",
              "Google Analytics 4",
              "EU with transfers to the USA (Data Privacy Framework)",
            ],
            [
              "Functional Software, Inc. (Sentry)",
              "Error monitoring and session replay",
              "EU data region (Germany)",
            ],
            ["Groq, Inc.", "Language model powering the chatbot", "USA"],
            [
              "Web3Forms",
              "Email delivery of contact form submissions",
              "As per the provider; see their policy",
            ],
            ["OpenStreetMap Foundation and CARTO", "Map tiles in the Travels section", "EU / USA"],
            ["Open-Meteo", "Weather data", "EU (Germany)"],
            ["GitHub, Inc.", "Public repository statistics", "USA (Data Privacy Framework)"],
            ["Cloudinary", "Image delivery", "USA (Data Privacy Framework)"],
          ],
        },
        {
          type: "p",
          text: "When maps, images or data from these services load, your IP address is technically visible to them. No data is disclosed to third parties for purposes other than those described, and none is sold.",
        },
      ],
    },
    {
      heading: "4. International transfers",
      blocks: [
        {
          type: "p",
          text: "Some providers are established in the United States. Those transfers rely on the EU-US Data Privacy Framework, on standard contractual clauses approved by the European Commission, or on both, depending on the provider. You can request information about the applicable safeguards by writing to the contact address.",
        },
      ],
    },
    {
      heading: "5. Using the virtual assistant",
      blocks: [
        {
          type: "p",
          text: "What you type into the chatbot is sent to a language model hosted by Groq, Inc. to generate the reply. Do not enter third-party personal data, credentials, confidential information or special category data (health, beliefs, sexual orientation or others under Art. 9 GDPR). If you need to discuss something like that, email me instead.",
        },
      ],
    },
    {
      heading: "6. Your rights",
      blocks: [
        {
          type: "p",
          text: `You can exercise the following rights by writing to ${OWNER.email}, stating the right you are exercising and proving your identity:`,
        },
        {
          type: "ul",
          items: [
            "Access to the data processed about you.",
            "Rectification of inaccurate data.",
            "Erasure once the data is no longer necessary.",
            "Objection to processing based on legitimate interest.",
            "Restriction of processing in the cases provided by law.",
            "Portability of the data you provided.",
            "Withdrawal of consent at any time, without retroactive effect.",
          ],
        },
        {
          type: "p",
          text: "You will get a reply within one month at the latest. If you believe the processing does not comply with the law, you may lodge a complaint with the Spanish Data Protection Agency (C/ Jorge Juan 6, 28001 Madrid — www.aepd.es).",
        },
      ],
    },
    {
      heading: "7. Minors",
      blocks: [
        {
          type: "p",
          text: "This site is not aimed at children under 14 and no data about them is knowingly collected. If you notice otherwise, tell me at the contact address and it will be deleted.",
        },
      ],
    },
    {
      heading: "8. Security",
      blocks: [
        {
          type: "p",
          text: "The site is served entirely over HTTPS and reasonable technical measures are in place to protect information. No system is infallible: if you find a vulnerability, tell me before disclosing it.",
        },
      ],
    },
    {
      heading: "9. Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "If the tools or purposes change, this policy will be updated and the date in the header amended. Where a change affects consent-based processing, consent will be requested again.",
        },
      ],
    },
  ],
};

/* ============================================================
   COOKIE POLICY
============================================================ */

const cookiesEs: LegalDoc = {
  title: "Política de cookies",
  updated: UPDATED.es,
  intro:
    "Aquí tienes el detalle de las cookies y del almacenamiento local que usa javimagaldi.com, y cómo controlarlos.",
  sections: [
    {
      heading: "1. Qué son y qué se usa aquí",
      blocks: [
        {
          type: "p",
          text: "Una cookie es un pequeño archivo que un sitio guarda en tu navegador. Este sitio también usa localStorage, que funciona igual a efectos legales: se le aplican las mismas reglas del artículo 22.2 de la LSSI-CE.",
        },
        {
          type: "p",
          text: "Las cookies y el almacenamiento técnicamente necesarios se activan sin consentimiento, porque sin ellos el sitio no funciona. Todo lo demás —analítica y grabación de sesión— solo se activa si lo aceptas.",
        },
      ],
    },
    {
      heading: "2. Necesarias (siempre activas)",
      blocks: [
        {
          type: "table",
          headers: ["Nombre", "Tipo", "Titular", "Finalidad", "Duración"],
          rows: [
            [
              "portfolio-consent",
              "localStorage",
              "Propia",
              "Guardar tu decisión sobre cookies para no volver a preguntarte",
              "Hasta que la borres o la revoques",
            ],
            ["NEXT_LOCALE", "Cookie", "Propia", "Recordar el idioma elegido", "1 año"],
            [
              "portfolio-theme",
              "localStorage",
              "Propia",
              "Recordar si usas tema claro u oscuro",
              "Persistente",
            ],
            [
              "portfolio-store",
              "localStorage",
              "Propia",
              "Preferencias de interfaz del propio sitio",
              "Persistente",
            ],
            [
              "portfolio-easter-eggs",
              "localStorage",
              "Propia",
              "Recordar qué easter eggs has encontrado",
              "Persistente",
            ],
          ],
        },
      ],
    },
    {
      heading: "3. Analítica (requieren consentimiento)",
      blocks: [
        {
          type: "table",
          headers: ["Nombre", "Tipo", "Titular", "Finalidad", "Duración"],
          rows: [
            ["_ga", "Cookie", "Google", "Distinguir visitantes de forma estadística", "2 años"],
            [
              "_ga_<ID>",
              "Cookie",
              "Google",
              "Mantener el estado de la sesión de analítica",
              "2 años",
            ],
            ["_gid", "Cookie", "Google", "Distinguir visitantes", "24 horas"],
          ],
        },
        {
          type: "p",
          text: "Mientras no aceptes la analítica, el script de Google no se descarga: no es que quede en modo pasivo, es que no llega a cargarse. Los avisos publicitarios de Consent Mode están denegados de forma permanente, ya que este sitio no crea audiencias de publicidad.",
        },
      ],
    },
    {
      heading: "4. Grabación de sesión (requiere consentimiento)",
      blocks: [
        {
          type: "table",
          headers: ["Nombre", "Tipo", "Titular", "Finalidad", "Duración"],
          rows: [
            [
              "sentryReplaySession",
              "sessionStorage",
              "Sentry",
              "Identificar la grabación de la sesión asociada a un error",
              "Hasta cerrar la pestaña",
            ],
          ],
        },
      ],
    },
    {
      heading: "5. Sin cookies",
      blocks: [
        {
          type: "p",
          text: "Vercel Analytics y Vercel Speed Insights miden visitas y rendimiento sin cookies ni identificadores persistentes en tu navegador, por lo que no requieren consentimiento previo. Puedes consultar el detalle en la política de privacidad.",
        },
      ],
    },
    {
      heading: "6. Cómo cambiar o revocar tu decisión",
      blocks: [
        {
          type: "ul",
          items: [
            "En este sitio: pulsa «Preferencias de cookies» en el pie de página. Se abre el mismo panel y puedes cambiar cada categoría o rechazarlo todo.",
            "En tu navegador: puedes bloquear o eliminar cookies desde la configuración de Chrome, Firefox, Safari o Edge. Si bloqueas todo, el sitio sigue funcionando, pero perderá el idioma y el tema que hayas elegido.",
          ],
        },
      ],
    },
  ],
};

const cookiesEn: LegalDoc = {
  title: "Cookie policy",
  updated: UPDATED.en,
  intro:
    "Here is the detail of the cookies and local storage used by javimagaldi.com, and how to control them.",
  sections: [
    {
      heading: "1. What they are and what is used here",
      blocks: [
        {
          type: "p",
          text: "A cookie is a small file a site stores in your browser. This site also uses localStorage, which is legally equivalent: the same rules of Article 22.2 of Spanish Law 34/2002 apply to it.",
        },
        {
          type: "p",
          text: "Strictly necessary cookies and storage are enabled without consent, because the site does not work without them. Everything else — analytics and session replay — is only enabled if you accept it.",
        },
      ],
    },
    {
      heading: "2. Necessary (always on)",
      blocks: [
        {
          type: "table",
          headers: ["Name", "Type", "Owner", "Purpose", "Duration"],
          rows: [
            [
              "portfolio-consent",
              "localStorage",
              "First party",
              "Store your cookie decision so you are not asked again",
              "Until you delete or revoke it",
            ],
            ["NEXT_LOCALE", "Cookie", "First party", "Remember the language you chose", "1 year"],
            [
              "portfolio-theme",
              "localStorage",
              "First party",
              "Remember whether you use light or dark theme",
              "Persistent",
            ],
            [
              "portfolio-store",
              "localStorage",
              "First party",
              "Interface preferences of the site itself",
              "Persistent",
            ],
            [
              "portfolio-easter-eggs",
              "localStorage",
              "First party",
              "Remember which easter eggs you have found",
              "Persistent",
            ],
          ],
        },
      ],
    },
    {
      heading: "3. Analytics (consent required)",
      blocks: [
        {
          type: "table",
          headers: ["Name", "Type", "Owner", "Purpose", "Duration"],
          rows: [
            ["_ga", "Cookie", "Google", "Distinguish visitors for statistics", "2 years"],
            ["_ga_<ID>", "Cookie", "Google", "Keep the analytics session state", "2 years"],
            ["_gid", "Cookie", "Google", "Distinguish visitors", "24 hours"],
          ],
        },
        {
          type: "p",
          text: "Until you accept analytics the Google script is not downloaded — it is not sitting there in passive mode, it never loads at all. Consent Mode advertising signals stay permanently denied, since this site does not build advertising audiences.",
        },
      ],
    },
    {
      heading: "4. Session replay (consent required)",
      blocks: [
        {
          type: "table",
          headers: ["Name", "Type", "Owner", "Purpose", "Duration"],
          rows: [
            [
              "sentryReplaySession",
              "sessionStorage",
              "Sentry",
              "Identify the session recording linked to an error",
              "Until you close the tab",
            ],
          ],
        },
      ],
    },
    {
      heading: "5. No cookies involved",
      blocks: [
        {
          type: "p",
          text: "Vercel Analytics and Vercel Speed Insights measure visits and performance without cookies or persistent identifiers in your browser, so they need no prior consent. The detail is in the privacy policy.",
        },
      ],
    },
    {
      heading: "6. How to change or withdraw your decision",
      blocks: [
        {
          type: "ul",
          items: [
            "On this site: click “Cookie preferences” in the footer. The same panel opens and you can change each category or reject everything.",
            "In your browser: you can block or delete cookies from the settings of Chrome, Firefox, Safari or Edge. If you block everything the site still works, but it will forget the language and theme you picked.",
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   LEGAL NOTICE (LSSI-CE art. 10)
============================================================ */

const legalNoticeEs: LegalDoc = {
  title: "Aviso legal",
  updated: UPDATED.es,
  intro:
    "Información general exigida por la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), y condiciones de uso de este sitio.",
  sections: [
    {
      heading: "1. Datos identificativos",
      blocks: [
        {
          type: "ul",
          items: [
            `Titular del sitio: ${OWNER.name}`,
            `Nombre comercial: ${OWNER.brand}`,
            `NIF: ${OWNER.nif}`,
            `Domicilio a efectos de notificaciones: ${OWNER.address}`,
            `Correo electrónico: ${OWNER.email}`,
            `Dominio: https://${OWNER.site}`,
          ],
        },
        {
          type: "p",
          text: "Actividad: desarrollo web y servicios profesionales de programación.",
        },
      ],
    },
    {
      heading: "2. Objeto del sitio",
      blocks: [
        {
          type: "p",
          text: "Este sitio es un portfolio profesional: muestra proyectos, experiencia y artículos, y permite contactar para solicitar servicios de desarrollo. No es una tienda en línea y no se realizan pagos a través de la web.",
        },
      ],
    },
    {
      heading: "3. Condiciones de uso",
      blocks: [
        {
          type: "ul",
          items: [
            "El acceso al sitio es gratuito y no requiere registro.",
            "Te comprometes a usar el sitio de acuerdo con la ley y a no intentar alterar su funcionamiento, sobrecargar el servicio ni acceder a partes no públicas.",
            "El asistente virtual genera respuestas automáticamente y puede equivocarse: su contenido es informativo y no constituye una oferta contractual ni asesoramiento profesional.",
            "La información sobre servicios y presupuestos es orientativa hasta que se confirme por escrito.",
          ],
        },
      ],
    },
    {
      heading: "4. Propiedad intelectual e industrial",
      blocks: [
        {
          type: "p",
          text: `El diseño, los textos, el código y las imágenes propias de este sitio pertenecen a ${OWNER.name}, salvo indicación distinta. Puedes citar y enlazar el contenido indicando la fuente; para reproducirlo o reutilizarlo de forma sustancial hace falta autorización previa por escrito.`,
        },
        {
          type: "p",
          text: "Las marcas, logotipos y capturas de terceros que aparecen en los proyectos pertenecen a sus respectivos titulares y se usan a título ilustrativo. El código publicado en repositorios públicos se rige por la licencia indicada en cada repositorio.",
        },
      ],
    },
    {
      heading: "5. Responsabilidad",
      blocks: [
        {
          type: "ul",
          items: [
            "Se procura que la información esté actualizada y sea correcta, pero no se garantiza que esté libre de errores ni que el sitio esté disponible de forma ininterrumpida.",
            "No se asume responsabilidad por el contenido de los sitios externos enlazados: los enlaces no implican respaldo ni asociación.",
            "No se responde de los daños derivados de un uso indebido del sitio o de fallos ajenos de conectividad o de los proveedores.",
          ],
        },
      ],
    },
    {
      heading: "6. Protección de datos y cookies",
      blocks: [
        {
          type: "p",
          text: "El tratamiento de datos personales se describe en la Política de privacidad, y el uso de cookies y almacenamiento local en la Política de cookies. Ambas forman parte de este aviso legal.",
        },
      ],
    },
    {
      heading: "7. Legislación aplicable",
      blocks: [
        {
          type: "p",
          text: "Esta relación se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales del domicilio del titular, salvo que la normativa de consumo determine otro fuero.",
        },
      ],
    },
  ],
};

const legalNoticeEn: LegalDoc = {
  title: "Legal notice",
  updated: UPDATED.en,
  intro:
    "General information required by Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), plus the terms of use of this site.",
  sections: [
    {
      heading: "1. Identifying details",
      blocks: [
        {
          type: "ul",
          items: [
            `Site owner: ${OWNER.name}`,
            `Trading name: ${OWNER.brand}`,
            `Tax ID: ${OWNER.nif}`,
            `Address for notices: ${OWNER.address}`,
            `Email: ${OWNER.email}`,
            `Domain: https://${OWNER.site}`,
          ],
        },
        {
          type: "p",
          text: "Activity: web development and professional programming services.",
        },
      ],
    },
    {
      heading: "2. Purpose of the site",
      blocks: [
        {
          type: "p",
          text: "This site is a professional portfolio: it shows projects, experience and articles, and lets you get in touch to request development services. It is not an online shop and no payments are made through the site.",
        },
      ],
    },
    {
      heading: "3. Terms of use",
      blocks: [
        {
          type: "ul",
          items: [
            "Access to the site is free and requires no registration.",
            "You agree to use the site lawfully and not to attempt to disrupt its operation, overload the service or access non-public areas.",
            "The virtual assistant generates answers automatically and can be wrong: its content is informational and is neither a contractual offer nor professional advice.",
            "Information about services and quotes is indicative until confirmed in writing.",
          ],
        },
      ],
    },
    {
      heading: "4. Intellectual and industrial property",
      blocks: [
        {
          type: "p",
          text: `The design, texts, code and original images of this site belong to ${OWNER.name} unless stated otherwise. You may quote and link to the content citing the source; substantial reproduction or reuse requires prior written permission.`,
        },
        {
          type: "p",
          text: "Third-party trademarks, logos and screenshots shown in the projects belong to their respective owners and are used for illustration. Code published in public repositories is governed by the licence stated in each repository.",
        },
      ],
    },
    {
      heading: "5. Liability",
      blocks: [
        {
          type: "ul",
          items: [
            "Information is kept up to date and accurate as far as possible, but it is not guaranteed to be error-free, nor is uninterrupted availability of the site.",
            "No responsibility is accepted for the content of external linked sites: links imply neither endorsement nor association.",
            "No liability is accepted for damage arising from misuse of the site or from third-party connectivity or provider failures.",
          ],
        },
      ],
    },
    {
      heading: "6. Data protection and cookies",
      blocks: [
        {
          type: "p",
          text: "The processing of personal data is described in the Privacy policy, and the use of cookies and local storage in the Cookie policy. Both form part of this legal notice.",
        },
      ],
    },
    {
      heading: "7. Applicable law",
      blocks: [
        {
          type: "p",
          text: "This relationship is governed by Spanish law. Any dispute shall be subject to the courts of the owner's domicile, unless consumer legislation determines a different venue.",
        },
      ],
    },
  ],
};

export const privacyPolicy: Record<Locale, LegalDoc> = { es: privacyEs, en: privacyEn };
export const cookiePolicy: Record<Locale, LegalDoc> = { es: cookiesEs, en: cookiesEn };
export const legalNotice: Record<Locale, LegalDoc> = { es: legalNoticeEs, en: legalNoticeEn };
