---
title: "IronLog: una app de gimnasio offline-first y sin anuncios"
date: "2026-06-10"
excerpt: "Quería llevar mis rutinas y mi progreso en el gimnasio sin apps llenas de anuncios, suscripciones o cuentas obligatorias. Así que me la hice yo."
tags: ["React Native", "Expo", "Offline-first", "Side project"]
cover: "/images/projects/ironlog/cover.webp"
relatedProject: "ironlog"
---

Probé varias apps de gimnasio y todas tenían el mismo problema: anuncios, suscripción para lo básico o te obligaban a crear cuenta para guardar una rutina. Yo solo quería apuntar series y ver si progreso. Así que me hice IronLog.

## La idea

Una app **rápida y offline-first**: abres, apuntas tu entreno y ves tu progreso. Sin login, sin conexión obligatoria, sin distracciones.

## El stack

- **React Native + Expo** — una base de código, instalada directamente como APK en mi móvil.
- **AsyncStorage** para persistencia local: tus datos viven en el dispositivo, no en un servidor.
- **react-native-svg** para las gráficas de progreso.

## Por qué offline-first

No todo necesita backend. Para una app personal de uso diario, guardar en local es **más rápido, más privado y más simple**: no hay servidor que mantener, no hay latencia, funciona sin cobertura en el gimnasio (donde el WiFi siempre falla).

## Lo que me llevo

- **Menos es más.** Quitar login y servidor eliminó la mitad de la complejidad y mejoró la experiencia.
- **Construir para ti afina el criterio de producto:** cada fricción la notas tú primero.
- **Distribuir como APK** me dio control total sin pasar por la store para algo que uso solo yo.

El detalle técnico (rutinas, registro, progreso) está en la [página del proyecto](/projects/ironlog).
