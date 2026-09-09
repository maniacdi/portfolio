---
title: "Hiding a product isn't protecting it"
date: "2026-09-09"
excerpt: "A clinic wanted to sell online the products it recommends in consultation, but the brands won't let you sell them to just anyone. The solution that comes to mind first — hide the product in the storefront — doesn't survive five minutes. Here's what I built instead."
tags: ["Shopify", "Security", "E-commerce", "Shopify Functions", "Client work"]
cover: "/images/projects/uskinstore/cover.webp"
relatedProject: "uskinstore"
---

An aesthetic medicine clinic I work with wanted to sell online the products it already recommended in consultation. The catch: part of that catalogue comes from selective-distribution brands, and those brands won't let you put their cream one click away for everybody. If anyone can buy it without going through a professional, the agreement is broken. But they didn't want half a catalogue either.

So I had to build something odd for an online store: products you can see, but that only somebody holding a code from the clinic can buy.

## The first thing you think of is wrong

On Shopify the temptation is obvious: hide the product in the theme, or put a password field on the product page and don't render the buy button unless they type it. You can do it in an afternoon.

And it sort of works. Because **a storefront theme isn't a lock, it's paint**. The "add to cart" button isn't what puts the product in the cart: it's a form pointing at a Shopify endpoint. Anyone who knows the variant identifier reaches the cart without visiting your page, without running your JavaScript and without ever seeing your form. The product's direct link doesn't disappear because you pulled it from the menu, either.

Which means the afternoon version protects nothing: it only makes the product awkward to find. That isn't what the brand is asking you for.

## Three layers and one rule

What I ended up building splits the job:

- **The theme** hides the product and explains that a code is needed. That's user experience, and I assume it can be bypassed.
- **My own endpoint** is the only piece that really validates a code. Shopify signs the requests that arrive through App Proxy, so I can verify the caller came from the store and not from a script.
- **A Validation Function** running inside Shopify blocks checkout. This is the one that matters: it never executes in anybody's browser, so there's no way around it from the front end.

The rule holding it together: **the grant lives on the customer account**. Carts get emptied, duplicated and tampered with. An account doesn't.

And no, the password isn't asked for "on the payment screen". Customising Shopify's checkout end to end requires Shopify Plus, around €2,300 a month. For a small clinic that isn't a debate: you solve it earlier, at add-to-cart, and the Validation Function makes sure nobody sneaks in behind it.

Codes are hashed with scrypt and rate-limited per customer and per IP, because a six-character code with unlimited attempts guesses itself.

Next up is deploying the gating app and opening the store to the public. In the meantime, [the full case study is here](/projects/uskinstore).
