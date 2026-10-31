---
title: "Structured data for local businesses: what it is and how to use it"
seoTitle: "Structured Data for Local Businesses: A Practical Guide"
date: "2027-03-23"
excerpt: "What schema markup is, which types suit a restaurant, a clinic or a shop, and how to check that Google reads it correctly. A practical guide."
tags: ["SEO", "Local SEO", "Structured data", "Google"]
---

When I built the service pages for this website, I had to decide how to explain to Google what I am. I'm not a shop and I don't have premises with a shutter: I'm a developer who works in Santander, across Cantabria and remotely. A person gets that by reading the site. Google is better off being told in its own language. That's what structured data for a local business is for.

It's a block of code visitors don't see that describes your business so a machine doesn't have to guess anything: name, type of business, address, opening hours, phone, services. I mentioned it briefly in my [local SEO guide](/en/blog/seo-local-negocios); this is the practical part.

## What structured data does for a local business (and what it doesn't)

What it does: remove ambiguity. If your site says "Open 9 to 2 and 5 to 8" in a paragraph, Google will probably understand. If it also says so in structured data, there's nothing to interpret. Same with your address, business type or the area you cover. Some types can also earn rich results in Google: recipes, events, products with price and availability, breadcrumbs instead of the URL.

What it doesn't: push you up the rankings by magic. Google has said many times it isn't a direct ranking factor. Nor will it put star ratings next to your business in search results: Google doesn't show them when a business marks up reviews about itself. If someone sells you that, be wary.

My take: for a local business it's cheap to get right and it's rarely wasted. That's why it's one of the first things I check on any website.

## The format: JSON-LD and Schema.org

The standard vocabulary is Schema.org, and the format Google recommends is JSON-LD: a block of text inside the page, separate from the visible content. For a restaurant, a minimal version would look like this:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Casa Example",
  "url": "https://casaexample.com",
  "telephone": "+34 942 000 000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 Example Street",
    "addressLocality": "Santander",
    "postalCode": "39001",
    "addressCountry": "ES"
  },
  "servesCuisine": "Cantabrian",
  "menu": "https://casaexample.com/menu",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "13:00",
    "closes": "16:00"
  }]
}
```

The golden rule: everything you put here has to match what's visible on the page and on your Google profile. If your structured data says one set of hours and your profile says another, you've created exactly the ambiguity you were trying to remove.

## Which LocalBusiness schema type fits your business

LocalBusiness is the generic type, but it's worth using the most specific one available. Some examples:

| Business | Schema.org type | Properties worth adding |
| --- | --- | --- |
| Restaurant, bar, café | `Restaurant`, `BarOrPub`, `CafeOrCoffeeShop` | `servesCuisine`, `menu`, `acceptsReservations` |
| Dental or physio clinic | `Dentist`, `MedicalClinic`, `Physiotherapy` | `medicalSpecialty`, opening hours |
| Hairdresser, beauty salon | `HairSalon`, `BeautySalon` | opening hours, services |
| Physical shop | `Store` or a specific one (`ClothingStore`, `BookStore`…) | opening hours, `priceRange` |
| Professional without premises | `ProfessionalService` | `areaServed` instead of a full address |

The last one is me. This website uses `ProfessionalService` with the area I work in (Santander, Cantabria and Spain) and no street address, because I don't see clients at premises. Each service page also carries its own `Service` block stating what I offer and who offers it. That way Google doesn't have to work out that "booking systems" and "online stores" are services from the same business.

If you sell online, it's a different story: product data (price, availability, ratings) takes over, and I cover that in [SEO for online stores](/en/blog/seo-tiendas-online).

## How to check Google reads it correctly

Three tools, all free:

- Google's Rich Results Test: paste the URL and it shows which structured data it finds and whether anything has errors.
- The Schema.org validator (validator.schema.org): stricter about the vocabulary, useful for types Google doesn't turn into rich results.
- Google Search Console: once the site is live, it flags structured data errors it finds while crawling.

Run them whenever you change the site, not just on launch day. A template change can wipe out the block without anyone noticing.

## How to add it depending on your website

On WordPress, the well-known SEO plugins generate basic structured data; check which type they set by default, because it's often a generic one that doesn't describe you. On Shopify or Wix it depends on the theme. On a custom website you (or whoever builds it) write it and control every field, which is what I do. And if the site loads fast too, all the better: structured data helps Google understand you, but [site speed](/en/blog/web-rapida-mejor-seo) decides whether the visitor stays.

## Where I'd start

Run your homepage through the Rich Results Test. If no local business type shows up, you know what's missing. If a generic one does, swap it for the most specific type and add an address, hours and phone number that match your Google profile.

If you'd rather I checked it, or want a website that ships with it built in, see how I work in [business websites](/en/services/business-websites). Or [get in touch](/en#contacto) and we'll take a look.
