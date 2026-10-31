---
title: "How much it costs to make an app and what drives the price"
seoTitle: "How Much Does It Cost to Make an App?"
date: "2027-01-19"
excerpt: "Screens, backend, design, publishing and maintenance: what makes an app cost more or less and why starting with a small first version makes sense."
tags: ["Mobile apps", "Budget", "Small business", "React Native"]
---

"How much does it cost to make an app like [insert famous app here]?" It's the most common question and the one you can't answer as asked. Behind that app there are whole teams working for years. What you can answer is how much yours would cost, and for that you need to look at the pieces it's made of.

If you're after a fixed number, no article will give you one honestly. What I can give you is what drives the price, so that when you ask for quotes you know how to compare them.

## The part you see: screens and flows

Every screen has its own design, logic and awkward cases (what if there's no data, the connection drops, the user goes back halfway through). An app with five screens and a linear flow is a different beast from one with thirty screens and separate roles for customer, staff and admin.

That's why the first useful document for a quote isn't a feature list. It's a list of screens and what happens on each one.

## The part you don't see: the backend

This is where two apps that look alike can end up miles apart on price. An app that keeps everything on the phone doesn't need a server. My gym app, IronLog, works like that: no login, no backend, nothing to maintain outside the phone.

The moment data is shared between users or devices, everything else shows up: a database, authentication, an API, an admin panel to manage content, backups, and someone keeping an eye on the server. If you also need real time (a change on one phone appearing instantly on another), add another layer. In terms of app development cost, this block can weigh as much as the app itself, or more.

## Features that push the price up

Some features look small on the list and aren't:

- In-app payments. The stores have strict rules about what you can charge for outside their system and when you have to use theirs, commission included.
- Push notifications. Setting them up is the easy bit; deciding when and to whom they go out, and building the system that sends them, is what takes time.
- Integrations with what you already use: your ERP, your invoicing software, your booking system. It depends hugely on whether that system has a decent API.
- Maps, location, camera, Bluetooth. Every phone feature comes with its own permissions, iOS and Android differences, and testing.
- Working offline and syncing later. It's one of the most complex things there is, even though it takes up one line on the list.

## iOS, Android or both

With cross-platform tech (React Native or Flutter) you write one codebase for both systems, which is much cheaper than building two native apps. But "one codebase" doesn't mean "free work": you still test on both, tweak details for each and go through two store reviews.

If your users are internal staff and all on Android, you may not even need a store. If they're customers, you almost certainly need both.

## Design, publishing and what comes after

A mobile app budget that only covers "development" is incomplete. Check that it includes:

- Screen design and a prototype before any coding.
- Publishing: developer accounts (Apple's is yearly, Google's a one-off payment), store listings, a privacy policy and review.
- Maintenance: new versions of iOS and Android come out every year, and the stores require apps to be updated to stay listed. Plus the server, if there is one.

That last point is the one that surprises people most. An app isn't a one-off expense: it has a fixed yearly cost, like a website but usually bigger. I compare it with websites in [how much a business website costs](/en/blog/cuanto-cuesta-pagina-web-negocio).

## How to lower the cost without cutting corners

The most effective way to reduce the cost is not to build everything at once. A first version with only the essentials gets the app into real users' hands sooner, with less risk, and tells you what's worth building next. I explain it in [how to launch the first version of your app](/en/blog/mvp-primera-version-app).

What I don't recommend is saving on the parts you can't see: no testing on real phones, no backups, or the code and accounts in someone else's name. That's cheap in month one and very expensive later.

## Before you ask how much it costs to make an app

Prepare three things: the list of screens, whether data is shared between users or not, and which features are essential on day one. With that, any serious developer can give you a fixed quote, and you can compare them knowing what each one includes. If you're missing context on the whole process, start with [how to create an app for your business](/en/blog/crear-app-para-negocio).

I work with a fixed quote before starting and delivery in phases. The details are on the [mobile app development](/en/services/mobile-app-development) page, or [get in touch](/en#contacto) with your idea and I'll tell you what it depends on in your case.
