---
title: "Scheduling multiple staff: hours, rooms and services"
seoTitle: "Multi-Staff Scheduling: Hours, Rooms and Services"
date: "2027-06-22"
excerpt: "How to set up a booking system when each practitioner has their own hours, services and rooms, without double bookings or wasted gaps."
tags: ["Online bookings", "Appointments", "Small business", "Organisation"]
---

The classic failure goes like this: two practitioners free at five, two customers book at five… and there's only one treatment room. Each diary, on its own, was perfect. The problem is that nobody told the system both appointments needed the same room. Multi-staff appointment scheduling isn't about opening one column per person. It's about telling the system what has to be available for each appointment to actually happen.

## Think in resources, not just people

The most useful way to look at it: every appointment uses up resources for a period of time. A resource can be:

- A practitioner.
- A room or treatment cubicle.
- A piece of equipment that can't be in two places at once.

Each service says which resources it needs. A massage needs a physio and a treatment table. A consultation needs a doctor and any free office. A laser treatment needs someone trained to use it, the laser, and the room it lives in.

Once that's defined, the system can answer the question that matters: at this time, are all the resources this service needs free at once? If so, it offers the slot. If not, it doesn't show it.

## Who does what

Not everyone does every service. Start with a simple table: each practitioner and the services they can provide. It sounds trivial, but it's where most mistakes creep in when things are set up in a hurry, and the result is a customer booked with someone who doesn't do that treatment.

From there, decide how customers book:

- They pick the practitioner: makes sense when there's a personal relationship or very different specialities.
- They pick only the service and the system assigns whoever is free: fills the diary better and is easier for people with no preference.

The usual answer is to offer both: "with someone specific" or "with anyone". Booking by practitioner builds loyalty; "anyone" avoids dead gaps.

## Staff scheduling: what changes every week

Each practitioner has a base schedule (Monday and Wednesday mornings, Thursday afternoons) and exceptions: holidays, training, an afternoon off, a local bank holiday. If those exceptions are handled outside the system, in a group chat or each person's own calendar, your online diary will end up offering slots that don't exist.

That's why I'd keep absences inside the system itself, and if each practitioner already lives in Google Calendar, sync it so a personal appointment blocks the slot automatically. How to do that, and what to check first, is in [how to sync bookings with Google Calendar](/en/blog/sincronizar-reservas-google-calendar).

## The time nobody sees

A service's duration isn't just the time with the customer. You need to account for:

- Prep before: setting up the room, warming up equipment, reading the notes.
- Buffer after: cleaning, disinfecting, writing up.
- Resources that free up before the person does, or the other way round: the room is free but the practitioner is still writing a report for another ten minutes.

If the system doesn't understand these, they get added by hand, or appointments get stacked back to back and by mid-afternoon everything is running twenty minutes late. Sound familiar?

## Never book the same slot twice

This bit is technical, but it matters. If two customers book the last Saturday slot at the same moment, the system has to guarantee only one of them gets it. Checking "it's free" and then saving isn't enough; the other booking can sneak in between those two steps.

Postgres, the database I use in my projects, lets you put that rule in the database itself: two appointments can't use the same resource in overlapping time ranges, and if anything tries, the database refuses. **I want that guarantee written into the database**, because code changes and the rule has to stay put.

## Show the diary the way people work

The admin view matters too. Reception needs everyone's day at a glance, in columns by practitioner or by room. Each practitioner, on the other hand, wants their own diary and not much else, ideally on their phone. If the view doesn't match how people work, they'll go back to paper.

If you run a clinic, there's more to take care of (patient records, permissions, health data), and I cover it in [online scheduling for clinics](/en/blog/agenda-online-clinicas).

## Where to start with multi-staff appointment scheduling

Before touching any tool, make three lists on one sheet: practitioners and their services, rooms and equipment, and what each service needs. If those lists fit into an off-the-shelf tool, great. If they don't, you'll know exactly what to ask of a custom system. If you're still taking bookings by phone, start with [from phone and WhatsApp to online bookings](/en/blog/pasar-citas-a-reservas-online).

And if you'd like a hand building it, my [online booking system](/en/services/online-booking-system) page explains how I work. Or [get in touch](/en#contacto) with those three lists and we'll take a look.
