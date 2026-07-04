---
title: "The World Cup pool: from a spreadsheet to a web app with Supabase"
date: "2026-06-05"
excerpt: "Every World Cup we ran the pool by hand in a spreadsheet. Messy to update and easy to argue over the scoring. So I turned it into a web app where the leaderboard updates itself."
tags: ["JavaScript", "Supabase", "Vercel", "Side project"]
cover: "/images/projects/porra-mundial/cover.webp"
relatedProject: "porra-mundial"
---

Every World Cup we repeated the same ritual: a shared spreadsheet, predictions by hand and, without fail, someone arguing about how the points were counted. It sort of worked. So I decided to build it properly.

## The goal

A simple web app where each friend enters their match predictions and the **leaderboard updates itself**. No spreadsheets, no arguments about scoring: the rules are applied by the code.

## Why Supabase

For a project among friends I didn't want to stand up a whole backend. **Supabase** gave me exactly what I needed:

- Managed **Postgres** for users, matches and predictions.
- Ready-to-use **auth**, no need to build login from scratch.
- An instant API over the tables.

The front is plain **JavaScript** (no heavy framework, none needed) and it's all deployed on **Vercel**.

## What's interesting

- **Scoring logic lives in one place.** Exact result, correct winner… each case scores differently, and since it's in code, nobody argues.
- **Pick the right tool for the size of the problem.** Not everything needs microservices; sometimes Supabase + plain JS is the fastest, most maintainable answer.
- **Projects with your friends are the best testing ground:** they actually use it and tell you what breaks instantly.

For the technical summary (stack, decisions, status), see the [project page](/en/projects/porra-mundial).
