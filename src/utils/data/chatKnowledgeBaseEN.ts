import { KnowledgeCategory } from "./chatKnowledgeBase";

export const knowledgeBaseEN: Record<string, KnowledgeCategory> = {
  // PERSONAL INFORMATION
  personal: {
    keywords: ["who", "are you", "your name", "introduce", "about", "yourself"],
    responses: [
      {
        answer:
          "Hi! I'm Javi, a Front-End Engineer with almost 5 years of experience in production web products and large-scale corporate environments. I mainly work with React and Vue, participating in the development of applications used by thousands of users at Inditex. I'm passionate about creating quality user experiences, optimizing performance, and writing code that scales over time.",
        followUp: [
          "What technologies do you master?",
          "Where do you work currently?",
          "What projects have you done?",
        ],
      },
    ],
  },

  // WORK EXPERIENCE
  experience: {
    keywords: [
      "experience",
      "work",
      "worked",
      "company",
      "employment",
      "career",
      "professional",
      "years",
      "trajectory",
    ],
    responses: [
      {
        answer:
          "I have almost 5 years of experience as a frontend developer. I started with an internship at Incentro (2020), where I then worked for 2 years redesigning corporate websites and managing e-commerce. After that, I spent 10 months at Innova-tsn as a frontend consultant. Currently (since May 2023) I work at AMS Solutions developing critical applications for Inditex, where I lead optimization projects and mentor junior developers.",
        followUp: [
          "What do you do at AMS?",
          "What did you achieve in each company?",
          "Do you work remotely?",
        ],
      },
    ],
  },

  // AMS SOLUTIONS - DETAILED
  ams: {
    keywords: ["ams", "current", "now", "inditex", "current job", "where work", "ams solutions"],
    responses: [
      {
        answer:
          "At AMS Solutions I'm a Front-End Engineer for Inditex, working on corporate applications used by thousands of employees. My achievements include: 1) Led the creation of a unified component platform that improved team technical convergence. 2) Developed a news center and unified access for the entire ecosystem. 3) Designed and implemented a Backend For Frontend (BFF) that significantly reduced response times. 4) Promoted testing (Jest, Cypress) ensuring robustness. 5) Mentor juniors through code reviews and best practices.",
        followUp: ["What is a BFF?", "How do you mentor?", "What impact did you have?"],
      },
    ],
  },

  // INNOVA-TSN
  innova: {
    keywords: ["innova", "innova-tsn", "consultant", "consulting"],
    responses: [
      {
        answer:
          "At Innova-tsn I worked for 10 months as a Front-End Developer/Consultant. I developed components for corporate web applications, analyzed functional and technical requirements in collaboration with clients, and managed data through SQL for reporting. It was my first consulting experience, which taught me to quickly adapt to different contexts and communicate technical solutions clearly.",
        followUp: ["What did you learn in consulting?", "Where else have you worked?"],
      },
    ],
  },

  // INCENTRO
  incentro: {
    keywords: ["incentro", "first job", "internship", "started", "beginning"],
    responses: [
      {
        answer:
          "Incentro was my first professional experience. I started with an internship (Jun-Sept 2020) and stayed 2 years as a Frontend Developer. I redesigned and developed the corporate website from scratch, managed CMS and high-volume e-commerce, automated content management processes, and maintained multiple frontend applications connected to the same backend. Here I consolidated my React fundamentals and learned about scalable architectures.",
        followUp: ["What projects did you do there?", "How was your evolution?"],
      },
    ],
  },

  // TECH STACK DETAILED
  stack: {
    keywords: [
      "technologies",
      "stack",
      "tools",
      "languages",
      "frameworks",
      "programs",
      "use",
      "master",
    ],
    responses: [
      {
        answer:
          "My main stack: Frontend → React, Vue, TypeScript, JavaScript, HTML5, CSS3/SASS, Tailwind, Framer Motion. Backend → Node.js, Express, BFF, Java. Databases → MongoDB, MySQL, SQL Server. Testing → Jest, Cypress. DevOps/Tools → Git/GitHub, Docker, AWS, Vercel, Agile/Scrum. I've also worked with Redux, GraphQL, and CMS/e-commerce. I stay updated with the latest trends and best practices in the JavaScript ecosystem.",
        followUp: [
          "Do you prefer React or Vue?",
          "Do you have backend experience?",
          "Do you use TypeScript?",
        ],
      },
    ],
  },

  // REACT VS VUE - EXPANDED
  reactVue: {
    keywords: ["react or vue", "prefer react", "better react", "difference react vue", "compare"],
    responses: [
      {
        answer:
          "I have solid experience with both. React is my main tool: I like its mature ecosystem, JSX flexibility, powerful hooks, and large community. I use it in complex projects where I need full control. I appreciate Vue for its smooth learning curve, elegant reactivity system, and developer experience. I've used it at AMS for internal projects. Both are excellent; I choose based on project context, team, and technical requirements. For new projects I tend toward React due to familiarity.",
        followUp: ["What projects did you do with React?", "Do you know Next.js?"],
      },
    ],
  },

  // TYPESCRIPT
  typescript: {
    keywords: ["typescript", "types", "typing", "type safety"],
    responses: [
      {
        answer:
          "TypeScript is essential in my daily work. I use it in all my modern projects because it reduces bugs, improves IntelliSense, facilitates refactoring, and serves as living documentation. At AMS we work with TS in critical applications where type safety is fundamental. I also use it in my personal portfolio (frontend and backend). I consider TS practically standard in modern professional JavaScript projects.",
        followUp: ["What other technologies do you master?", "Do you do backend with TS?"],
      },
    ],
  },

  // BACKEND DETAILED
  backend: {
    keywords: ["backend", "server", "api", "bff", "node", "database", "fullstack"],
    responses: [
      {
        answer:
          "Although my specialty is frontend, I have solid backend experience. I've designed and implemented a BFF (Backend For Frontend) with Node.js/Express that optimized response times and reduced backend calls. I work with databases (MongoDB, MySQL, SQL Server) for reporting and data management. I've developed REST APIs, handled authentication, and understand microservices architectures. I feel comfortable across the full stack when the project requires it.",
        followUp: [
          "What exactly is a BFF?",
          "Which databases do you prefer?",
          "Are you full-stack?",
        ],
      },
    ],
  },

  // BFF EXPLANATION - MORE DETAILED
  bff: {
    keywords: ["what is bff", "backend for frontend", "explain bff", "bff pattern"],
    responses: [
      {
        answer:
          "A BFF (Backend For Frontend) is an architectural pattern where you create an intermediate layer specific to your frontend. In my implementation: 1) It aggregated data from multiple microservices in a single call. 2) Transformed responses to the exact format the frontend needs. 3) Handled caching to reduce latency. 4) Optimized payload by eliminating unnecessary data. Result: we went from 5-6 individual calls to just 1, reducing load time by ~60%. I implemented it with Node.js/Express and it was critical for improving performance in AMS applications.",
        followUp: [
          "What technologies did you use?",
          "How did you measure the improvement?",
          "What other patterns do you know?",
        ],
      },
    ],
  },

  // TESTING EXPANDED
  testing: {
    keywords: ["test", "testing", "tests", "jest", "cypress", "quality", "qa", "e2e", "unit"],
    responses: [
      {
        answer:
          "Testing is fundamental in my workflow. I use Jest for unit tests of components, functions, and business logic, with minimum 80% coverage. Cypress for E2E, simulating complete user flows. At AMS I promoted testing adoption from the start: wrote documentation, conducted internal workshops, and established standards. I also practice TDD when the project allows. I believe testing isn't just for bugs, but for refactoring confidence and executable code documentation.",
        followUp: [
          "What test coverage do you have?",
          "Do you do TDD?",
          "What other best practices do you follow?",
        ],
      },
    ],
  },

  // EDUCATION EXPANDED
  education: {
    keywords: ["studies", "university", "degree", "education", "title", "cantabria"],
    responses: [
      {
        answer:
          "I studied Computer Science at the University of Cantabria (2015-2019). During my degree I learned solid fundamentals: algorithms, data structures, databases, object-oriented programming (Java was my first serious language), networks, operating systems, and software development. I also did my final thesis on game development (Pang project in C#). University gave me the theoretical foundation; professional experience, the practice and web specialization.",
        followUp: [
          "What was your thesis about?",
          "Do you have certifications?",
          "Are you still studying?",
        ],
      },
    ],
  },

  // THESIS
  tfg: {
    keywords: ["thesis", "final project", "graduation project", "tfg"],
    responses: [
      {
        answer:
          "My final thesis was developing a video game based on Pang (the classic arcade) using C# and Unity. I implemented movement physics, collision system, power-ups, progressive levels, and a scoring system. It was my first experience creating something complete from scratch and taught me about software architecture, state management, and game loops. Although I later specialized in web, that experience with C# and design patterns has been very useful.",
        followUp: ["Do you develop video games?", "What did you learn?"],
      },
    ],
  },

  // DETAILED PROJECTS
  projects: {
    keywords: ["projects", "portfolio", "made", "created", "developed", "github", "side projects"],
    responses: [
      {
        answer:
          "My main projects: 1) Full-Stack Portfolio: Frontend with Next.js, React, TypeScript, Framer Motion; Backend with Node.js, Express, MongoDB. Includes travel system with interactive map, easter eggs, chat assistant, and more. 2) Marvel Explorer: Integration with official Marvel API, character and comic search with MD5 authentication. 3) Pokemon App: Node.js backend consuming PokéAPI with cache and custom endpoints. 4) AMS Technical Test: Complete e-commerce SPA with React, cache system, and cart management. All with detailed READMEs at github.com/maniacdi",
        followUp: [
          "Which is your favorite?",
          "What technologies did you use?",
          "Can I see the code?",
        ],
      },
    ],
  },

  // SPECIFIC PORTFOLIO
  portfolioProject: {
    keywords: [
      "this portfolio",
      "this website",
      "this project",
      "how did you make this",
      "how did you create this page",
    ],
    responses: [
      {
        answer:
          "This portfolio is my most complete personal project. Stack: Next.js 14 (App Router), React, TypeScript, Framer Motion, SASS. Own backend in Node.js/Express/MongoDB deployed on Vercel. Unique features: interactive travel map with Leaflet, easter egg system (try typing 'kunai'!), chat assistant with pattern matching without API costs, featured repos from GitHub API, and cyberpunk design with animations. All responsive, with i18n (ES/EN), designed to demonstrate not just clean code but creativity and attention to detail.",
        followUp: [
          "How long did it take?",
          "What was the most difficult?",
          "What technologies did you use?",
        ],
      },
    ],
  },

  // DETAILED GITHUB
  github: {
    keywords: ["github", "code", "repositories", "open source", "git", "contributions"],
    responses: [
      {
        answer:
          "My GitHub (github.com/maniacdi) has 11+ public repositories showing my evolution: TypeScript, JavaScript, React, Vue, Node.js, Java, C#. Highlights include: complete portfolio (full-stack), external API integrations (Marvel, PokéAPI), documented technical tests, and learning projects. All with professional READMEs explaining architecture, setup, and technical decisions. I use Git daily: branches, pull requests, code reviews, conventional commits. I also contribute to repos when I find bugs or improvements.",
        followUp: [
          "Which projects do you recommend seeing?",
          "Do you contribute to open source?",
          "Do you use GitHub Actions?",
        ],
      },
    ],
  },

  // DETAILED SOFT SKILLS
  softSkills: {
    keywords: [
      "team",
      "communication",
      "leadership",
      "mentor",
      "agile",
      "collaboration",
      "scrum",
      "soft skills",
    ],
    responses: [
      {
        answer:
          "I work comfortably in multidisciplinary teams: backend, UX/UI, product, QA. At AMS I collaborate daily with ~15 people in Agile/Scrum (2-week sprints, dailies, retros). Key skills: 1) Clear technical communication (I explain complex concepts to non-technical people). 2) Active junior mentoring. 3) Constructive code reviews. 4) Proactivity in proposing improvements. 5) Adaptability to priority changes. 6) Empathy with the end user. I like the balance between autonomy and collaborative work.",
        followUp: [
          "Have you led projects?",
          "How do you resolve conflicts?",
          "Do you prefer working alone or in a team?",
        ],
      },
    ],
  },

  // EXPANDED MENTORING
  mentoring: {
    keywords: ["mentor", "junior", "teach", "code review", "guide", "mentoring", "teaching"],
    responses: [
      {
        answer:
          "At AMS I regularly mentor 2-3 junior developers. My approach: 1) Detailed code reviews explaining the 'why', not just the 'what'. 2) Pair programming on complex features. 3) Sharing resources (articles, documentation, courses). 4) Creating internal documentation of patterns and conventions. 5) Encouraging questions without judgment. I believe a good mentor doesn't just teach code, but critical thinking, debugging, and autonomy. It's rewarding to see their evolution and know I contributed to their growth.",
        followUp: ["What do you advise juniors?", "What's the hardest thing to teach?"],
      },
    ],
  },

  // DETAILED LANGUAGES
  languages: {
    keywords: ["languages", "english", "speak", "level english", "bilingual"],
    responses: [
      {
        answer:
          "Native Spanish and professional English (B2-C1). I read technical documentation in English daily (MDN, blogs, RFCs). I've worked on international projects with colleagues from UK, India, and LATAM, communicating fluently in calls and writing. I also consume technical content in English: podcasts, conferences, courses. I feel comfortable in multilingual environments and can maintain complex technical conversations in English without problem.",
        followUp: ["Have you worked with international teams?", "Other languages?"],
      },
    ],
  },

  // LOCATION AND REMOTE
  location: {
    keywords: ["where", "location", "live", "city", "country", "remote", "santander"],
    responses: [
      {
        answer:
          "I live in Santander, Cantabria, Spain. I work 100% remotely for AMS from here, collaborating with teams in Galicia and other locations. I have 2+ years of remote experience and adapt perfectly: autonomous time management, effective asynchronous communication, use of collaborative tools (Slack, Meet, Jira, Confluence). I value remote for flexibility, but also enjoy occasional in-person meetings to strengthen team relationships.",
        followUp: [
          "Do you prefer remote or in-person?",
          "Would you relocate?",
          "Do you travel while working?",
        ],
      },
    ],
  },

  // EXPANDED MOTIVATION
  motivation: {
    keywords: ["motivate", "like", "passion", "why", "developer", "interests", "passionate"],
    responses: [
      {
        answer:
          "Three things motivate me: 1) Real impact: seeing thousands of people daily using apps I developed. 2) Technical challenges: solving complex problems of performance, architecture, or UX. 3) Continuous growth: learning new technologies, improving existing code, mentoring. I'm passionate about the balance between technical quality and user experience. I enjoy working in teams with a product mindset where every technical decision considers value for the end user. Not just 'making features', but making them well.",
        followUp: [
          "What type of projects do you prefer?",
          "What do you look for in a job?",
          "What frustrates you?",
        ],
      },
    ],
  },

  // PERFORMANCE AND OPTIMIZATION
  performance: {
    keywords: ["performance", "optimize", "speed", "fast", "optimization", "improve performance"],
    responses: [
      {
        answer:
          "Optimization is one of my specialties. Techniques I apply: 1) Code splitting and lazy loading to reduce initial bundle. 2) Memoization (useMemo, useCallback) in heavy components. 3) Long list virtualization (react-window). 4) Debouncing/throttling on frequent events. 5) Strategic caching (BFF, service workers). 6) Image optimization (WebP, lazy load, responsive). 7) Web Vitals (LCP, FID, CLS). At AMS, my BFF reduced response times by ~60%. I regularly use Lighthouse and profiler.",
        followUp: ["How do you measure performance?", "What was your biggest optimization?"],
      },
    ],
  },

  // EXPANDED BEST PRACTICES
  bestPractices: {
    keywords: ["best practices", "clean code", "quality", "architecture", "patterns", "solid"],
    responses: [
      {
        answer:
          "Principles I follow: 1) SOLID (especially Single Responsibility and Dependency Inversion). 2) DRY without over-abstraction. 3) Small and reusable components. 4) PropTypes/TypeScript for type safety. 5) Descriptive naming (I avoid cryptic abbreviations). 6) Automated testing (unit + E2E). 7) Bidirectional code reviews. 8) Documentation (READMEs, JSDoc, comments for 'why', not 'what'). 9) Atomic and descriptive Git commits. 10) Continuous refactoring. Code is read more times than it's written.",
        followUp: ["What design patterns do you use?", "Do you refactor regularly?"],
      },
    ],
  },

  // CONTACT
  contact: {
    keywords: ["contact", "email", "reach", "linkedin", "talk", "write", "how to contact"],
    responses: [
      {
        answer:
          "You can contact me through several channels: 1) Email: through the form on this portfolio. 2) LinkedIn: linkedin.com/in/javimagaldi (I respond within 24-48h). 3) GitHub: github.com/maniacdi. I'm open to conversations about job opportunities, technical collaborations, mentoring, or simply chatting about development. If you have an interesting project or proposal, don't hesitate to write. It's always a pleasure to connect with other devs!",
        followUp: ["Are you looking for work?", "Do you respond quickly?", "Do you do freelance?"],
      },
    ],
  },

  // AVAILABILITY AND JOB SEARCH
  availability: {
    keywords: ["available", "looking", "job", "opportunity", "hire", "change job"],
    responses: [
      {
        answer:
          "I'm currently working at AMS Solutions and enjoying my role, but I'm always open to hearing interesting proposals. I'm interested in: 1) Projects with real impact and complex technical challenges. 2) Solid technical teams with quality culture. 3) Growth and learning opportunities. 4) Modern stack (React, TS, Node) preferably. 5) Remote or hybrid (I'm from Santander). If you have something that fits, let's talk! I respond quickly to concrete proposals.",
        followUp: [
          "What do you look for in a job?",
          "How can I contact you?",
          "Do you do freelance?",
        ],
      },
    ],
  },

  // HOBBIES AND PERSONAL
  hobbies: {
    keywords: ["hobbies", "free time", "interests", "personal", "outside work"],
    responses: [
      {
        answer:
          "Outside of code: 1) Travel: I've visited 15+ countries. You can see my interactive travel map in the portfolio. I like learning about cultures and trying local foods. 2) Anime: fan for years (Naruto, hence the kunai easter egg 😄). 3) Video games: from classic arcade to modern RPGs. 4) Technology: I like staying current with gadgets, AI, and tech trends. 5) Learning: currently exploring Rust and Web3. I believe having varied interests makes me a better developer by bringing different perspectives.",
        followUp: ["What anime do you like?", "Where have you traveled?", "What video games?"],
      },
    ],
  },

  // NEXT.JS AND FRAMEWORKS
  nextjs: {
    keywords: ["nextjs", "next.js", "next", "react framework"],
    responses: [
      {
        answer:
          "I use Next.js 14 with App Router in my portfolio and love it. Key advantages: SSR/SSG out-of-the-box, automatic image optimization, file-based routing, integrated API routes, excellent DX. I've worked with Pages Router and migrated to App Router (Server Components, nested layouts). I also value its SEO optimization and Vercel ecosystem. It's my choice for React projects that need SSR, SEO, or better initial performance.",
        followUp: ["What frameworks do you know?", "Do you prefer Next.js or CRA?"],
      },
    ],
  },

  // ARCHITECTURE
  architecture: {
    keywords: ["architecture", "scalable", "system design", "microservices", "monolith"],
    responses: [
      {
        answer:
          "I've worked on monolithic and microservices architectures. At AMS: frontend applications connected to multiple microservices through my BFF (aggregator pattern). Principles I follow: separation of concerns (UI, logic, data), modular componentization, feature folders, well-defined layers (presentation, domain, infrastructure). For small apps I prefer well-structured monoliths; for large enterprise apps, microservices with BFF. I always consider trade-offs: complexity vs benefits.",
        followUp: ["What is a BFF?", "What architectural patterns do you know?"],
      },
    ],
  },
};

// DEFAULT RESPONSES
export const defaultResponsesEN = [
  "Interesting question. Although I don't have specific info about that in my knowledge base, you can contact Javi directly to talk about it. Is there anything else I can help you with?",
  "Hmm, I don't have specific data about that. Would you like to know about his experience at AMS, React projects, or his tech stack?",
  "That question is outside my current scope. I can tell you about professional experience, technologies, projects, or motivations. What interests you?",
];

// GREETINGS
export const greetingsEN = {
  keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "greetings", "what's up"],
  responses: [
    "Hello! 👋 I'm Javi's Minion. I can answer questions about his experience, projects, tech stack, and much more. What would you like to know?",
  ],
};

// FAREWELLS
export const farewellsEN = {
  keywords: ["bye", "goodbye", "see you", "thanks", "thank you", "ok thanks"],
  responses: [
    "See you soon! If you need more information about Javi, I'll be here. 👋",
    "It was a pleasure helping you! If you want to contact Javi directly, use the portfolio form. See you later! 😊",
  ],
};
