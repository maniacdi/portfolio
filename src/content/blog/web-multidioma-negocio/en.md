---
title: "Multilingual websites: when your business needs one and how to do it right"
seoTitle: "Multilingual Websites: When Your Business Needs One"
date: "2027-08-31"
excerpt: "When it pays to offer your site in more than one language, why machine translation isn't enough and how to set it up so Google understands it."
tags: ["Web development", "Small business", "SEO", "Multilingual"]
---

Should my website be in English too? It's one of the questions that comes up most when a business is planning its site, especially in a town with tourism like Santander, where I work. The quick answer is "sometimes yes, sometimes no". The useful one is knowing when a multilingual website will bring you customers and when it's just extra work nobody reads.

I'm speaking from experience: this site is in Spanish and English, and so is the one I built for Ū Medicina Estética. Each has a different reason for being bilingual, and that's exactly the first thing to be clear on.

## When a multilingual website pays off (and when it doesn't)

It pays off if a real share of your customers search in another language. Some clear cases:

- Tourism and hospitality: hotels, restaurants in areas with overseas visitors, activities, holiday lets.
- Services that attract foreign residents: clinics, accountants, language schools, estate agents.
- Businesses that sell or work abroad.
- Professionals looking for clients in other countries, like me with the English version of this site.

It doesn't pay off, at least not at first, if your customers are local and speak your language. A hardware shop in a residential neighbourhood rarely needs a second language. Better one language, complete and up to date, than two half-finished.

A practical test: look at where your customers come from and which language they use when they call or write. If you already have a website, analytics will tell you which countries visitors come from and their browser language.

## Translating your business website: why machine translation isn't enough

The temptation is to install a widget that translates the site on the fly into forty languages. My take: it's almost never worth it.

- The quality shows. Unreviewed machine translation reads oddly, and for a business that signals carelessness right when you want to earn trust.
- Many of those widgets translate inside the visitor's browser, so Google doesn't see those versions as pages of their own and they won't rank in other languages.
- Google discourages publishing machine-translated content at scale without human review.

What works: use machine translation as a first draft if you like, then have someone fluent review and adapt it. Adapting isn't translating word for word. English searches aren't literal translations of Spanish ones, and examples, opening hours or payment methods may change depending on who you're talking to.

And choose what to translate. You don't need the whole blog. Sometimes the service pages, the contact page and the homepage are enough.

## Hreflang SEO: setting it up so Google understands it

This is the technical part, and it's the part most often done wrong.

Each language gets its own URL. The cleanest option is usually a subfolder: yourbusiness.com for Spanish and yourbusiness.com/en for English. It's what I use on this site. What you want to avoid is a single URL that switches language based on a cookie or a button, because Google will only ever see one version.

Hreflang tags. These are a few lines in each page's code telling Google: "this page has an English version here and a Spanish one there". To work, they have to be reciprocal (every version points to the others and to itself), and it's worth adding a default version (x-default) for anyone who doesn't match. Hreflang is easy to break: all it takes is an English page pointing to a Spanish one that no longer exists.

No forced redirects by country. Detecting the browser language and suggesting the other version is fine. Sending someone to the English version without asking because their IP is foreign tends to annoy people, and it can stop Google crawling every version.

A visible language switcher that takes you to the same page in the other language, not back to the homepage.

Translated metadata too: each page's title and description, image alt text and structured data. It's easy to translate the content and forget what Google shows in the results.

## Who maintains each language

The part nobody plans. If you change a price in Spanish and not in English, you now have two websites saying different things. Before launching another language, decide who updates it and how. At Ū, for example, the site was bilingual from day one and the content is edited from its own back office, without having to ask anyone. You can see the project at [Ū Medicina Estética](/en/projects/umedicinaestetica).

## Where I'd start

Before translating anything, look at your data: where your customers are from and which language they speak. If there's a clear second language, start by properly translating the homepage, services and contact page, with hreflang set up from day one. The rest can wait. If you're building the site from scratch, [how to create a website for your small business](/en/blog/como-crear-pagina-web-negocio) has the general order.

If you want your website ready for more than one language without the SEO breaking along the way, see how I work on [business websites](/en/services/business-websites) or [get in touch](/en#contacto).
