# Evexya — Website Redesign

A full redesign of the Evexya practice-management website: static HTML/CSS/JS, no build step required.

**Live pages:**
- `index.html` — Homepage
- `for-patients.html` — Specialty finder quiz
- `for-providers.html` — Practice management services
- `how-we-work.html` — Process & partnership timeline
- `results.html` — Case studies, metrics, testimonials
- `contact.html` — Contact form & FAQ

## Structure

```
├── index.html
├── for-patients.html
├── for-providers.html
├── how-we-work.html
├── results.html
├── contact.html
├── styles.css      # shared design system (colors, type, components)
└── script.js       # shared interactions (nav, scroll reveals, quiz, FAQ)
```

## Running locally

No build tools needed — just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying with GitHub Pages

1. Go to **Settings → Pages**
2. Under "Branch," select `main` and `/ (root)`
3. Save — the site will be live at `https://<your-username>.github.io/Evexya/`

## Design System

- **Display type:** Fraunces (serif)
- **Body/UI type:** Inter
- **Palette:** near-black ink, deep plum, champagne gold, ivory
- **Style:** glassmorphic cards, ambient gradient motion, scroll-triggered reveals

## Notes

- Testimonial and case-study names are placeholders (`[Name]`) — swap in real client details before launch.
- Photography is not yet included; abstract line-icon SVGs are used as placeholders per the brand's "no stock photography" direction.
