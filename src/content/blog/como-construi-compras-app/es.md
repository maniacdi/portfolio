---
title: "Cómo construí Compras App: tiempo real de punta a punta"
date: "2026-06-15"
excerpt: "Una app de lista de la compra compartida que uso a diario en casa: React Native, WebSockets y un backend desplegado en mi propio NAS. Esto es lo que aprendí montándola entera."
tags: ["React Native", "Node.js", "WebSockets", "Self-hosting"]
cover: "/images/projects/compras-app/cover.webp"
relatedProject: "compras-app"
---

En casa siempre acabábamos comprando lo mismo dos veces o llegando al súper sin la mitad de la lista. Las notas en papel y los grupos de WhatsApp no se sincronizan. Así que me monté una app.

## La idea

Una lista de la compra **compartida y en tiempo real**: si mi pareja tacha la leche desde su móvil, desaparece del mío al instante. Suena simple, pero "tiempo real" es justo donde está la chicha técnica.

## El stack

- **Front:** React Native + Expo — una sola base de código para Android, distribuida como APK.
- **Tiempo real:** WebSockets con Socket.io. Cada cambio se emite a todos los dispositivos conectados a la misma lista.
- **Backend:** Node.js + Express, con MongoDB Atlas para persistencia, autenticación y listas compartidas.
- **Infra:** lo desplegué en **mi propio NAS** con Docker, Nginx como reverse proxy, SSL automático con Let's Encrypt y CI/CD con GitHub Actions + EAS Update.

## Lo que aprendí

- **El estado en tiempo real es fácil de romper.** Tuve que pensar bien la reconciliación cuando dos personas editan a la vez y uno pierde conexión.
- **Self-hosting enseña más que cualquier tutorial.** Montar Nginx, certificados y CI/CD para algo que usas de verdad te obliga a entender la pieza entera, no solo el código.
- **Una app que usas a diario se mantiene sola** — los bugs aparecen en uso real, no en demos.

Si quieres ver el detalle técnico (problema, arquitectura, resultados), está en la [página del proyecto](/projects/compras-app).
