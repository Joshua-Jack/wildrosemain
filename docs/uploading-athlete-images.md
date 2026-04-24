# How to add athlete images

Every athlete on the team page has a profile photo (and an optional photo
gallery on their individual page). These live in **Supabase Storage**, same
as the site's other editorial photos.

You'll do two things for each athlete:

1. Upload their image(s) to Supabase in a specific folder
2. Flip a switch in their profile file so the site starts using them

Both are fast. No code skills required.

---

## Part 1 — Where to upload

All athlete images go in the **`wildrosecollective`** bucket on Supabase,
inside a folder named exactly after that athlete's slug.

**Base location:**
```
wildrosecollective / athletes / <slug> /
```

The slug is the athlete's name in lowercase with spaces as dashes. Use the
exact slug from the list in `docs/uploading-products.md` — typos won't match.

### Files to upload

Inside `athletes/<slug>/`, place:

| Filename | What it is | Required? |
|---|---|---|
| `hero.jpg` | The main portrait / action shot. Shown big at the top of their profile page AND as their card image on the team page. | **Yes** (for the team page card) |
| `gallery-01.jpg` | First gallery photo | Optional |
| `gallery-02.jpg` | Second gallery photo | Optional |
| `gallery-03.jpg` | …and so on, zero-padded | Optional |

**Important filename rules:**
- Lowercase, hyphens only.
- Always `.jpg` (JPEG). Not `.jpeg`, not `.png`.
- Gallery files are numbered `gallery-01.jpg`, `gallery-02.jpg`, `gallery-03.jpg`, etc. — two-digit padding.

### Image specs

- **Hero:** roughly 3:4 portrait or 16:9 landscape works — the site uses
  `object-cover`, so the image is cropped to fit either way. Aim for
  **1600 px on the long edge**, JPEG quality 80–85, under 400 KB.
- **Gallery:** any aspect ratio. Same size / quality guidelines as hero.

---

## Part 2 — Turning the image on

Uploading the file isn't enough on its own — you also need to flip a switch
in the athlete's profile file so the site starts using it.

1. Open the repo on GitHub and go to `content/athletes/<slug>.mdx`
   (e.g. `content/athletes/dallas-garber.mdx`).
2. Click the pencil icon to edit.
3. Add or update these two lines at the top, between the `---` markers:

```yaml
heroUploaded: true
galleryCount: 3
```

- `heroUploaded: true` — flip this on once you've uploaded `hero.jpg`.
- `galleryCount: 3` — the number of gallery images you uploaded. Set it to
  however many you actually put in Supabase (`1`, `2`, `3`…). Leave it out
  or set `0` if you only have a hero.

4. Scroll down, click **Commit changes**, leave the default message, commit
   directly to `main`.
5. Vercel will redeploy automatically in ~1 minute, and the images will be
   live.

### Full example — what Dallas's file looks like after a photo shoot

```yaml
---
name: Dallas Garber
slug: dallas-garber
tier: all-star
shopifyTag: athlete:dallas-garber
hometown: Portland, OR
role: Pro Tour Disc Golfer
tagline: Pro Tour 2026. Coached for 7 years by Wild Rose founder Paige Smith.
heroUploaded: true
galleryCount: 4
socials:
  instagram: https://instagram.com/dallasgarber
---

Dallas joined the Wild Rose collective after seven years of coaching…
```

And in Supabase you'd have:
```
wildrosecollective/athletes/dallas-garber/hero.jpg
wildrosecollective/athletes/dallas-garber/gallery-01.jpg
wildrosecollective/athletes/dallas-garber/gallery-02.jpg
wildrosecollective/athletes/dallas-garber/gallery-03.jpg
wildrosecollective/athletes/dallas-garber/gallery-04.jpg
```

---

## Quick checklist per athlete

- [ ] Upload `hero.jpg` to `athletes/<slug>/` in the `wildrosecollective` bucket
- [ ] Upload any gallery shots as `gallery-01.jpg`, `gallery-02.jpg`, …
- [ ] Edit `content/athletes/<slug>.mdx`:
  - [ ] Add `heroUploaded: true`
  - [ ] Add `galleryCount: N` (where N is the number of gallery shots)
- [ ] Commit to `main`

---

## Swapping or removing a photo

**Swap:** upload a new file with the exact same name — Supabase overwrites
it. The site picks up the new version on the next cache cycle (~a minute).
You may need to hard-refresh (Cmd+Shift+R) to see it in your own browser.

**Remove:** delete the file from Supabase. The athlete's card will fall back
to showing their initials (the design placeholder). If you don't want that,
also set `heroUploaded: false` in the MDX so the site doesn't try to fetch
the missing file.

---

## Troubleshooting

**"I uploaded the photo but the card still shows initials."**
Did you flip `heroUploaded: true` in the MDX? The upload alone doesn't wire
it up — the switch in the MDX is what tells the site to start using it.

**"Wrong photo is showing."**
Double-check the filename in Supabase. It must be exactly `hero.jpg`, all
lowercase, under `athletes/<exact-slug>/`. A typo in the folder name or a
`.jpeg` extension won't match.

**"Gallery shows fewer images than I uploaded."**
`galleryCount` in the MDX must match (or be less than) the number of files
you uploaded. Increase `galleryCount` if you've added more.

**"Gallery has a broken image slot."**
`galleryCount` is too high for the number of files actually in Supabase.
Either upload the missing one (`gallery-04.jpg`, etc.) or lower the number.

**"Nothing updates even after 10 minutes."**
Ping whoever manages the deploy — it's likely a Vercel build issue.

---

## Permissions note

The `wildrosecollective` bucket must stay **public**. If Supabase flips it to
private (shouldn't happen, but if a teammate changes it by accident), every
image on the site will break. The bucket's privacy setting is managed in the
Supabase dashboard → Storage → bucket settings.
