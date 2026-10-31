---
title: "How to publish your app on the App Store and Google Play"
seoTitle: "How to Publish Your App on the App Store and Google Play"
date: "2027-07-06"
excerpt: "Developer accounts, review, screenshots, privacy and updates: what you need to publish an app and why the accounts should be in your business's name."
tags: ["Mobile apps", "App Store", "Google Play", "Guide"]
---

The app is finished, it works on your phone and you want customers downloading it tomorrow. Not so fast. Between "it works" and "it's in the store" there are accounts, verifications, store listings and a review that can send the app back to you. If you're figuring out how to publish an app on the App Store and Google Play, it pays to know what's coming so you can put it in the schedule.

An honest note before we start: my personal apps, like IronLog and Compras App, I distribute as APKs on Android, without going through a store, because they're only used at home. What follows is the process as Apple and Google document it, and it's worth checking again when you publish, because it changes often.

## First things first: the accounts, in your business's name

The app is published from a developer account, and whoever owns that account effectively owns the app: they can update it or pull it. If the person building your app opens it in their own name, your app depends on them for good.

Open them yourself, with your company's details, and give your developer access as a team member. I cover this more broadly in [how not to depend on your developer](/en/blog/no-depender-de-tu-programador).

## The Apple developer account

To publish on the App Store you need to enrol in the Apple Developer Program. It has an annual fee (99 US dollars or the local equivalent at the time of writing) and if you stop paying it, your apps stop being available.

For a company account, Apple will ask for a D-U-N-S number, a free business identifier that can take days to arrive. You can also enrol as an individual, but then the app is listed under your personal name.

If you distribute in the European Union, Apple also asks you to declare whether you're a trader and, if so, to show your contact details on the listing.

## The Google Play account

Google charges a one-off fee to register for Play Console (25 US dollars at the time of writing) and verifies your identity. Organisation accounts usually need a D-U-N-S number too.

A detail that catches a lot of people out: recently created personal accounts have to run a closed test with a minimum number of testers over a continuous period before they can publish publicly. If you're a business, open an organisation account and skip that step. If not, factor in those extra weeks.

## What to prepare for the store listing

On both stores you'll need:

- Name, descriptions, category and icon.
- Screenshots in the sizes each store asks for. Apple requires them for certain iPhone sizes (and iPad, if the app runs on iPad).
- A URL with your public privacy policy.
- The data declaration: Apple calls it "App Privacy" and Google calls it "Data safety". You state what data the app collects, what for and whether it's shared with third parties. It has to match what the app really does, including any analytics libraries bundled inside.
- An age rating, done through a questionnaire.
- If the app has a login, a test account so the reviewer can get in.

And one Apple requirement worth designing in from the start: if your app lets people create an account, it must also let them delete it from inside the app.

## Testing and review

Before publishing, test with real people: Apple has TestFlight for installing test builds on invited people's iPhones, and Google has internal, closed and open testing tracks.

When you submit the app, each store reviews it. At Apple, review is done by a person working from the App Review Guidelines, and it usually takes a day or a few, though it can drag on. The most common rejections: the app crashes, there are broken links or half-built screens, the listing promises something the app doesn't do, privacy information is missing, or the app is little more than a website in a wrapper.

A rejection isn't the end of the world: they tell you why, you fix it and resubmit. Google reviews too, with more automation.

## Afterwards: updates and moving requirements

Every new version goes through review again. Some fixes that don't touch native code can be pushed straight to phones with tools like Expo's EAS Update (I use it in Compras App), but always within each store's rules: you can't change what the app does that way.

The stores also raise their requirements regularly: Google requires targeting recent Android versions and Apple requires building with recent tools. An app nobody updates eventually vanishes from the store.

## How to publish an app on the App Store without surprises

Open both accounts in your business's name as soon as you decide to build the app, because verification and the D-U-N-S number can take a while. Prepare the privacy policy and the data declaration alongside development. And leave at least a couple of weeks between "app finished" and "launch date".

If you want the whole process from the idea onwards, it's in [how to create an app for your business](/en/blog/crear-app-para-negocio). And if you'd like me to handle it, with the accounts always in your name, my approach is on the [mobile app development](/en/services/mobile-app-development) page, or [get in touch](/en#contacto).
