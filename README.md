# The Lever

**The Lever** is a crisis-intervention companion for addiction recovery. No sobriety counters, no meeting finder, no sponsor contact list — just a fast path from "I need it now" to a matched coping technique: a five-question forced-choice triage, an instrument picked against your profile and what's actually held for you before, a timed step-by-step run, and an outcome check-in that either reinforces what worked or falls back to a harm-reduction screen.

This repo is a React/Vite single-page app that emulates the mobile experience inside an iOS device frame, for showcasing the product.

**Live:** https://kirtom.github.io/the-lever/ (custom domain `thelever.help` planned)

## Stack

- React 18 + Vite
- No backend — profile, instrument scores, and the private log persist to `localStorage` only. Nothing syncs, nothing is shared.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  data.js           instrument library, profile-step and SOS-question definitions
  useLever.js        state machine + recommendation logic (matching, scoring, timers)
  App.jsx            screen router inside the iOS device frame
  components/         IOSDevice frame, Logo, Hoverable
  screens/            one component per screen (welcome, profile, home, SOS, …)
design/                the original Claude Design handoff — chat transcripts and the
                        HTML/CSS/JS prototype this app was built from. Not part of the
                        shipped app; kept for provenance and future design iteration.
```

## Deployment

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml` to GitHub Pages. `vite.config.js` uses relative asset paths (`base: './'`) so the same build works unmodified at the current GitHub Pages project path and, once attached, at the root of the `thelever.help` custom domain.

## Recommendation logic

Instrument matching runs in four tiers, most to least influential: a hard filter from the profile's "never suggest this" answers, tonight's five SOS answers (dominant signal), a small structural-affinity bonus from the profile's triggers/substance answers, and a learned hold-rate bonus from what's actually worked for this person before (seeded from the profile's "what's worked before" step, then reinforced by real outcomes). See `src/useLever.js` for the implementation.

Every instrument in `src/data.js` carries its source framework (`framework`, `originOrg`, `evidenceTier`) and a `reviewStatus` — currently `'drafted'` across the board. None of the library's content has had an actual clinical review pass yet; treat it accordingly before it reaches real users.
