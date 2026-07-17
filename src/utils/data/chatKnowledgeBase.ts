export interface ChatResponse {
  answer: string;
  followUp?: string[];
}

export interface KnowledgeCategory {
  keywords: string[];
  responses: ChatResponse[];
  contextual?: boolean;
}

export const knowledgeBaseES = {
  // INFORMACIÓN PERSONAL
  personal: {
    keywords: [
      "quien",
      "eres",
      "tu nombre",
      "te llamas",
      "presentate",
      "about",
      "ti",
      "quien eres",
    ],
    responses: [
      {
        answer:
          "¡Hola! Soy Javi, desarrollador full-stack con 6 años de experiencia en productos web en producción y entornos corporativos a gran escala. Trabajo con React y TypeScript en el front y Java (Spring Boot) y Node.js en el back, en aplicaciones usadas por más de 10.000 usuarios diarios en Inditex. Me apasiona crear experiencias de usuario de calidad, optimizar rendimiento y escribir código que escale en el tiempo.",
        followUp: [
          "¿Qué tecnologías dominas?",
          "¿Dónde trabajas actualmente?",
          "¿Qué proyectos has hecho?",
        ],
      },
    ],
  },

  // EXPERIENCIA LABORAL GENERAL
  experience: {
    keywords: [
      "experiencia",
      "trabajo",
      "trabajado",
      "empresa",
      "empleo",
      "carrera",
      "profesional",
      "años",
      "trayectoria",
    ],
    responses: [
      {
        answer:
          "Tengo 6 años de experiencia como desarrollador. Empecé con prácticas en Incentro (2020), donde luego trabajé 2 años rediseñando webs corporativas y gestionando e-commerce. Después estuve 9 meses en Innova-tsn como consultor full-stack. Actualmente (desde mayo 2023) trabajo en AMS Solutions como desarrollador senior front-end/full-stack en aplicaciones críticas para Inditex, donde lidero proyectos de optimización y mentorizo a desarrolladores junior.",
        followUp: ["¿Qué haces en AMS?", "¿Qué lograste en cada empresa?", "¿Trabajas en remoto?"],
      },
    ],
  },

  // AMS SOLUTIONS - DETALLADO
  ams: {
    keywords: [
      "ams",
      "actual",
      "ahora",
      "inditex",
      "trabajo actual",
      "donde trabajas",
      "ams solutions",
    ],
    responses: [
      {
        answer:
          "En AMS Solutions soy Desarrollador Senior Front-End/Full-Stack para Inditex, en aplicaciones corporativas con más de 10.000 usuarios diarios. Mis logros incluyen: 1) Desarrollé un centro de noticias y acceso unificado para todo el ecosistema (−25% en tiempo de búsqueda de información). 2) Implementé microservicios en Java 21 + Spring Boot 3 con arquitectura hexagonal/DDD sobre MongoDB y Redis. 3) Diseñé un BFF que mejoró los tiempos de respuesta un 40% y redujo la carga de los servicios frontend más de un 30%. 4) Subí la cobertura de tests (Jest + Cypress) del 60% al 85%. 5) Mentorizo a juniors mediante code reviews (uno promocionado en menos de un año).",
        followUp: ["¿Qué es un BFF?", "¿Cómo mentorizas?", "¿Qué impacto tuviste?"],
      },
    ],
  },

  // INNOVA-TSN
  innova: {
    keywords: ["innova", "innova-tsn", "consultor", "consultoria"],
    responses: [
      {
        answer:
          "En Innova-tsn trabajé 9 meses como consultor y desarrollador full-stack. Desarrollé componentes para aplicaciones web corporativas, analicé requisitos funcionales y técnicos en colaboración con clientes, y gestioné datos mediante SQL para reporting. Fue mi primera experiencia en consultoría, lo que me enseñó a adaptarme rápidamente a diferentes contextos y comunicar soluciones técnicas de forma clara.",
        followUp: ["¿Qué aprendiste en consultoría?", "¿Dónde más has trabajado?"],
      },
    ],
  },

  // INCENTRO
  incentro: {
    keywords: ["incentro", "primer trabajo", "practicas", "comenzo", "inicio"],
    responses: [
      {
        answer:
          "Incentro fue mi primera experiencia profesional. Empecé con prácticas (jun-sept 2020) y me quedé 2 años como Frontend Developer. Rediseñé y desarrollé desde cero la web corporativa, gestioné CMS y e-commerce de gran volumen, automaticé procesos de gestión de contenidos y mantuve múltiples aplicaciones frontend conectadas a un mismo backend. Aquí consolidé mis fundamentos en React y aprendí sobre arquitecturas escalables.",
        followUp: ["¿Qué proyectos hiciste allí?", "¿Cómo fue tu evolución?"],
      },
    ],
  },

  // STACK TECNOLÓGICO DETALLADO
  stack: {
    keywords: [
      "tecnologias",
      "stack",
      "herramientas",
      "lenguajes",
      "frameworks",
      "programas",
      "usas",
      "dominas",
    ],
    responses: [
      {
        answer:
          "Mi stack principal: Frontend → React, React Native, Vue 3, TypeScript, JavaScript, Next.js, HTML5, CSS3/SASS, Tailwind, Framer Motion, Zustand/Redux. Backend → Java 21 + Spring Boot 3, Node.js, Express/Koa, BFF, REST APIs, WebSockets. Bases de datos → MongoDB, Redis, SQL. Testing → Jest, React Testing Library, Cypress, JUnit. DevOps/Tools → Git/GitHub, GitHub Actions, Docker, Nginx, Vercel, Agile/Scrum. También he trabajado con microfrontends (Module Federation) y CMS/e-commerce.",
        followUp: [
          "¿Qué prefieres, React o Vue?",
          "¿Tienes experiencia en backend?",
          "¿Usas TypeScript?",
        ],
      },
    ],
  },

  // REACT VS VUE - AMPLIADO
  reactVue: {
    keywords: ["react o vue", "prefieres react", "mejor react", "diferencia react vue", "comparar"],
    responses: [
      {
        answer:
          "Tengo experiencia sólida con ambos. React es mi herramienta principal: me gusta su ecosistema maduro, la flexibilidad del JSX, hooks potentes y la gran comunidad. Lo uso en proyectos complejos donde necesito control total. Vue lo aprecio por su curva de aprendizaje suave, sistema de reactividad elegante y developer experience. Lo he usado en AMS para proyectos internos. Ambos son excelentes; elijo según el contexto del proyecto, el equipo y los requisitos técnicos. En proyectos nuevos tiendo a React por familiaridad.",
        followUp: ["¿Qué proyectos hiciste con React?", "¿Conoces Next.js?"],
      },
    ],
  },

  // TYPESCRIPT
  typescript: {
    keywords: ["typescript", "tipos", "tipado", "type safety"],
    responses: [
      {
        answer:
          "TypeScript es esencial en mi trabajo diario. Lo uso en todos mis proyectos modernos porque reduce bugs, mejora el IntelliSense, facilita refactoring y sirve como documentación viva. En AMS trabajamos con TS en aplicaciones críticas donde la type safety es fundamental. También lo uso en mi portfolio personal (frontend y backend). Considero que TS es prácticamente estándar en proyectos profesionales modernos de JavaScript.",
        followUp: ["¿Qué otras tecnologías dominas?", "¿Haces backend con TS?"],
      },
    ],
  },

  // BACKEND DETALLADO
  backend: {
    keywords: ["backend", "servidor", "api", "bff", "node", "base de datos", "fullstack"],
    responses: [
      {
        answer:
          "Aunque mi especialidad es frontend, tengo experiencia sólida en backend. He diseñado e implementado un BFF (Backend For Frontend) con Node.js/Express que optimizó tiempos de respuesta y redujo llamadas al backend. Trabajo con bases de datos (MongoDB, Redis, SQL) para reporting y gestión de datos. He desarrollado APIs REST, manejado autenticación, y entiendo arquitecturas de microservicios. Me siento cómodo en el stack completo cuando el proyecto lo requiere.",
        followUp: [
          "¿Qué es un BFF exactamente?",
          "¿Qué bases de datos prefieres?",
          "¿Eres full-stack?",
        ],
      },
    ],
  },

  // BFF EXPLANATION - MÁS DETALLADO
  bff: {
    keywords: ["que es bff", "backend for frontend", "explica bff", "bff pattern"],
    responses: [
      {
        answer:
          "Un BFF (Backend For Frontend) es un patrón arquitectónico donde creas una capa intermedia específica para tu frontend. En mi implementación: 1) Agregaba datos de múltiples microservicios en una sola llamada. 2) Transformaba respuestas al formato exacto que el frontend necesita. 3) Manejaba caché para reducir latencia. 4) Optimizaba payload eliminando datos innecesarios. Resultado: pasamos de 5-6 llamadas individuales a 1 sola, mejorando los tiempos de respuesta un 40% y reduciendo la carga de los servicios frontend más de un 30%. Lo implementé con Node.js/Express y fue crítico para mejorar performance en aplicaciones de AMS.",
        followUp: [
          "¿Qué tecnologías usaste?",
          "¿Cómo mediste la mejora?",
          "¿Qué otros patrones conoces?",
        ],
      },
    ],
  },

  // TESTING AMPLIADO
  testing: {
    keywords: [
      "test",
      "testing",
      "pruebas",
      "jest",
      "cypress",
      "calidad",
      "qa",
      "e2e",
      "unitarias",
    ],
    responses: [
      {
        answer:
          "El testing es fundamental en mi workflow. Uso Jest para pruebas unitarias de componentes, funciones y lógica de negocio (en AMS subí la cobertura del 60% al 85%). Cypress para E2E, simulando flujos completos de usuario. En AMS impulsé la adopción de testing desde el inicio: escribí documentación, hice workshops internos y establecí estándares. También practico TDD cuando el proyecto lo permite. Creo que el testing no es solo para bugs, sino para confianza en refactoring y documentación ejecutable del código.",
        followUp: [
          "¿Qué cobertura de tests tienes?",
          "¿Haces TDD?",
          "¿Qué otras buenas prácticas sigues?",
        ],
      },
    ],
  },

  // EDUCACIÓN AMPLIADA
  education: {
    keywords: ["estudios", "universidad", "carrera", "educacion", "titulo", "grado", "cantabria"],
    responses: [
      {
        answer:
          "Estudié el Grado en Ingeniería Informática en la Universidad de Cantabria (2014-2020). Durante la carrera aprendí fundamentos sólidos: algoritmos, estructuras de datos, bases de datos, programación orientada a objetos (Java fue mi primer lenguaje serio), redes, sistemas operativos y desarrollo de software. También hice mi TFG sobre desarrollo de videojuegos (proyecto Pang en C#). La universidad me dio la base teórica; la experiencia profesional, la práctica y especialización en web.",
        followUp: ["¿Qué fue tu TFG?", "¿Tienes certificaciones?", "¿Sigues estudiando?"],
      },
    ],
  },

  // TFG
  tfg: {
    keywords: ["tfg", "trabajo fin de grado", "tesis", "proyecto final"],
    responses: [
      {
        answer:
          "Mi TFG fue el desarrollo de un videojuego basado en Pang (el clásico arcade) usando C# y Unity. Implementé física de movimiento, sistema de colisiones, power-ups, niveles progresivos y un sistema de puntuación. Fue mi primera experiencia creando algo completo desde cero y me enseñó sobre arquitectura de software, gestión de estados y game loops. Aunque luego me especialicé en web, esa experiencia con C# y patrones de diseño me ha sido muy útil.",
        followUp: ["¿Desarrollas videojuegos?", "¿Qué aprendiste?"],
      },
    ],
  },

  // PROYECTOS DETALLADOS
  projects: {
    keywords: [
      "proyectos",
      "portfolio",
      "hecho",
      "creado",
      "desarrollado",
      "github",
      "side projects",
    ],
    responses: [
      {
        answer:
          "Mis proyectos principales: 1) Portfolio Full-Stack: Frontend con Next.js, React, TypeScript, Framer Motion; Backend con Node.js, Express, MongoDB. Incluye sistema de viajes con mapa interactivo, easter eggs, chat assistant y más. 2) Marvel Explorer: Integración con Marvel API oficial, búsqueda de personajes y cómics con autenticación MD5. 3) Pokemon App: Backend Node.js consumiendo PokéAPI con caché y endpoints personalizados. 4) AMS Technical Test: E-commerce SPA completo con React, sistema de caché y gestión de carrito. Todos con READMEs detallados en github.com/maniacdi",
        followUp: ["¿Cuál es tu favorito?", "¿Qué tecnologías usaste?", "¿Puedo ver el código?"],
      },
    ],
  },

  // PORTFOLIO ESPECÍFICO
  portfolioProject: {
    keywords: [
      "este portfolio",
      "esta web",
      "este proyecto",
      "como hiciste esto",
      "como creaste esta pagina",
    ],
    responses: [
      {
        answer:
          "Este portfolio es mi proyecto personal más completo. Stack: Next.js 16 (App Router), React, TypeScript, Framer Motion, SASS. Backend propio en Node.js/Express/MongoDB desplegado en Vercel. Features únicas: mapa interactivo de viajes con Leaflet, sistema de easter eggs (¡prueba escribiendo 'kunai'!), chat assistant con pattern matching sin costos de API, repos destacados desde GitHub API, y un diseño neón-brutalista propio. Todo responsive, con i18n (ES/EN), y pensado para demostrar no solo código limpio sino creatividad y atención al detalle.",
        followUp: ["¿Cuánto tardaste?", "¿Qué fue lo más difícil?", "¿Qué tecnologías usaste?"],
      },
    ],
  },

  // GITHUB DETALLADO
  github: {
    keywords: ["github", "codigo", "repositorios", "open source", "git", "contribuciones"],
    responses: [
      {
        answer:
          "Mi GitHub (github.com/maniacdi) tiene 11+ repositorios públicos mostrando mi evolución: TypeScript, JavaScript, React, Vue, Node.js, Java, C#. Destacan: portfolio completo (full-stack), integraciones con APIs externas (Marvel, PokéAPI), pruebas técnicas documentadas y proyectos de aprendizaje. Todos con READMEs profesionales explicando arquitectura, setup y decisiones técnicas. Uso Git diariamente: branches, pull requests, code reviews, conventional commits. También contribuyo a repos cuando encuentro bugs o mejoras.",
        followUp: [
          "¿Qué proyectos recomiendas ver?",
          "¿Contribuyes a open source?",
          "¿Usas GitHub Actions?",
        ],
      },
    ],
  },

  // SOFT SKILLS DETALLADAS
  softSkills: {
    keywords: [
      "equipo",
      "comunicacion",
      "liderazgo",
      "mentor",
      "agile",
      "colaboracion",
      "scrum",
      "soft skills",
      "habilidades blandas",
    ],
    responses: [
      {
        answer:
          "Trabajo cómodamente en equipos multidisciplinares: backend, UX/UI, producto, QA. En AMS colaboro diariamente con ~15 personas en Agile/Scrum (sprints de 2 semanas, dailies, retros). Habilidades clave: 1) Comunicación técnica clara (explico conceptos complejos a no-técnicos). 2) Mentoría activa de juniors. 3) Code reviews constructivos. 4) Proactividad para proponer mejoras. 5) Adaptabilidad a cambios de prioridad. 6) Empatía con el usuario final. Me gusta el equilibrio entre autonomía y trabajo colaborativo.",
        followUp: [
          "¿Has liderado proyectos?",
          "¿Cómo resuelves conflictos?",
          "¿Prefieres trabajar solo o en equipo?",
        ],
      },
    ],
  },

  // MENTORÍA AMPLIADA
  mentoring: {
    keywords: ["mentor", "junior", "enseñar", "code review", "guiar", "mentoria", "enseñanza"],
    responses: [
      {
        answer:
          "En AMS mentorizo a 2 desarrolladores junior regularmente (uno promocionó en menos de un año). Mi enfoque: 1) Code reviews detallados explicando el 'por qué', no solo el 'qué'. 2) Pair programming en features complejas. 3) Compartir recursos (artículos, documentación, cursos). 4) Crear documentación interna de patrones y convenciones. 5) Fomentar preguntas sin juicio. Creo que un buen mentor no solo enseña código, sino pensamiento crítico, debugging y autonomía. Es gratificante ver su evolución y saber que contribuí a su crecimiento.",
        followUp: ["¿Qué aconsejas a juniors?", "¿Qué es lo más difícil de enseñar?"],
      },
    ],
  },

  // IDIOMAS DETALLADO
  languages: {
    keywords: ["idiomas", "ingles", "english", "languages", "hablas", "nivel ingles"],
    responses: [
      {
        answer:
          "Español nativo e inglés fluido (B2 – First Certificate). Leo documentación técnica en inglés diariamente (MDN, blogs, RFCs). He trabajado en proyectos internacionales con compañeros de Reino Unido, Suecia, Países Bajos, India, Italia o Alemania, comunicándome fluidamente en calls y por escrito. También consumo contenido técnico en inglés: podcasts, conferencias, cursos. Me siento cómodo en entornos multilingües y puedo mantener conversaciones técnicas complejas en inglés sin problema.",
        followUp: ["¿Has trabajado con equipos internacionales?", "¿Otros idiomas?"],
      },
    ],
  },

  // UBICACIÓN Y REMOTO
  location: {
    keywords: ["donde", "ubicacion", "vives", "location", "ciudad", "pais", "remoto", "santander"],
    responses: [
      {
        answer:
          "Vivo en Santander, Cantabria, España. Trabajo 100% remoto para AMS desde aquí, colaborando con equipos en Galicia y otras ubicaciones. Tengo 2+ años de experiencia en remoto y me adapto perfectamente: gestión autónoma del tiempo, comunicación asíncrona efectiva, uso de herramientas colaborativas (Slack, Meet, Jira, Confluence). Valoro el remoto por la flexibilidad, pero también disfruto encuentros presenciales ocasionales para fortalecer relaciones con el equipo.",
        followUp: [
          "¿Prefieres remoto o presencial?",
          "¿Te mudarías?",
          "¿Viajas mientras trabajas?",
        ],
      },
    ],
  },

  // MOTIVACIÓN AMPLIADA
  motivation: {
    keywords: ["motiva", "gusta", "pasion", "por que", "desarrollador", "interesa", "apasiona"],
    responses: [
      {
        answer:
          "Me motivan tres cosas: 1) Impacto real: ver miles de personas usando diariamente apps que desarrollé. 2) Desafíos técnicos: resolver problemas complejos de rendimiento, arquitectura o UX. 3) Crecimiento continuo: aprender tecnologías nuevas, mejorar código existente, mentorizar. Me apasiona el equilibrio entre calidad técnica y experiencia de usuario. Disfruto trabajar en equipos con mentalidad de producto donde cada decisión técnica considera el valor para el usuario final. No solo 'hacer features', sino hacerlas bien.",
        followUp: [
          "¿Qué tipo de proyectos prefieres?",
          "¿Qué buscas en un trabajo?",
          "¿Qué te frustra?",
        ],
      },
    ],
  },

  // RENDIMIENTO Y OPTIMIZACIÓN
  performance: {
    keywords: [
      "rendimiento",
      "performance",
      "optimizar",
      "velocidad",
      "rapido",
      "optimizacion",
      "mejorar performance",
    ],
    responses: [
      {
        answer:
          "La optimización es una de mis especialidades. Técnicas que aplico: 1) Code splitting y lazy loading para reducir bundle inicial. 2) Memoización (useMemo, useCallback) en componentes pesados. 3) Virtualización de listas largas (react-window). 4) Debouncing/throttling en eventos frecuentes. 5) Caché estratégico (BFF, service workers). 6) Optimización de imágenes (WebP, lazy load, responsive). 7) Web Vitals (LCP, INP, CLS). En AMS, mi BFF mejoró los tiempos de respuesta un 40%. Uso Lighthouse y profiler habitualmente.",
        followUp: ["¿Cómo mides el rendimiento?", "¿Qué fue tu mayor optimización?"],
      },
    ],
  },

  // BUENAS PRÁCTICAS AMPLIADAS
  bestPractices: {
    keywords: [
      "buenas practicas",
      "clean code",
      "codigo limpio",
      "calidad",
      "arquitectura",
      "patrones",
      "solid",
    ],
    responses: [
      {
        answer:
          "Principios que sigo: 1) SOLID (especialmente Single Responsibility y Dependency Inversion). 2) DRY sin llegar a sobre-abstracción. 3) Componentes pequeños y reutilizables. 4) PropTypes/TypeScript para type safety. 5) Nomenclatura descriptiva (evito abreviaciones crípticas). 6) Testing automatizado (unitario + E2E). 7) Code reviews bidireccionales. 8) Documentación (READMEs, JSDoc, comentarios para 'por qué', no 'qué'). 9) Git commits atómicos y descriptivos. 10) Refactoring continuo. El código se lee más veces de las que se escribe.",
        followUp: ["¿Qué patrones de diseño usas?", "¿Haces refactoring regularmente?"],
      },
    ],
  },

  // CONTACTO
  contact: {
    keywords: [
      "contacto",
      "email",
      "contactar",
      "linkedin",
      "hablar",
      "escribir",
      "como te contacto",
    ],
    responses: [
      {
        answer:
          "Puedes contactarme por varias vías: 1) Email: a través del formulario en este portfolio. 2) LinkedIn: linkedin.com/in/javimagaldi (respondo en 24-48h). 3) GitHub: github.com/maniacdi. Estoy abierto a conversar sobre oportunidades laborales, colaboraciones técnicas, mentoría o simplemente charlar sobre desarrollo. Si tienes un proyecto interesante o una propuesta, no dudes en escribirme. ¡Siempre es un placer conectar con otros devs!",
        followUp: ["¿Estás buscando trabajo?", "¿Respondes rápido?", "¿Haces freelance?"],
      },
    ],
  },

  // DISPONIBILIDAD Y BÚSQUEDA
  availability: {
    keywords: [
      "disponible",
      "buscando",
      "trabajo",
      "oportunidad",
      "contratar",
      "hire",
      "cambiar trabajo",
    ],
    responses: [
      {
        answer:
          "Actualmente estoy trabajando en AMS Solutions y disfruto mi rol, pero siempre estoy abierto a escuchar propuestas interesantes. Me interesan: 1) Proyectos con impacto real y desafíos técnicos complejos. 2) Equipos técnicos sólidos con cultura de calidad. 3) Oportunidades de crecimiento y aprendizaje. 4) Stack moderno (React, TS, Node) preferiblemente. 5) Remoto o híbrido (soy de Santander). Si tienes algo que encaje, ¡hablemos! Respondo rápido a propuestas concretas.",
        followUp: ["¿Qué buscas en un trabajo?", "¿Cómo puedo contactarte?", "¿Haces freelance?"],
      },
    ],
  },

  // FREELANCE Y SERVICIOS
  freelance: {
    keywords: [
      "freelance",
      "autonomo",
      "autónomo",
      "presupuesto",
      "negocio",
      "cliente",
      "encargo",
      "contratarte",
      "servicios",
      "web para mi negocio",
    ],
    responses: [
      {
        answer:
          "Sí, trabajo como freelance. Me centro en negocios que necesitan algo directo y bien hecho: webs para restaurantes, clínicas y comercios, tiendas o sistemas de reservas online, apps móviles (iOS y Android) y software a medida para automatizar tareas. Nada de paquetes raros ni letra pequeña: me cuentas qué necesitas y te lo monto, y respondo en menos de 48h por el formulario de contacto. Y si eres una empresa que busca un desarrollador en plantilla, también estoy abierto a incorporarme a un equipo.",
        followUp: ["¿Qué servicios ofreces?", "¿Cómo te contacto?", "¿Trabajas en plantilla?"],
      },
    ],
  },

  // HOBBIES Y PERSONAL
  hobbies: {
    keywords: [
      "hobbies",
      "tiempo libre",
      "aficiones",
      "gustos",
      "intereses",
      "personal",
      "fuera del trabajo",
    ],
    responses: [
      {
        answer:
          "Fuera del código: 1) Viajar: he visitado 15+ países. Puedes ver mi mapa interactivo de viajes en el portfolio. Me gusta conocer culturas y probar comidas locales. 2) Anime: fan desde hace años (Naruto, por eso el easter egg kunai 😄). 3) Videojuegos: desde clásicos arcade hasta RPGs modernos. 4) Tecnología: me gusta estar al día con gadgets, IA y tendencias tech. 5) Aprender: actualmente explorando Rust y Web3. Creo que tener intereses variados me hace mejor desarrollador al aportar perspectivas diferentes.",
        followUp: ["¿Qué animes te gustan?", "¿A dónde has viajado?", "¿Qué videojuegos?"],
      },
    ],
  },

  // NEXT.JS Y FRAMEWORKS
  nextjs: {
    keywords: ["nextjs", "next.js", "next", "framework react"],
    responses: [
      {
        answer:
          "Uso Next.js 16 con App Router en mi portfolio y me encanta. Ventajas clave: SSR/SSG out-of-the-box, optimización de imágenes automática, routing basado en archivos, API routes integradas, excelente DX. He trabajado con Pages Router y migrado a App Router (Server Components, layouts anidados). También valoro su optimización para SEO y el ecosistema Vercel. Es mi elección para proyectos React que necesitan SSR, SEO o mejor performance inicial.",
        followUp: ["¿Qué frameworks conoces?", "¿Prefieres Next.js o CRA?"],
      },
    ],
  },

  // ARQUITECTURA
  architecture: {
    keywords: ["arquitectura", "escalable", "diseño sistema", "microservicios", "monolito"],
    responses: [
      {
        answer:
          "He trabajado en arquitecturas monolíticas y microservicios. En AMS: aplicaciones frontend conectadas a múltiples microservicios mediante mi BFF (patrón agregador). Principios que sigo: separación de concerns (UI, lógica, datos), componentización modular, feature folders, capas bien definidas (presentation, domain, infrastructure). Para apps pequeñas prefiero monolitos bien estructurados; para empresariales grandes, microservicios con BFF. Siempre considero trade-offs: complejidad vs beneficios.",
        followUp: ["¿Qué es un BFF?", "¿Qué patrones arquitectónicos conoces?"],
      },
    ],
  },
};

// RESPUESTAS POR DEFECTO
export const defaultResponsesES = [
  "Interesante pregunta. Aunque no tengo info específica sobre eso en mi base de conocimiento, puedes contactar a Javi directamente para hablar de ello. ¿Hay algo más en lo que pueda ayudarte?",
  "Hmm, no tengo datos específicos sobre eso. ¿Te gustaría saber sobre su experiencia en AMS, proyectos con React o su stack tecnológico?",
  "Esa pregunta está fuera de mi alcance actual. Puedo hablarte sobre experiencia profesional, tecnologías, proyectos o motivaciones. ¿Qué te interesa?",
];

// SALUDOS
export const greetingsES = {
  keywords: ["hola", "hi", "hello", "hey", "buenas", "saludos", "que tal", "que hay"],
  responses: [
    "¡Hola! 👋 Soy el Lacayo de Javi. Puedo responder preguntas sobre su experiencia, proyectos, stack tecnológico y mucho más. ¿Qué te gustaría saber?",
  ],
};

// DESPEDIDAS
export const farewellsES = {
  keywords: ["adios", "chao", "bye", "hasta luego", "nos vemos", "gracias", "ok gracias"],
  responses: [
    "¡Hasta pronto! Si necesitas más información sobre Javi, aquí estaré. 👋",
    "¡Fue un placer ayudarte! Si quieres contactar directamente con Javi, usa el formulario del portfolio. ¡Hasta luego! 😊",
  ],
};
