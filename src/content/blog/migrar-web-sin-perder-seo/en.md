---
title: "How to switch websites without losing your Google rankings"
seoTitle: "Website Migration: How to Relaunch Without Losing Rankings"
date: "2027-07-27"
excerpt: "Redirects, URLs, metadata and Search Console: the checklist for launching a new website without losing the search traffic you already had."
tags: ["SEO", "Web development", "Small business", "Guide"]
---

You launch your new website. Better looking, faster, new photos. For two weeks all is well, then the phone starts ringing less. You check Google and your "sports physio" page, the one that sat near the top for years, has gone. People clicking the old result land on a 404 error.

That's what happens when you switch websites without thinking about what was already working. The good news: website migration SEO is mostly a matter of order. A checklist, and not skipping steps.

## Before you touch anything: the inventory

First, find out what you have. Not just the pages you see in the menu, but every URL Google knows about and that gets visits.

- Export the pages with clicks over the last few months from Google Search Console. Those are the ones you can't afford to lose.
- Get the full list of URLs: the current sitemap, a crawl of the site or, failing that, by clicking through it by hand.
- Note the title and description of your best-performing pages. If the new site changes them for no reason, it also changes what Google understands about them.

If at this point you discover Search Console isn't connected, connect it now, before the migration. You'll need it to compare before and after.

## 301 redirects: the backbone of website migration SEO

This is the step most often skipped, and the one that does the most damage. Every old URL needs to point to its equivalent on the new site with a 301 redirect, which tells Google "this has moved here permanently" and passes on what that page had earned.

A redirect map is literally a two-column table: old URL, new URL. Some rules:

- Each page to its closest equivalent. Redirecting everything to the homepage is almost the same as deleting it: Google treats it as if the page had disappeared.
- Permanent redirects (301 or 308), not temporary ones.
- No chains: if URL A went to B and B now goes to C, point A straight at C.
- If an old page has no equivalent and got no visits, it can return a 404 without drama.

If you can keep the URLs that already work, even better. A URL that doesn't change doesn't need redirecting.

## What gets lost along the way without anyone noticing

Besides URLs, there are things that quietly break in a migration:

- Titles and meta descriptions, which revert to "Home" or the template name.
- Service page copy. If the page that ranked had 600 useful words and the new one has three lines and a photo, you'll lose rankings even if the redirect is perfect.
- Structured data that the previous developer had added and the new template doesn't include.
- Internal links still pointing to old URLs.

And the classic: the `noindex` tag added while the site is in testing so Google doesn't see it… and left in place on launch day. That's asking Google to drop you from the results. It happens more often than you'd think.

## Changing domain: one more step

If you're also changing domain (say from yourbusiness.co.uk to yourbusiness.com), the list grows:

- 301 redirects from every URL on the old domain to the new one, page by page.
- The Change of Address tool in Search Console, with both domains verified.
- Don't let the old domain expire. Google recommends keeping redirects for at least a year; I'd keep them much longer, because there are links and printed cards out there you'll never be able to change.
- Update the link on your Google Business Profile, social media and any directories you're listed in.

## Launch day and the weeks after

On the day it goes live:

- Check ten important old URLs by hand. Each should land on the new page in a single hop.
- Make sure no `noindex` is left and robots.txt isn't blocking anything that should be visible.
- Submit the new sitemap in Search Console.
- Check your analytics is still tracking.

In the following weeks, watch Search Console for 404 errors and pages losing clicks. Some movement in the first weeks is normal. If an important page still hasn't recovered after four to six weeks, look at what changed on it.

## If you're thinking about a new website

Before deciding, it's worth knowing whether you really need one: in [when to redesign your business website](/en/blog/cuando-redisenar-web) I go through the signs I'd look for. And if the switch involves moving off WordPress (or onto it), [custom website vs WordPress](/en/blog/web-a-medida-vs-wordpress) has the comparison.

If I'm replacing a site, the inventory and redirects are the first things I prepare: it's the unglamorous part that stops you losing what you already had. The local side of all this is in my [local SEO guide](/en/blog/seo-local-negocios). If you're about to switch websites and want to do it carefully, see how I work in [business websites](/en/services/business-websites), or [get in touch](/en#contacto) and we'll go through your case.
