---
title: "How to connect your tools: CRM, ERP, store and spreadsheets"
seoTitle: "How to Connect Your CRM, ERP, Store and Spreadsheets"
date: "2027-04-20"
excerpt: "When to integrate tools through an API, when Zapier or Make is enough and what to do when an app won't let you connect it to the rest of your stack."
tags: ["Integrations", "Custom software", "Automation", "Small business"]
---

An order comes in through your online store. Someone enters it in the ERP to update stock, then adds the customer to the CRM, and finally updates the spreadsheet where you track takings. Four tools, one order and three lots of retyping. That's what business systems integration is about: data gets written once and reaches everywhere it needs to on its own.

There are several ways to get there, and the best one isn't always the most sophisticated. Here they are from least to most effort.

## First, check what you already have

Before paying for anything, look at the integrations section of each tool. Many come with native connections to the best-known ones: store to invoicing, bookings to calendar, CRM to email. They switch on in a couple of clicks and the vendor maintains them.

A typical example is keeping your bookings synced with your personal calendar; I cover it in [syncing bookings with Google Calendar](/en/blog/sincronizar-reservas-google-calendar). If a native connection exists and does what you need, look no further.

The limit: they do what the vendor decided, no more and no less. If you only want certain kinds of orders to go through, or a field to be transformed on the way, you often can't.

## Zapier, Make and friends: no-code glue

Automation tools like Zapier or Make sit in the middle: "when this happens in tool A, do that in tool B". You set them up without code and they connect thousands of apps.

When they're enough:

- Simple, low-volume flows: a form that creates a CRM contact, an order that adds a row to a sheet.
- When you want to test whether an automation is worth it before investing more.

When they start to fall short:

- High volume. They charge per task or operation, so the bill grows with your business.
- Logic with lots of conditions. A twenty-step flow with branches is hard to follow and harder to fix when it breaks.
- Sensitive data. Everything passes through one more third party, and under data protection law (GDPR in the EU) that's another processor to vet.
- Silent failures. If a run fails at 3am, someone needs to find out.

This isn't a knock on them: they're great for getting started. I just wouldn't make them the backbone of a business without thinking twice.

## Custom business systems integration through APIs

When none of that is enough, you connect directly to each tool's API: the door apps provide so other programs can read and write their data. If that sounds like jargon, I explain it in plain English in [what an API is](/en/blog/que-es-una-api).

A custom integration gives you full control: which data moves, when, how it's transformed and what happens if something fails (retry, alert someone, log it). It also handles things no-code glue does badly, like loading a supplier's entire catalogue in one go; see [importing your catalogue into your online store](/en/blog/importar-catalogo-tienda-online).

Something I learnt at AMS Solutions, where I work inside the Inditex ecosystem: when an application needs data from lots of services, putting a layer in between that gathers it and serves it ready to use simplifies everything. What we built is called a BFF, and it cut response times by 40%. At small-business scale the idea is the same: one piece that talks to the CRM, the ERP and the store, rather than every tool trying to talk to every other.

## Integrating CRM and ERP: the source-of-truth rule

Before connecting anything, decide which tool is in charge of each piece of data. Stock belongs to the ERP. Contact details, the CRM. Orders, the store. If two systems can edit the same thing and sync both ways, sooner or later you'll get a conflict and nobody will know which version is right.

This is the decision that prevents the most problems and the one fewest people make. A table with three columns (data, who owns it, who reads it) is worth more than any tool.

## What if an app won't let you connect it?

It happens, especially with older or very niche software. Options, from best to worst:

- Ask the vendor. Sometimes the API exists but sits on a higher plan or isn't advertised.
- Scheduled exports. If the program produces a CSV every night, it can be picked up and loaded elsewhere.
- Automatic emails. Some systems send an email for every order or booking, and that email can be processed.
- Switch tools. If something central to your business won't let you get your own data out, that's a risk, not just an annoyance.

What I'd avoid is automating clicks on the program's screen. It works until someone moves a button.

## Where to start

Draw your tools on a sheet of paper and connect with arrows the data you currently move by hand. The arrow that repeats most is your first integration. Try native options or Zapier or Make first; if they fall short, you'll know exactly what to ask for.

If something of your own fits better, [custom or off-the-shelf software](/en/blog/software-a-medida-vs-estandar) shows how to run the numbers, and [custom software](/en/services/custom-software) explains how I work. Or [get in touch](/en#contacto) with your arrow diagram.
