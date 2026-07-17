---
title: "Showcase: a template for selling websites to local businesses without starting from scratch"
date: "2026-06-30"
excerpt: "Every local business asks for almost the same thing: a fast site, a shop, appointment booking and a panel to manage it. Instead of rebuilding it per client, I built a reusable base. This is Showcase."
tags: ["Next.js", "TypeScript", "SEO", "Template", "Side project"]
cover: "/images/projects/showcase/cover.webp"
relatedProject: "showcase"
---

When you pitch options to a local business —a clinic, a restaurant, a neighborhood shop— they almost always need the same things: a site that loads fast, looks good on mobile, shows up on Google and, depending on the business, an online shop or a way to book an appointment. Rebuilding that from scratch for every client is a waste of time. So I built **Showcase**: a clean, reusable base I adapt to each one.

## The idea

A single template with the four pieces local businesses ask for most, each a working demo:

- **Services landing** — local business with services, pricing and contact.
- **Online shop** — catalog, product page and cart.
- **Appointment booking** — calendar and booking flow.
- **Admin panel** — manage appointments and products behind a login.

The [demo is here](https://magaldi-showcase.vercel.app/). These are functional schemes, not the final design: each project is adapted to the client's identity, content and needs.

![Showcase demo hub: landing, shop, booking and admin panel](/images/projects/showcase/1.webp)

![Online shop with catalog, product page and cart](/images/projects/showcase/2.webp)

![Admin panel: managing appointments and products](/images/projects/showcase/3.webp)

![Admin panel login screen](/images/projects/showcase/4.webp)

## The stack

- **Next.js + TypeScript** — App Router, server rendering and static routes where it makes sense.
- **Modular SCSS** with a Container/Layout pattern to separate logic from presentation.
- **next-intl** — bilingual (ES/EN) from day one.
- **Auth with login** for the admin panel.
- **SEO** done right: metadata, Open Graph and structured data.

## Why a template and not WordPress

A local business doesn't need the weight or plugins of a generic CMS. It needs a site that is fast, accessible and ranks well — I've written about [why a custom website beats WordPress](/en/blog/web-a-medida-vs-wordpress). Starting from my own base gives me full control over performance (high Lighthouse, sub-second loads) and lets me ship faster: I swap brand, colors, fonts, content and verticals from centralized points, without rewriting the architecture.

And to be clear: the template is the starting point, not the product. The final design, sections and features are decided by each client; the base just saves me the part nobody sees.

## What I take away

- Building for reuse changes the design: centralizing brand, copy, data and themes forces a clean split between what changes and what doesn't.
- Fewer pieces, more speed. With no heavy CMS, the site flies and maintenance is trivial.
- A solid base sells better: showing a real, working demo convinces more than a proposal on paper.

The technical detail and screenshots are on the [project page](/en/projects/showcase). Have a business and want something like this? [Write to me](/en/#contacto).
