---
title: "Fast website, better SEO: why speed ranks you on Google"
date: "2026-06-23"
excerpt: "A slow website loses visitors and Google rankings. Here's what Core Web Vitals are, why they matter for SEO, and how I make a website actually load fast."
tags: ["SEO", "Web performance", "Core Web Vitals", "Speed", "Next.js"]
---

Your website's speed isn't a technical detail: it's **money and Google rankings**. A page that's slow to load loses visitors before it even shows up, and Google knows it. Here's what really matters about **web speed and SEO**.

## What Core Web Vitals are

Google measures your users' real experience with three main metrics:

- **LCP (Largest Contentful Paint):** how long the main content takes to appear. Ideally, **under 2.5s**.
- **INP (Interaction to Next Paint):** how fast the site responds when someone clicks or types.
- **CLS (Cumulative Layout Shift):** how much the content "jumps" while loading. The more stable, the better.

These metrics are part of how Google decides who to rank higher. Slow site, worse position.

## Why speed affects sales, not just SEO

Every second of waiting spikes the share of people who leave. It doesn't matter how pretty the site is: if it's slow on a phone with mobile data, that visitor isn't coming back. A fast website converts better because people stay.

## How I make a website load fast

There's no magic, just technical decisions:

- Ship only the code that's needed. No generic themes or plugins loading libraries you don't use.
- Render on the server or statically: the HTML arrives ready, instead of being built entirely in the user's browser.
- Optimize images: modern formats, correct sizes, and lazy-loading whatever isn't visible yet.
- Mind the fonts and critical CSS, so text shows up immediately, with no jumps or flicker.

This very site is built with Next.js precisely for this: static pages, optimized images and only the essential JavaScript.

## The classic mistake

Many people add speed at the end, once the site is already slow, by bolting on cache plugins that hide the problem. Speed is designed from the start: the right architecture beats any optimization plugin glued on afterward.

## If your site already exists and it's slow

You can measure it for free with PageSpeed Insights and know exactly where the time goes. Sometimes optimizing what's there is enough; sometimes rebuilding it properly pays off more — I've written about [when a custom website beats WordPress](/en/blog/web-a-medida-vs-wordpress). Every case is different, and the final call is always yours.

Want to know how much headroom yours has? [Write to me](/en/#contacto) and I'll take a look, or check out [my projects](/en/projects) to see how I work.
