---
title: "Apps that work offline and sync in real time"
seoTitle: "Offline and Real-Time Apps: How They Work"
date: "2027-09-28"
excerpt: "When your app needs to work without signal, how data syncs between users and devices, and how much complexity each technical approach adds to the build."
tags: ["Mobile apps", "Offline-first", "Real time", "React Native"]
---

The Wi-Fi at the gym always fails. That's why my workout app stores everything on the phone and never needs a connection. At home, though, the shopping list has to be identical on both our phones instantly, or we end up buying the milk twice. Two of my own apps with opposite needs, and between them sits almost everything you need to know about building an offline-first app and syncing in real time.

If you're planning an app for your business, this is one of the decisions that moves the budget most, and it almost never comes up in the first meeting.

To make sense of it, it helps to think of four levels of app based on how they handle data, from simplest to most complex.

## 1. Always online

The app asks the server for data every time and, with no signal, shows an error message. It's the simplest to build and covers a lot: browsing a catalogue, booking an appointment, checking an order. If your users always have a connection when they use it, don't overcomplicate it.

The classic mistake is staying here when real-world use doesn't allow it: a technician filling in job sheets in a basement who loses everything because there was no signal when they hit save.

## 2. Phone only

The data lives on the phone and there's no server. That's how [IronLog](/en/blog/ironlog-app-de-gimnasio) works: fast, private and with nothing to maintain outside the phone. It always works, signal or not.

The trade-off: lose the phone and you lose the data (unless you set up backups), and nothing can be shared with anyone or seen from another device. For a personal tool it's perfect. For business data, it's rarely enough.

## 3. Online and real time

The data lives on a server and changes reach every device immediately, no refresh needed. That's what [Compras App](/en/blog/como-construi-compras-app) does: if my partner ticks something off on their phone, it disappears from mine that same instant. Under the hood it uses WebSockets, a permanently open connection between the app and the server that carries changes both ways.

It's useful whenever several people look at the same thing at once: an order board in a kitchen, a team's task list, room availability. The complexity lies in the server (keeping connections alive, reconnecting when they drop) and in simultaneous changes.

## 4. Offline-first app with sync

The app saves to the phone first, works offline as if nothing happened and, when the signal returns, syncs with the server and the other devices. It's what you expect from the big note-taking apps, and it's much harder than it looks.

The reason has a name: conflicts. If two people edit the same data offline, each on their own phone, which version wins when they reconnect? Even in Compras App, which sits at level 3, I had to think carefully about reconciliation when two people edit at once and one of them loses the connection. And it's a shopping list.

## How conflicts get resolved

There's no single answer. It depends on what the data is and what happens if a change gets lost:

- Last write wins. Simple, and enough when losing an occasional change isn't serious, like marking an item as bought.
- Merge by field. If one person changed a customer's phone number and another their address, both changes are kept. There's only a conflict if they touched the same field.
- Ask the user. For important data, like a quote or a medical record, the honest approach is to show both versions and let a person decide.
- Structures that merge themselves. There are techniques designed so concurrent changes combine without conflicts, as in collaborative editors. Powerful, but they add complexity few business apps need.

Choosing the strategy is as much a business decision as a technical one. That's why I always ask: if two employees change the same thing with no signal, what should happen?

## How much complexity (and cost) each option adds

Going from level 1 to 2 or 3 is a reasonable step. Level 4 is another league: you have to design from the start how data is stored locally, how pending changes are flagged, how sending is retried, how conflicts are resolved and how all of that gets tested on bad networks. Adding offline mode to an app that wasn't designed for it usually costs more than building it in from day one.

The mobile tech matters less than you'd think: React Native, Flutter and native can all handle the four levels. The differences are in the libraries, which I cover in [React Native, Flutter or native](/en/blog/react-native-vs-flutter-vs-nativo).

## How I'd approach an app that works without internet

List the moments when the app gets used and mark which ones can happen with no signal. If there are none, level 1 or 3 and move on. If there are, decide which data has to be available offline and what happens if two people change it at the same time. With those answers you can pick the lowest level that covers the case, which is the one I'd recommend.

If you're starting from scratch, the overall process is in [how to create an app for your business](/en/blog/crear-app-para-negocio). And if you'd like to work out together how yours should behave, my approach is on the [mobile app development](/en/services/mobile-app-development) page, or [get in touch](/en#contacto).
