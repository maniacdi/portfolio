---
title: "Payment gateways for online stores: how to choose"
seoTitle: "Payment Gateways for Online Stores: How to Choose"
date: "2027-09-21"
excerpt: "Fees, payment methods, security and integration: what to look at when choosing the payment gateway for your online store or your booking system."
tags: ["E-commerce", "Payments", "Online store", "Small business"]
---

Your bank offers you a card processing service, your store platform suggests its own, someone tells you Stripe is the easiest, and your customers ask whether they can pay with PayPal. Choosing a payment gateway for your online store looks like paperwork, and it's one of the decisions you feel on every sale: what you're charged, how long the money takes to arrive and how many customers give up at checkout.

I'll frame it around the questions I'd ask, because there's no single "best" gateway. There's the one that fits your store.

## Which payment gateway does your online store support?

Before comparing fees, check what your platform lets you use.

On Shopify, the natural choice is Shopify Payments: it's built in, you switch it on from the admin, and it takes cards, Apple Pay and Google Pay. You can use another gateway, but then Shopify generally adds its own fee per sale on top of the gateway's. For a small shop, that difference usually settles it.

On WooCommerce or a custom store, you're free to choose. There are integrations for almost everything. If you're still weighing up platforms, what each one costs is in [how much an online store costs](/en/blog/cuanto-cuesta-tienda-online).

## How do your customers want to pay?

Every missing method is a customer who hesitates. The usual list:

- Cards, always. That's the minimum.
- Apple Pay and Google Pay, which save typing a card number on a phone.
- PayPal, which some people prefer so they don't have to hand their card details to a shop they don't know.
- Local methods. Each country has its favourites (Bizum in Spain, iDEAL in the Netherlands, and so on). Not every platform supports them the same way: some offer them natively, others only through an external gateway or an app. Check before you promise them.

## Stripe vs PayPal, and where your bank fits in

These are the usual contenders for a small business.

Stripe signs you up online in minutes, publishes its pricing, has a very polished integration and accepts cards, Apple Pay, Google Pay and a long list of local methods.

PayPal is less about the integration and more about the customer: lots of people have an account and trust it. It's usually offered alongside a card gateway rather than instead of one.

Your bank's card processing service is the third route. In Spain, for example, most banks offer a virtual terminal through Redsys, which is also the usual way to accept Bizum. You negotiate fees with the bank, but sign-up goes through the branch and the technical integration is older and more laborious.

My take: if your platform doesn't already steer you to one option, Stripe is the quickest to get running, PayPal is worth adding if your customers ask for it, and a bank terminal can pay off if your bank offers good terms or you need a local method that only comes that way. Get quotes in writing and compare them against your real sales.

## What does each sale really cost?

Fees change and depend on volume, card type and whether the customer is from outside Europe, so I won't give you figures that will go out of date. What I will tell you is what to ask:

- Percentage per sale and fixed amount per transaction, if any. On small orders, the fixed part weighs a lot.
- The cost of refunds and chargebacks (when a customer disputes the charge with their bank).
- Any monthly or set-up fee.
- How many days the money takes to reach your account.

With that and your average order value, you can work out what each order costs you. Always check current pricing with each provider.

## Security: what the gateway does for you

Two things worth knowing. First: in Europe, payment regulation (PSD2) requires strong customer authentication, that step where your bank asks you to confirm the purchase on your phone. Any serious gateway handles it for you.

Second: **card details should never pass through your server**. With a payment form or page hosted by the gateway, the card number goes straight to them and you only get the confirmation. That spares you most of the card data security obligations (the PCI DSS standard) and the risk of storing something you don't want to have.

## If you take bookings, not just orders

In a booking system the gateway gets used differently: taking a deposit when someone books, holding an amount without charging it, or refunding if they cancel in time. Not every gateway makes that equally easy. I cover it in [taking deposits for online bookings](/en/blog/cobrar-senal-reserva-online).

## The best payment gateway for a small business, in my book

If the store is on Shopify, I'd start with Shopify Payments and only consider another gateway for a payment method my customers ask for and it doesn't offer. On WooCommerce or a custom build, Stripe to get going quickly, PayPal if customers want it, and a bank terminal if the terms are good or a local method depends on it. In every case, a real test order with a real card before opening. If you're building the store from scratch, the full guide is [how to start an online store](/en/blog/como-montar-tienda-online).

[Online store development](/en/services/online-store-development) explains how I work, payment integration included. Or [get in touch](/en#contacto) with the platform you use and how your customers pay you today.
