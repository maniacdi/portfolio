---
title: "When to customise Shopify with bespoke development"
seoTitle: "Custom Shopify Development: When to Build What's Missing"
date: "2027-05-18"
excerpt: "Custom themes, private apps and Shopify Functions: what can be added to Shopify when the App Store doesn't cover what your business actually needs."
tags: ["Shopify", "Shopify Functions", "E-commerce", "Online store"]
---

At [Ū Skin Store](/en/projects/uskinstore) there was a rule Shopify doesn't support: certain products can only be bought by someone with a code from the clinic. Before writing a single line, I did what anyone sensible would do: search the Shopify App Store. If an app already does it well, building it is throwing money away. Because Shopify custom development makes sense when what you need doesn't already exist, or when what exists doesn't hold up.

I explained how I solved the code side in [hiding a product isn't protecting it](/en/blog/ocultar-el-producto-no-es-protegerlo). Here's the bigger map: what can be added to Shopify, from least to most involved, and when each one is worth it.

## First, the App Store

There are thousands of apps, and for the usual things (reviews, filters, translations, subscriptions) there's probably one that already works. An existing app has an advantage people tend to underestimate: maintenance is the vendor's job. When Shopify changes something, they're the ones who fix it.

My test for accepting one: it does exactly what you need without hacks, it works on your Shopify plan (not just on the test store), and its monthly fee makes sense compared to what it would cost to build and maintain for years. If it fails any of the three, I keep looking or move to the next level.

## A theme of your own, or yours adjusted

The theme is what the customer sees, and it's written in Liquid, Shopify's templating language. Adjusting an existing theme (colours, sections, how a product page looks) is the most common kind of Shopify development and the cheapest to maintain. At Ū Skin Store the theme is custom and deployed from code with Shopify's command-line tool.

One thing to watch: if the theme is managed from code, nobody should change the design from Shopify's visual editor, because the two sets of changes end up overwriting each other. Products are edited from the admin as normal; the design isn't. Make that clear from day one to whoever will run the store.

What a theme can't do is enforce a rule. It's paint: it decides what's shown, not what's allowed. That was exactly the mistake I described in the post about code-locked products.

## Custom Shopify apps

When the rule really has to be enforced, you need an app of your own: an application installed only on your store that talks to Shopify through its API. It can store data Shopify doesn't have, connect the store to other systems, or expose its own endpoint through an App Proxy, which is what I used at Ū Skin Store to validate codes with requests signed by Shopify.

This is a Shopify developer working on a proper project: code, hosting and deployments. More power, and a bit more to maintain.

## Shopify Functions: logic inside Shopify

Shopify Functions are small programs that run inside Shopify's own infrastructure at specific points: discounts, delivery options, payment methods, and cart and checkout validation. They don't run in the customer's browser, so they can't be bypassed from outside. At Ū Skin Store, a Validation Function blocks payment if the cart contains a protected product and the customer doesn't have permission.

For business rules that must always hold, it's my favourite part of Shopify. Before you budget for it, though, check what your plan allows: some functions and checkout customisations depend on the plan and on how the app is distributed. **Working on a development store doesn't guarantee it works on yours**, because development stores come with features from higher plans unlocked.

## When Shopify custom development isn't worth it

If everything you want to change is visual, you don't need an app: the theme is enough. If there's a sensible app that does it, use it, even if you're itching to build it yourself. And if everything you ask for clashes with Shopify's mould, maybe the question is a different one: I cover it in [Shopify or a custom online store](/en/blog/shopify-o-tienda-a-medida).

## Where I'd start

Write down, in one sentence, the rule Shopify doesn't handle for you. Then search the App Store with that sentence and test the best two with a real test order. If neither meets it without hacks, you know exactly what needs building and can ask for a specific quote. If you don't have a store yet, start with [how to start an online store](/en/blog/como-montar-tienda-online).

[Online store development](/en/services/online-store-development) explains how I work on Shopify and on custom builds. Or [get in touch](/en#contacto) with that sentence and I'll tell you whether it needs building, whether there's an app, or whether it's not worth it.
