---
title: "Custom or off-the-shelf software: when each makes sense"
seoTitle: "Custom vs Off-the-Shelf Software: When Each Makes Sense"
date: "2026-12-15"
excerpt: "When an existing tool is enough, where it falls short and how to work out whether a custom build pays for itself in the time it saves you."
tags: ["Custom software", "Small business", "Automation", "Guide"]
---

You pay for three subscriptions: one for bookings, one for invoicing and one for customer records. None of them talk to each other, so someone on your team spends Friday afternoons copying data from one to the next. Sound familiar? That's usually when the question comes up: custom software vs off-the-shelf, do I keep patching things together or build something of my own?

My short answer: most businesses should start with off-the-shelf software. And some of them, at some point, should stop. This guide is about working out which side you're on.

## What each one is, plainly

Off-the-shelf software is what already exists and you rent or buy: a booking SaaS, an invoicing tool, a CRM, Shopify. Lots of people use it at once, so it's designed for the average case.

Custom software is built for your business: your workflow, your data, your rules. It can be a full application or something smaller, like a panel that pulls together what you currently keep in four different places.

Between the two there's a middle ground people tend to forget, and it's often the right answer: off-the-shelf tools connected to each other through integrations or small custom pieces.

## What off-the-shelf does really well

I have nothing against SaaS. I use it every day and recommend it often. The advantages are real:

- You can start tomorrow. Sign up, configure, done.
- Upfront cost is low and predictable: a monthly fee.
- Someone else handles maintenance, security, backups and updates.
- If it's a well-known tool, there are tutorials, people who already know it, and support.

For processes that look the same in every business (accounting, payroll, email, e-signatures) building your own would be odd. Off-the-shelf wins there every time.

## Where it falls short

The trouble starts when the way you work isn't the average case. The signs are usually these:

- You bend your process to fit the tool. "We do it this way because the software won't let us do anything else."
- One workflow needs three or four tools, and data moves between them by hand.
- You're on the expensive plan for a single feature you actually need.
- Your information lives on someone else's servers, in their format, and exporting it is painful.
- The vendor changes prices or features and all you can do is accept it.

None of these alone justifies a custom build. Several at once, for months, start to add up.

## The benefits of custom software (and the small print)

When I built the admin panel for [Ū Medicina Estética](/en/projects/umedicinaestetica), the clinic needed scheduling, appointments, website content and patient records in one place, editable by their own staff, with no plugins to maintain. It runs on Next.js, Postgres and Clerk, and appointment reminders go out on their own through scheduled jobs. Those are the benefits of custom software when it fits:

- It does exactly what you need, and nothing you won't use.
- The data is yours, in your database, in the format you choose.
- It changes when your business changes, instead of waiting for a vendor's roadmap.
- It can automate precisely the steps that eat your team's time today.

Now the small print, because there is some:

- The upfront investment is bigger, and it takes weeks or months to be ready, not a day.
- It needs maintenance: dependency updates, hosting, backups. Someone has to own that.
- If the code and accounts aren't in your name, you've swapped one kind of vendor lock-in for another. I explain how to avoid that in [how not to depend on your developer](/en/blog/no-depender-de-tu-programador).

## SaaS or custom build: run the numbers

This is the step most people skip, and the one that helps most. You don't need a complicated spreadsheet; three numbers will do.

The first is the cost of manual work. Count the hours your team spends each week on tasks a system could handle: copying data, reconciling sheets, sending reminders, putting reports together. A made-up example just to show the maths: 5 hours a week over 46 working weeks is 230 hours a year. If that hour costs you 20, that's 4,600 a year spent on work that adds nothing.

The second is what you pay today in subscriptions the custom build would replace. Only the ones it would genuinely replace.

The third is the cost of the build: the initial quote plus yearly maintenance. Ask for both figures separately; maintenance isn't optional.

If (hours saved + subscriptions dropped) is higher than the yearly cost of the build spread over two or three years, the numbers work. If they don't work even when you're being generous, stick with off-the-shelf and run the sums again in a year.

Some things don't fit in the formula and still count: errors avoided because nobody copies data by hand, customers you don't lose because the reminder arrived on time, or offering something your competitors can't. Add them in, but don't use them to paper over numbers that don't add up.

## Quick comparison

| | Off-the-shelf | Custom |
|---|---|---|
| Getting started | Immediate | Weeks or months |
| Upfront cost | Low | High |
| Ongoing cost | Per-user or plan fee | Maintenance and hosting |
| Fit with your process | The average case | Yours |
| Who holds the data | The vendor | You |
| Changes | When the vendor decides | When you ask |

## The middle option worth checking first

Before building anything, ask whether the problem is the tool or the fact that your tools don't talk to each other. It's often the second one. Connecting bookings to invoicing, or your shop to your stock sheet, can be done with native integrations, with tools like Zapier or Make, or with a small custom piece that uses each service's API. I go into it in [how to connect your tools](/en/blog/integrar-herramientas-negocio).

Same with repetitive tasks: you don't need a whole application for a report to land in your inbox every Monday. [Tasks your business can automate](/en/blog/automatizar-tareas-negocio) has concrete examples.

And if your current "system" is a shared spreadsheet nobody dares touch any more, that's another classic. The warning signs are in [from Excel to an app](/en/blog/de-excel-a-aplicacion).

## What building custom software has taught me

In my day job at AMS Solutions, inside the Inditex ecosystem, I build internal applications used by thousands of people every day, with React on the front end and Java 21 and Spring Boot 3 microservices behind it. One of those pieces was a BFF, a layer that gathers what the application needs from several services, and it cut response times by 40%. In the same role we raised test coverage from 60% to 85%.

Why mention that in a guide for small businesses? Because what separates custom software that lasts from custom software that becomes a headache is the same at any scale: a few well-separated pieces, tests on what matters and documentation so someone else can carry on. If someone offers you a custom build, ask how they'll test it and who could maintain it if they disappeared. The answer tells you a lot.

## What I'd do in your position

First, spend two weeks writing down every repetitive task and how long it takes. Without that, any decision is guesswork.

Second, check whether your current tools have integrations or an API you're not using. It's the cheapest fix.

Third, if the problem is still there and the numbers work, start with the part that hurts most, not the whole system. A small first version that works tells you far more than a year-long project on paper.

If you'd like to look at it together, [custom software](/en/services/custom-software) explains how I work: a fixed quote before we start, delivery in phases, and you choose between options with their cost. Or [get in touch](/en#contacto) with your case and I'll reply within 48 hours.
