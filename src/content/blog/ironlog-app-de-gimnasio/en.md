---
title: "IronLog: an offline-first gym app with no ads"
date: "2026-06-10"
excerpt: "I wanted to track my gym routines and progress without apps full of ads, subscriptions or mandatory accounts. So I built my own."
tags: ["React Native", "Expo", "Offline-first", "Side project"]
cover: "/images/projects/ironlog/cover.webp"
relatedProject: "ironlog"
---

I tried several gym apps and they all had the same problem: ads, a subscription for the basics, or forcing you to create an account just to save a routine. I just wanted to log sets and see if I was progressing. So I built IronLog.

## The idea

A **fast, offline-first** app: open it, log your workout, see your progress. No login, no mandatory connection, no distractions.

## The stack

- **React Native + Expo** — one codebase, installed directly as an APK on my phone.
- **AsyncStorage** for local persistence: your data lives on the device, not on a server.
- **react-native-svg** for the progress charts.

## Why offline-first

Not everything needs a backend. For a personal, daily-use app, storing locally is **faster, more private and simpler**: no server to maintain, no latency, and it works with no signal at the gym (where the WiFi always fails).

## What I take away

Removing login and the server cut half the complexity and improved the experience: less is more. Building something you use daily also sharpens your product judgment, because you feel every bit of friction first. And shipping it as an APK, skipping the store, gave me full control for something only I use.

The technical breakdown (routines, logging, progress) is on the [project page](/en/projects/ironlog).
