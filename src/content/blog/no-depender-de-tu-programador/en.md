---
title: "How not to depend on your developer: code, access and documentation"
seoTitle: "How Not to Depend on Your Developer: Code and Access"
date: "2027-08-24"
excerpt: "Repository, domain, hosting, accounts and documentation in your name: what to ask for when you commission software so any developer could pick up the work."
tags: ["Custom software", "Small business", "Intellectual property", "Guide"]
---

The developer who built your website or app has stopped replying. Maybe they changed jobs, closed up shop or just don't have time. And you find out the domain is in their name, you don't know where the site is hosted and the code is "on their machine". If you've been through it, you know software source code ownership and account access aren't a legal footnote. They decide whether your business can carry on without that person.

I say this as a developer: the healthy setup is one where you could let me go tomorrow and someone else could pick up the work without losing anything. This is the list I'd ask for if I were on your side of the table.

## Software source code ownership: where it lives and who owns it

These are two different questions, and you want both answered.

Where it lives. Your project's code should sit in a repository (GitHub, GitLab or similar) under an account or organisation that belongs to you, with your email, where you're the owner and the developer is a guest with permissions. If they stop working with you, you remove their access and the code stays put, with its full history.

Who owns it. This is where intellectual property comes in. If you commission software from a freelancer or an outside company rather than an employee, don't assume the rights are yours just because you paid. In many jurisdictions, including Spain, the UK and the US, a contractor generally keeps the copyright unless it's assigned in writing. The safe move is for the contract or accepted quote to state that the rights to the code built for you are assigned or licensed to you. If you're unsure about your situation, ask a lawyer; one well-written paragraph saves you a serious headache.

A fair caveat: many developers use their own building blocks or open-source libraries they reuse across projects. Those can't be handed to you exclusively, and that's fine, as long as you have a licence to keep using them.

## Developer handover: domain, hosting and accounts

What isn't code matters too, often more. All of this should be in your name, with your email and your card:

- The domain. It's your address on the internet; if it isn't in your name, it isn't yours. More on that in [domain, hosting and SSL for your business](/en/blog/dominio-hosting-ssl-negocio).
- The hosting or server, and the database.
- Third-party services: transactional email, payment provider, sign-in, analytics, maps.
- If there's a mobile app, the Apple and Google Play developer accounts. Publishing an app under someone else's account is one of the most expensive mistakes to undo; I explain how to do it properly in [how to publish your app on the App Store and Google Play](/en/blog/publicar-app-app-store-google-play).

The developer can have access as an invited user or with their own role, but the main account is yours. And passwords belong in a shared password manager, not in an email from two years ago.

## Software documentation: the minimum you should have

You don't need a hundred-page manual. For another developer to carry on, this is enough:

- A README in the repository: what the project is, how to run it locally and how to deploy it.
- Which third-party services it uses, what for and which account they're in.
- The configuration variables it needs (without the secret values, which live elsewhere).
- The odd decisions explained. If something was done in a non-obvious way, one line on why.

In my day job at AMS Solutions, where several teams work on the same ecosystem, this isn't optional: if it isn't documented and tested, whoever comes next spends days guessing. Tests are documentation too: they say what the code is meant to do and flag it when someone breaks it. A project with good test coverage is far easier to inherit.

## How to ask without sounding suspicious

It won't sound suspicious if you raise it before you start. A good developer shouldn't object to anything on this list; in fact, it makes my life easier when a client has their accounts in order. If someone pushes back on the code or domain being in your name, that pushback is information in itself.

Three things I'd get in writing before work starts:

1. The repository and accounts are created in the business's name from day one.
2. The rights to the custom code are assigned to you.
3. A final handover with the minimum documentation above.

This applies equally to a [business website](/en/services/business-websites), a [mobile app](/en/services/mobile-app-development) or an admin panel. If you're still deciding whether something built for you is worth it, start with [custom or off-the-shelf software](/en/blog/software-a-medida-vs-estandar).

## If you already depend on someone

No need for drama. Ask, politely, for the domain to be transferred and for owner access to the hosting and the repository. Do it while the relationship is good; it's much easier than when they've stopped replying.

If you'd like me to look over your setup, or want your next project to start this way, [custom software](/en/services/custom-software) explains how I work. Or [get in touch](/en#contacto) and we'll take a look.
