---
title: "La porra del Mundial: de una hoja de cálculo a una web con Supabase"
date: "2026-06-05"
excerpt: "Cada Mundial montábamos la porra a mano en una hoja de cálculo. Lioso de actualizar y fácil de discutir los puntos. Así que la convertí en una web donde la clasificación se calcula sola."
tags: ["JavaScript", "Supabase", "Vercel", "Side project"]
cover: "/images/projects/porra-mundial/cover.webp"
relatedProject: "porra-mundial"
---

Cada Mundial repetíamos el mismo ritual: una hoja de cálculo compartida, predicciones a mano y, sin falta, alguien discutiendo cómo se contaban los puntos. Funcionaba… regular. Así que decidí montarlo bien.

## El objetivo

Una web sencilla donde cada amigo mete sus predicciones de los partidos y la **clasificación se actualiza sola**. Cero hojas de cálculo, cero discusiones sobre el cálculo de puntos: las reglas las aplica el código.

## Por qué Supabase

Para un proyecto entre amigos no quería montar un backend entero. **Supabase** me dio justo lo que necesitaba:

- **Postgres** gestionado para guardar usuarios, partidos y predicciones.
- **Auth** lista para usar, sin montar yo el login desde cero.
- Una API instantánea sobre las tablas.

El front es **JavaScript** directo (sin framework pesado, no hacía falta) y todo desplegado en **Vercel**.

## Lo interesante

- La lógica de puntos vive en un sitio. Acertar el resultado exacto, acertar el ganador… cada caso suma distinto, y al estar en código nadie discute.
- Elegir la herramienta correcta para el tamaño del problema. No todo necesita microservicios; a veces Supabase + JS plano es la respuesta más rápida y mantenible.
- Los proyectos con tus amigos son el mejor banco de pruebas: lo usan de verdad, te dicen lo que falla al instante.

Si quieres el resumen técnico (stack, decisiones, estado), está en la [página del proyecto](/projects/porra-mundial).
