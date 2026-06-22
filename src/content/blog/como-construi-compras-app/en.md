---
title: "How I built Compras App: real-time end to end"
date: "2026-06-15"
excerpt: "A shared shopping-list app I use at home every day: React Native, WebSockets and a backend deployed on my own NAS. Here's what I learned building the whole thing."
tags: ["React Native", "Node.js", "WebSockets", "Self-hosting"]
cover: "/images/projects/compras-app/cover.webp"
relatedProject: "compras-app"
---

At home we always ended up buying the same thing twice or getting to the shop without half the list. Paper notes and WhatsApp groups don't sync. So I built an app.

## The idea

A **shared, real-time** shopping list: if my partner ticks off the milk from her phone, it disappears from mine instantly. Sounds simple, but "real time" is exactly where the technical meat is.

## The stack

- **Front:** React Native + Expo — a single codebase for Android, shipped as an APK.
- **Real time:** WebSockets with Socket.io. Every change is broadcast to all devices connected to the same list.
- **Backend:** Node.js + Express, with MongoDB Atlas for persistence, auth and shared lists.
- **Infra:** deployed on **my own NAS** with Docker, Nginx as a reverse proxy, automatic SSL via Let's Encrypt and CI/CD with GitHub Actions + EAS Update.

## What I learned

- **Real-time state is easy to break.** I had to think hard about reconciliation when two people edit at once and one drops connection.
- **Self-hosting teaches more than any tutorial.** Setting up Nginx, certificates and CI/CD for something you actually use forces you to understand the whole piece, not just the code.
- **An app you use daily maintains itself** — bugs show up in real use, not in demos.

For the technical breakdown (problem, architecture, results), see the [project page](/en/projects/compras-app).
