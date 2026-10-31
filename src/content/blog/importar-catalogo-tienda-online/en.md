---
title: "How to import and update your store catalogue automatically"
seoTitle: "How to Import and Update Your Catalogue Automatically"
date: "2027-08-10"
excerpt: "CSV, API or scripts: ways to load hundreds of products and keep prices and stock up to date without doing it by hand, with the Ū Skin Store example."
tags: ["Shopify", "E-commerce", "Automation", "Online store"]
---

At [Ū Skin Store](/en/projects/uskinstore), nobody adds products from the Shopify admin. The catalogue lives in a spreadsheet the clinic maintains, and Python scripts turn it into the files that get uploaded to the store. If a price changes, it's changed in the spreadsheet and uploaded again. Setting it up this way costs more at the start than entering products by hand, but every update after that is almost free. If you're planning to bulk import products to Shopify (or any other store), here's what I've learnt.

## Three ways to bulk import products to Shopify

From least to most automated:

The platform's own CSV. Shopify has a CSV template for products: one row per variant, with title, price, stock, photos and so on. You upload it from the admin and it creates or updates the products. For a one-off bulk load with a simple catalogue, it's enough and it costs nothing.

An import app. When you need more than the basic CSV supports (metafields, collections, importing straight from Excel, or exporting and reimporting the whole catalogue), there are specialised apps. Matrixify is the best known one for Shopify. If your plan limits the rows per import, split the catalogue into numbered batches and upload them in order.

The API. Shopify, like any serious platform, has an API to create and update products from a program. It's the option when the information lives in another system (your supplier's, your management software, your till) and you want the store to update itself, without anyone uploading files.

## The rule that holds it together: a single source of truth

Whatever you choose, decide where the catalogue lives. If it's the spreadsheet, everything changes in the spreadsheet. If it's your management software, everything changes there.

What happens otherwise: someone creates a product by hand directly in Shopify "because it was urgent". That product exists and sells, but the next import doesn't know about it, so it never gets updated and the count is always one off without anyone knowing why.

## The problems nobody warns you about

Importing is easy. Reimporting without breaking anything is the hard part. This is what I ran into:

- **Imports match products by their URL**, and in Shopify the URL comes from the name. If someone renames a product, the next import doesn't recognise it: it creates a new one and leaves the old one orphaned, photos and all, with no error. That's why the scripts keep a map of fixed URLs.
- If a photo hasn't been uploaded when its product is imported, the product goes in without a photo. No warning either.
- When you change how products are grouped (at Ū Skin Store, the shades of a cream went from being separate products to variants of a single one), the old products stay in the store as orphaned drafts. You have to find them and remove them.

What I do by default now: a test batch before uploading the rest, an "undo" file for every risky change in case it goes wrong, and a full export of the store before deleting anything. Better safe than sorry.

## How to sync stock automatically

Prices and descriptions change rarely. Stock changes with every sale. If you also sell over the counter, the challenge is getting the website and the physical shop to agree.

Your options, depending on where you keep inventory today:

- If you use the platform's own point of sale (Shopify POS, for example), they share inventory and there's nothing to sync.
- If your supplier gives you a file or an API with their stock, a scheduled script can read it every night and update the store.
- If you keep inventory in management software, it can be connected to the store's API both ways: what sells online is deducted there, and vice versa.

## When it's worth automating your product catalogue updates

If you have fifty products that change twice a year, upload them by hand or with the CSV and spend the time on photos instead. If you have hundreds, several brands or prices that change every season, a script pays for itself by the second update. It's the same rule I describe in [automating tasks in your business](/en/blog/automatizar-tareas-negocio): if it's repetitive and has clear rules, let a program do it. And if the catalogue lives in another tool, the question becomes how to [integrate your business tools](/en/blog/integrar-herramientas-negocio) so they talk to each other.

## Where I'd start

Before thinking about scripts, put the catalogue in order in a spreadsheet: one row per variant, brands and categories always spelled the same way, and a column with each photo's URL. That file already works for Shopify's native import, and if you ever want to automate it, it's exactly what a script needs. If you're still choosing your store, start with [how to start an online store](/en/blog/como-montar-tienda-online).

Loading and updating the catalogue is part of what I do in [online store development](/en/services/online-store-development), and if the syncing goes beyond the store, see [custom software](/en/services/custom-software). Or [get in touch](/en#contacto) and tell me where your products live today.
