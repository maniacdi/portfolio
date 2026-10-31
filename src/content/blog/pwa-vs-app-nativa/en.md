---
title: "PWA or native app: pros, limits and when to choose each"
seoTitle: "PWA vs Native App: Pros, Limits and When to Choose"
date: "2027-08-17"
excerpt: "What a progressive web app is, what it can actually do on iOS and Android today and when it's a cheaper alternative to publishing in the app stores."
tags: ["Mobile apps", "PWA", "Web development", "Small business"]
---

You want your business on your customers' home screens, with its own icon, but the budget for a store app is out of reach. Someone mentions PWAs: "it's a website, but it installs like an app". Sounds like the best of both worlds. Sometimes it is. An honest PWA vs native app comparison comes down to knowing what each does well and, above all, what a PWA can't do on iPhone.

## What is a PWA?

A PWA (progressive web app) is a website built to behave like an app: it can be added to the home screen, opens full screen without the browser bar, can store data to partly work offline and, in some cases, send notifications.

Under the hood it's still a website: one codebase that runs on any phone and on desktop, updates instantly for everyone and can be indexed by Google. It doesn't go through the App Store or Google Play, so there's no review, no developer accounts and no store fees.

## What a PWA does well

- Cost: it's one build, and if you're going to have a website anyway, a good chunk of the work is done.
- Updates: you publish and everyone gets the new version the next time they open it. No waiting on review.
- It can be found on Google: your customer arrives from a search, uses it and, if they like it, installs it. With an app, you first have to convince them to download it.
- It works everywhere: Android, iPhone, desktop. Same link.

## The limits, especially on iPhone

Here's the caveat hardly anyone mentions when selling you a PWA. On Android with Chrome, the experience is very close to an app: the browser offers to install it, it has access to quite a few phone features and it can even be published on Google Play wrapped as an app.

On iPhone it's a different story:

- There's no automatic install prompt. Users have to open the share menu and choose "Add to Home Screen". Most people don't know it exists.
- Push notifications have worked since iOS 16.4, but only if the user has installed the PWA to the home screen first. From Safari without installing, they don't.
- Features like Bluetooth or NFC from the web aren't available on iPhone.
- Background tasks are very limited: if the PWA isn't open, it does practically nothing.
- Safari can clear stored data from websites that haven't been used for a while, although installed PWAs are better protected. For an app that relies on keeping data on the phone, that's a risk to weigh up.

Apple has been adding support bit by bit, and in 2024 it even announced it was dropping installed PWAs in the European Union before backtracking. What you can do on iPhone changes from one version to the next, so check it when you decide.

## When a progressive web app is enough

- Customers find you on Google and the app is mostly for looking things up, bookings or simple orders.
- It needs to work on phone and desktop, for example an internal tool for your team.
- Most of your users are on Android, or what you need works the same on both systems.
- You want to test whether customers would use an app before investing in a store one.

That last one is a smart strategy: a well-built PWA gives you a real-world test at a lower cost, and if it works, you have the data to justify the app.

## When you need a native (or cross-platform) app

- Notifications are central and your customers are on iPhone without having installed anything.
- You need Bluetooth, NFC, background location or deep integration with the OS.
- Reliable offline use is essential, not a nice-to-have.
- Being in the store matters: in some sectors customers expect to search for you on the App Store.

"Native" here doesn't necessarily mean two apps written in Swift and Kotlin. With React Native or Flutter you build a store app from one codebase; I explain it in [React Native, Flutter or native](/en/blog/react-native-vs-flutter-vs-nativo).

## PWA vs native app: what I'd do

If you're not yet sure you need an app at all, start one step back: [app or website for your business](/en/blog/app-o-web-para-negocio). If you already know you want something installable, look first at who's going to use it and on which phone. With mostly iPhone users and notifications at the core, I'd go for a store app. If it's more about looking things up and booking, a PWA gives you a lot for quite a bit less. The full app process is in [how to create an app for your business](/en/blog/crear-app-para-negocio).

I build both, so I've no stake in selling you one or the other. My approach is on the [business websites](/en/services/business-websites) and [mobile app development](/en/services/mobile-app-development) pages, or [get in touch](/en#contacto) and we'll look at your case.
