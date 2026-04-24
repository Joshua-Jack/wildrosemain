# How to upload products to the Wild Rose website

This is for whoever is adding products to Shopify. You don't need to touch any
code — everything on the site (categories, badges, athlete gear) is controlled
by **tags** you add in the Shopify admin. This guide walks you through exactly
which ones to use.

> If in doubt: add the product like normal, add the right tags from the tables
> below, publish. The website picks it up automatically within about a minute.

---

## Part 1 — The basic product

When you create a product in Shopify, fill out these fields like you normally
would:

- **Title** — the product name (e.g. `Pro Tour Snapback`).
- **Description** — the write-up that appears on the product page. Use short
  bullet points on separate lines if you want features listed; the site will
  pull them out automatically.
- **Media** — upload 3–6 product photos. The first one is used as the main
  image on the shop grid; the rest show up in the gallery on the product page.
- **Pricing**
  - **Price** — normal price.
  - **Compare-at price** *(optional)* — if you fill this in, the site shows a
    strikethrough and a "sale" treatment. Example: Price $30, Compare-at $40.
- **Inventory / Quantity** — Shopify's normal stock tracking. Out-of-stock
  items show as "Sold out" on the site automatically.
- **Variants** — if the product has sizes or colors, add them as options:
  - The option name **must** be spelled `Size` or `Color` (capital letter, no
    extra words). Anything else won't be picked up.
  - Add every size/color combo as a variant.

That alone will publish a working product. The next parts are about making it
show up in the right places.

---

## Part 2 — Putting it in the right category

The shop page has four categories:

| On the site | Tag to add |
|---|---|
| Headwear | `category:headwear` |
| Tops | `category:tops` |
| Outerwear | `category:outerwear` |
| Bottoms & Accessories | `category:bottoms-accessories` |

**Add the tag in the "Tags" box on the product page** (same place you'd add
any Shopify tag). You only need one category tag per product.

If you forget the tag, the site falls back to whatever you typed in the
"Product Type" field, so setting Product Type to `headwear` / `tops` /
`outerwear` / `bottoms-accessories` works too. The `category:` tag is the
safer option.

---

## Part 3 — Making things pop

These are optional tags you can add on top of the category tag.

| What it does | Tag |
|---|---|
| Shows a **"New"** badge and puts the product in the "New Arrivals" strip on the home page | `new` |
| Puts the product in the **"Featured"** strip | `featured` |
| Adds a specific **feature bullet** on the product page (e.g. "Recycled cotton", "Adjustable brim"). Add one tag per bullet. | `feature:Recycled cotton` |
| Overrides the small grey **subtitle** on cards (by default it uses Product Type) | `subtitle:Limited run` |

You can combine them. A new, featured product in Tops might have these tags:

```
category:tops, new, featured, feature:Recycled cotton, feature:Pre-shrunk
```

---

## Part 4 — Tagging gear for a specific athlete

When a product is a signature item tied to one athlete on the team, add the
**athlete tag**. The format is always:

```
athlete:<their-slug>
```

The slug is their name in lowercase, with spaces replaced by dashes. Use the
exact one from the list below — typos won't match.

### Current athlete slugs

**All Star**
- `athlete:dallas-garber`
- `athlete:emily-weatherman`

**Athlete**
- `athlete:brian-johnson`
- `athlete:daniel-kitchens`
- `athlete:kurtis-kloke`
- `athlete:shade-harrison`
- `athlete:ty-rooper`
- `athlete:zachary-crist`

**Reserve**
- `athlete:anthony-hammerschmith`
- `athlete:casey-blum`
- `athlete:collin-hayden`
- `athlete:gina-canlas`
- `athlete:jace-knapp`
- `athlete:joe-coulter`
- `athlete:justin-anderson`
- `athlete:sam-benson`
- `athlete:tyee-rilatos`

**Recruit**
- `athlete:ander-wake`
- `athlete:chelsi-taylor`
- `athlete:cody-waldron`
- `athlete:evan-bennett`
- `athlete:han-thu-white-duong`
- `athlete:joshua-winter`
- `athlete:kamdan-wilson`
- `athlete:meghan-field`
- `athlete:michael-malisiki`
- `athlete:topher-hunt`

A product **can** have both category tags and an athlete tag. That way it
shows up in the main shop **and** on that athlete's page once the team store
goes live.

---

## Part 5 — Full example

Let's say you're adding Dallas Garber's new signature snapback. Here's every
field you'd fill in:

| Field | Value |
|---|---|
| Title | `Pro Tour Snapback — Dallas Garber` |
| Description | `Battle-tested on tour.` *(plus bullets on new lines)* |
| Media | 5 product photos |
| Price | `$40.00` |
| Compare-at | `$50.00` |
| Variants → Size | `One Size` |
| Variants → Color | `Black`, `Olive` |
| Product Type | `headwear` |
| Tags | `category:headwear`, `athlete:dallas-garber`, `new`, `feature:Pre-curved brim`, `feature:Adjustable snap closure` |

Hit Save, make sure the product is **published to the "Online Store" sales
channel** (Shopify's default), and the site will pick it up within a minute.

---

## Quick checklist before you publish

- [ ] Title, description, at least one image
- [ ] Price (and compare-at if it's on sale)
- [ ] Size / Color variants if applicable (exact capitalization: `Size`, `Color`)
- [ ] One `category:*` tag
- [ ] `new` and/or `featured` tag if it should be highlighted
- [ ] `athlete:<slug>` tag if it's signature gear
- [ ] `feature:*` tags for bullets on the product page (optional)
- [ ] Product is **active** and published to the Online Store sales channel

---

## Troubleshooting

**"I added the product but it's not showing up."**
Make sure it's **Active** (not Draft) and published to the **Online Store**
sales channel. Also give it a minute — the site caches for about 60 seconds.

**"It's showing up in the wrong category."**
Check the `category:*` tag for typos. Only `category:headwear`, `category:tops`,
`category:outerwear`, and `category:bottoms-accessories` are recognized.

**"The sizes/colors aren't appearing."**
The option name must be exactly `Size` or `Color`. Not `size` (lowercase),
not `Sizes`, not `Shirt size`. Edit the variant option name and the site will
pick it up.

**"The athlete tag isn't linking to the athlete."**
Slugs have to match *exactly*, including dashes. Use the list in Part 4.

**"Nothing updates on the site even after an hour."**
Ping whoever manages the deploy — a Vercel redeploy may be needed if the cache
didn't refresh. Usually it just works.
