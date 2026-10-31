---
title: "From Excel to an app: when your spreadsheet isn't enough"
seoTitle: "From Spreadsheet to App: When Excel Isn't Enough"
date: "2027-03-09"
excerpt: "Copy-paste errors, duplicate versions and nobody knows which file is right: signs your spreadsheet should become an app and how to make the move."
tags: ["Custom software", "Excel", "Small business", "Databases"]
---

`orders_2027_FINAL_v3_good_Sarah.xlsx`. If there's a file with a name like that in your shared folder, you already know what this post is about. The need to replace Excel with an app creeps up quietly, without anyone saying it out loud, until a copy-paste mistake costs someone money.

First, a word in defence of Excel. It's probably the most useful business tool ever made. Almost everything that's an app today started life as a spreadsheet, and that's fine. Using it isn't the problem. Using it for a job it has outgrown is.

## The classic mistake: fixing Excel with more Excel

When the sheet starts to creak, the natural reaction is to add things. A new tab for history. A colour-coded "status" column. A macro someone wrote years ago that nobody understands. Data validation that people bypass by pasting. Each patch sort of works, and the file grows until only one person knows how to use it.

If that person goes on holiday and the business suffers, the spreadsheet has stopped being a tool and become a risk.

## Signs you're outgrowing Excel

You don't need all of them. Two or three are enough to start thinking about it:

- There are several versions of the same file and nobody knows which one is right.
- Several people need to edit at once and overwrite each other's changes.
- You copy the same data (customer name, product code) across several tabs or files.
- You need to know who changed what and when, and there's no way to tell.
- Some data shouldn't be visible to everyone, but the sheet is all or nothing.
- It's become slow, or it breaks when someone sorts one column without selecting the rest.
- You need something to happen automatically (an alert, an email) when a value changes.

The one that matters most is permissions, especially with personal data. Under data protection law (GDPR in the EU), keeping customer records in a file anyone can download and forward is a problem that goes well beyond convenience.

## Moving from spreadsheets to a database: what you gain

The underlying difference is that an app stores each piece of data once. The customer exists in one place; orders point to them. If their phone number changes, it changes everywhere. That's what a database does, and it's exactly what a spreadsheet doesn't do well.

On top of that, an app gives you:

- Forms that won't let you type a date where an amount should go.
- Users with permissions: who sees what and who can edit.
- A history of changes.
- Searches and filters that don't break anything.
- Access from your phone without squinting at a tiny grid.

For many businesses that ends up being their own admin panel. I explain what one is and what it can do in [custom admin panels](/en/blog/panel-de-gestion-a-medida).

## Before you build: there are in-between steps

You don't always need an app built for you. Some tools are half spreadsheet, half database (Airtable, Notion and the like) and solve the version and basic permission problems without any code. And for standard processes like invoicing or bookings, there's software that already exists and works well.

I compare the options in more depth in [custom or off-the-shelf software](/en/blog/software-a-medida-vs-estandar). My view: if your spreadsheet is really a CRM or an invoicing tool in disguise, use a real one. If it's something specific to you that no tool handles without forcing it, that's when a custom app makes sense.

## How to replace Excel without throwing away what works

If you decide to make the move, this is the order I follow:

1. Understand the sheet. Which tabs are actually used, who touches what, and which formulas are business rules (those have to survive).
2. Clean the data. Duplicate customers, dates written five different ways, cells with comments where a number should be. It's the most boring part and the one that takes longest.
3. Start with what hurts most. You don't have to migrate everything on day one. If orders are the problem, do orders first.
4. Import the history and run both for a few weeks. The new app with real data, and the spreadsheet in read-only mode, just in case.
5. Keep an export to Excel. People will still want to pull data out to do their own sums, and that's fine. An app that won't let you export is just another cage.

## Where to start

Open your most important spreadsheet and write down who uses it, what for and what went wrong in the last month. If the list is short, tidying up the file may be enough. If it's long, you've already done half the analysis.

[Custom software](/en/services/custom-software) explains how I approach these projects, in phases and with a fixed quote. Or [get in touch](/en#contacto), send me a description of your sheet (no real data) and I'll tell you what I'd do with it.
