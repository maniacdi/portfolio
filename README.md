<p align="center">
  <img src="public/images/LOGO.png" alt="Magaldidev" width="120" />
</p>

<h1 align="center">Javi García Magaldi — Portfolio</h1>

<p align="center">
  <strong>Full-Stack Web Developer from Santander, Spain</strong><br/>
  <a href="https://javimagaldi.com">javimagaldi.com</a>
</p>

<p align="center">
  <a href="https://github.com/maniacdi/portfolio/actions/workflows/tests.yml">
    <img src="https://github.com/maniacdi/portfolio/actions/workflows/tests.yml/badge.svg" alt="Tests status" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Cypress-E2E-17202C?logo=cypress" alt="Cypress" />
  <img src="https://img.shields.io/badge/Vitest-Unit-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel" alt="Vercel" />
</p>

---

## Overview

A modern, performance-first portfolio built with **Next.js 16 (App Router)**, featuring a terminal-inspired UI with neon aesthetics, full internationalization (EN/ES), and an AI-powered chatbot.

This isn't a template — every component, animation, and interaction was built from scratch to showcase real-world frontend engineering decisions: SSR vs. client rendering trade-offs, Zustand state management patterns, accessible dark/light theming, and CI/CD automation with GitHub Actions.

<p align="center">
  <a href="https://javimagaldi.com">
    <img src="https://img.shields.io/badge/🔗_Live_Demo-javimagaldi.com-6f00ff?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | SCSS Modules + CSS Custom Properties |
| **State** | Zustand (with persist middleware) |
| **Animations** | Framer Motion |
| **i18n** | next-intl (EN / ES) |
| **AI Chatbot** | Groq API (Llama 3.3-70B) with local fallback engine |
| **Maps** | Leaflet (dynamic import, SSR-safe) |
| **Forms** | Web3Forms API |
| **Monitoring** | Sentry + Vercel Speed Insights + Vercel Analytics |
| **Testing** | Cypress (E2E) + Vitest (Unit) |
| **CI/CD** | GitHub Actions (parallel unit + E2E jobs) |
| **Deployment** | Vercel |

---

## Features

**UI & Design** — Terminal-inspired landing with typing animation, custom dark/light theme system using CSS variables, responsive design tested across breakpoints, 404 page with glitch effect.

**Internationalization** — Full EN/ES support via next-intl. Language switcher preserves current route. All UI strings, metadata, and SEO tags are localized.

**AI Chatbot** — Ask the bot about Javi's experience, tech stack, or projects. Powered by Groq (Llama 3.3-70B) with rate limiting and a keyword-based local fallback when the API is unavailable.

**Interactive Sections** — Travel map with Leaflet markers, project cards linked to GitHub repos, tech stack carousel with proficiency levels, easter eggs hidden across the site.

**Performance** — Optimized bundle (Three.js removed, tree-shaken imports), standalone output, Vercel Speed Insights tracking Core Web Vitals.

**Testing & CI** — Cypress E2E covering navigation, theme toggle, contact modal, language switching. Vitest unit tests for chat engine, stores, profile data, easter eggs. GitHub Actions runs both in parallel on every push.

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n routes (/, /about, /code, /travels, /hobbies)
│   ├── api/chat/          # Groq AI chatbot endpoint
│   ├── components/        # All React components
│   │   ├── home/          # PowerHero, FeaturedProjects
│   │   ├── about/         # AboutMeSection
│   │   ├── header/        # Header, LanguageSwitcher
│   │   ├── contact/       # ContactModal, ContactForm
│   │   ├── chatBot/       # ChatBot with AI + fallback
│   │   └── common/        # ThemeToggle, TerminalLoader
│   └── store/             # Zustand stores
├── i18n/                  # en.json, es.json, request.ts
├── styles/                # Global SCSS + variables
└── utils/                 # Profile data, chat engine, types
cypress/
├── e2e/                   # E2E test specs
└── support/               # Custom commands (skipTerminalLoader)
__tests__/                 # Vitest unit tests
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/maniacdi/portfolio.git
cd portfolio

# Install
npm install

# Set up environment
cp .env.example .env.local
# Add your GROQ_API_KEY and NEXT_PUBLIC_WEB3FORMS_KEY

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Testing

```bash
# Unit tests
npm run test:run

# E2E tests (starts dev server automatically)
npm run test:e2e

# Unit tests in watch mode
npm run test
```

---

## Deployment

The site is deployed on **Vercel** with automatic deployments on push to `main`. Environment variables needed:

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Groq API key for AI chatbot (server-side) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for contact form |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking |

---

## Author

**Javi García Magaldi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/javier-garcia-magaldi/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/maniacdi)
[![Portfolio](https://img.shields.io/badge/Portfolio-6f00ff?logo=googlechrome&logoColor=white)](https://javimagaldi.com)

---

<p align="center">
  <sub>Built with Next.js, TypeScript, and way too much coffee ☕</sub>
</p>
