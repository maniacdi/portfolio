---
title: "GDPR for online bookings and customer records: the basics"
seoTitle: "GDPR for Online Bookings and Customer Records: The Basics"
date: "2027-08-03"
excerpt: "What data to ask for, where to store it, who can see it and how long to keep it: the essentials for a business taking bookings online."
tags: ["Online bookings", "GDPR", "Privacy", "Small business"]
---

Every time someone books an appointment on your website, they leave you at least their name, their phone number or email, and what they're coming in for. At a hair salon, that's not much. At a clinic, the fact that someone booked a specific treatment is already health data. Getting GDPR for online bookings right isn't paperwork you do once: it's a set of decisions made while designing the system. When I built the diary and patient records for Ū Medicina Estética, that side of things weighed as much as the diary itself.

A warning before we start: I'm a developer, not a lawyer. This is what I take into account when building a booking system, and you should have a professional review it for your case.

Let's follow a booking's data from the moment it comes in to the moment it's deleted.

## GDPR for online bookings starts with asking for less

The principle is called data minimisation and it's common sense: if you don't need someone's date of birth to give them an appointment, don't ask for it. Name, one way to contact them and the service are usually enough.

Next to the booking button, a short note saying who handles the data, why, and where to read more, with a link to your privacy policy. Your website's legal pages (legal notice, privacy, cookies) are a separate topic, covered in [the legal requirements for a business website](/en/blog/requisitos-legales-web-negocio).

And one checkbox that's often done wrong: you don't need the customer's consent to manage the appointment, because the appointment is what they asked you for. You do need it to send them promotions, and that's a separate checkbox, unticked by default.

## Health data goes in its own box

If you run a clinic, a physio practice or anything similar, patient data protection goes up a level. Under data protection law (GDPR in the EU), health data is a special category, with stricter requirements on security, access control and documentation. Among other things, you'll need to keep a record of processing activities even if you're a small business.

For a booking system, that means: the email reminder doesn't name the treatment, neither does the event title in a shared calendar, and clinical notes don't travel over WhatsApp. I go into more detail for clinics in [online scheduling for clinics](/en/blog/agenda-online-clinicas).

## Where it's stored: your providers count too

Customer data almost never lives only with you. It's on your hosting, in your database, with the service that sends your emails, on the booking platform if you use one. Each of those providers is a data processor, and with each one you need a contract that covers it. The big ones already have it ready (usually called a DPA, a data processing agreement); it's a matter of finding it and accepting it.

Check where they store the data, too. If it leaves the European Economic Area, extra safeguards are required. When I pick providers for a system with sensitive data, I prefer those that let you pin the region to Europe.

## Who can see it

**At a small business, the most likely data leak is a shared password.**

The minimum I ask of a booking dashboard:

- One user per person, never shared accounts.
- Permissions by role: reception sees the diary and contact details; notes are only for whoever needs them.
- Two-step verification to log in.
- Remove access on the same day someone stops working with you.

At Ū, access to the panel goes through Clerk, a dedicated authentication service.

## How long to keep it

Data is kept for as long as it's needed for the purpose it was collected for, plus whatever the law requires.

Some of these periods aren't yours to decide. Medical records, for example, often have minimum retention periods set by national health law, and invoices have their own for tax purposes. Set your retention periods with your adviser and let the system help you stick to them: deleting or anonymising only what has expired.

## When a customer asks for their data, or for it to be deleted

Any customer can ask what data you hold on them, ask you to correct it or ask you to delete it (except what you're legally required to keep). You have one month to respond. If your system lets you look up a customer and export or delete their data from the dashboard, it's a five-minute job. If it's scattered across a paper diary, WhatsApp and three spreadsheets… not so much.

## If something goes wrong

If there's a security breach (unauthorised access, a stolen laptop with data on it, emails sent to the wrong people) and it poses a risk to the people affected, you have to notify your data protection authority within 72 hours.

## Where I'd start

Make a list of where each piece of customer data lives today: forms, email, WhatsApp, diary, spreadsheets. If you're moving from a paper diary to a digital one, it's the best moment to get this right from the start, as I explain in [from phone and WhatsApp to online bookings](/en/blog/pasar-citas-a-reservas-online).

My [online booking system](/en/services/online-booking-system) page explains how I design booking systems with data protection built in from the start, and if you need something broader, there's [custom software](/en/services/custom-software). Or [get in touch](/en#contacto) and I'll reply within 48 hours.
