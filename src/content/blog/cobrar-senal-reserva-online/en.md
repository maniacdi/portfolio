---
title: "Taking a deposit on bookings: when it makes sense and how to do it"
seoTitle: "Taking Deposits on Online Bookings: When and How"
date: "2027-05-11"
excerpt: "When it's worth asking for a payment or deposit at booking, how it affects cancellations and what you need to take it securely on your site."
tags: ["Online bookings", "Payments", "Small business", "Appointments"]
---

It's happened again: a two-hour treatment booked for Saturday, the slot held all week, two other people turned away, and the customer doesn't show or call. That's usually the moment you start thinking about how to take deposits for online bookings. Done well, it works. Done badly, it scares off customers who would never have let you down. Let's go through it with the questions I'd ask myself before switching it on.

## Do you really need it?

Numbers first. How many no-shows do you get a month, and on which services? If they're few and spread out, a deposit is overkill: reminders and an easy cancel link solve a good part of the problem, as I explain in [how to reduce appointment no-shows](/en/blog/reducir-citas-no-presentadas).

A deposit makes sense when the rest isn't enough, or when a lost slot is expensive:

- Long or expensive services, where a no-show is half a morning gone.
- Limited places: a workshop for eight, a table for twelve, a tasting menu.
- Appointments that need something prepared in advance (materials, products ordered in).
- Customers who've missed appointments before.

For a 20-minute haircut with loyal regulars, in my opinion, it's too much.

## Deposit, full payment or card on file?

There are three ways to handle booking prepayment, and each changes the customer's experience:

- A fixed deposit or percentage. Paid at booking and taken off the final price. The most common option and the easiest to understand.
- Full payment at booking. Makes sense when the price is fixed (a workshop, an experience, a ticket). For services where the final price depends on what's decided during the appointment, it complicates things.
- Card on file. The customer saves their card and is only charged if they don't show or cancel late. It's the least friction at booking, but technically it's more delicate: a simple hold on a card expires within days, so for appointments further out the usual approach is to save the card with the customer's explicit permission to charge it later.

## What does your cancellation policy say?

**A deposit without a clear cancellation policy is an argument waiting to happen.** Before charging anything, write down:

- How late customers can cancel or reschedule without losing the deposit.
- What happens if they don't turn up or cancel late.
- What happens if you cancel (you refund it in full, no questions asked).

And make sure customers see and accept it before paying, not in a PDF linked from the website footer. A checkbox next to the pay button with a two-line summary is enough.

A note: what that money is called and what legal effect it has (deposit, prepayment, part payment) has legal nuances, and so do the consumer rules that apply where you trade. If you're going to keep money for cancellations, have your accountant or a lawyer check the wording before you publish it.

## How do you take deposits for online bookings securely?

Through a payment gateway. Stripe, PayPal, your bank's card gateway and similar services do the delicate work: card details go straight to them and never pass through your server. That matters, because storing card numbers in your own database would put you under security standards (PCI DSS) that make no sense for a small business.

In Europe, most online card payments also require strong customer authentication: the confirmation in your banking app that everyone knows by now. Modern gateways handle it, but your booking system has to account for it: if the customer doesn't complete that step, the booking can't be left half-confirmed.

Which gateway to choose depends on fees, which payment methods your customers expect, how you take payments in person and how it integrates with your website. I compare them in [payment gateways for online stores](/en/blog/pasarelas-de-pago-tienda-online), and the same applies to bookings.

## What should the booking system do with the payment?

This is where tools differ. The minimum I'd ask for:

- The appointment isn't confirmed until payment is complete, and the slot is released if the customer abandons halfway.
- The confirmation email includes the amount paid and the cancellation policy.
- The cancel link applies the policy on its own: within the deadline, refund; past it, a warning that the deposit will be lost.
- From your dashboard, you can refund a deposit in one click when you decide to make an exception (and you will).

Many platforms include this out of the box; in your own system it's built around your rules.

## What if I lose customers?

You'll lose some, especially at first. The question is whether they're the ones who used to let you down. My advice: start only with the services that hurt most, measure no-shows and bookings for a couple of months, and decide with data. If the deposit doesn't cut no-shows or drives bookings down a lot, take it off.

If you're just getting started with online bookings, the general guide is [from phone and WhatsApp to online bookings](/en/blog/pasar-citas-a-reservas-online). And if you'd like it built around your rules, my [online booking system](/en/services/online-booking-system) page explains how I work. Or [get in touch](/en#contacto) and I'll reply within 48 hours.
