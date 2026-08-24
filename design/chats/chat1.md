# Addiction recovery management app

_Started 2026-08-23 21:49 UTC_

---

## User

Design a mobile app for addiction recovery management - with everything that can be needed for a person going through this hellish experience

## Assistant



## Assistant

_[tool: ask_user]_

_[tool: ask_user]_

Form's up — waiting on your answers on audience, framework, features, and scope before I start designing.

## User

Answered — Asked for follow-up questions; substance: Alcohol, Opioids, Stimulants; stage: First year; philosophy: 12-step (AA/NA), SMART Recovery / CBT, Harm reduction, Medication-assisted (MAT), Clinical program companion, Secular, no framework; scope: Full flow, ~8 screens; tone: Blunt, peer-to-peer; hard: This app should not do the regular counters, AA\NA meeting finder, sponsor contact or calculate how much money was saved - there are tons of such apps. The main goal of this app is to provide a worki…; code: kirtom/the-lever

## Assistant



## Assistant

_[tool: github_read_files]_

_[tool: ask_user]_

_[tool: ask_user]_

Round 2 is up. Also — I couldn't reach `kirtom/the-lever` (private or empty); the form asks what's in it.

## User

Answered — Asked for follow-up questions; output: One technique, step by step, timed; attribution: Small tappable footnote; after: Did it work? y/n — tunes future picks, Log to a private history, Re-check in 30 minutes; repo: nothing; open: 1. This app should not do the regular counters, AA\NA meeting finder, sponsor contact or calculate how much money was saved - there are tons of such apps. After profile creation with fields that help…

## Assistant



## Assistant

_[tool: ask_user]_

Round 3 is up — profile fields, how fast SOS should resolve, and what lives outside the crisis flow.

## User

Answered — Asked for follow-up questions; profile: Substance(s) and pattern of use, What usually triggers you, What has worked before / what never works, Faith or anti-faith stance (rules 12-step in or out), On medication (MAT), in therapy, in a prog…; taps: 4–5 questions; home: Your instrument shelf: techniques that have worked; vibe: Stripped to almost nothing; open2: 1. the app will be called The Lever

## Assistant



## Assistant

_[tool: ask_user]_

Round 4 is up — shelf structure, the five crisis questions, and the "didn't work" path.

## User

Answered — shelf: Ranked by what worked; failure: Switch to harm reduction — stay safe instead of stopping; open3: 1. The questions should not be open ended - user needs to choose, it's handier in the event of SOS or emergency

## Assistant

_[tool: read_file]_

_[tool: list_files]_

_[tool: copy_starter_component]_

_[tool: grep]_

_[tool: dc_write]_

_[tool: write_file]_

_[tool: ready_for_verification]_

**The Lever** — full working flow in the phone: welcome → 6-step profile → home shelf → SOS (5 forced-choice questions) → match → instrument with tappable framework footnote → timed step-by-step run → "where is it now?" → held (shelf re-ranks, 30-min recheck) or harm reduction. Log and profile screens included.

The matching is real: answers score against instrument tags, and anything you rule out in the profile ("talking to a person", "leaving the house") is hard-filtered out. Crisis screens are ink-ground and stripped; everything else stays on the light Modernist ground.

Your repo is empty, so nothing was imported — `github.md` records the association.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Bundle now loads in `<helmet>`, and the shelf scores are seeded with distinct hold rates (78%, 83%, 80%, 75%, 50%…) so the ranking bars actually differ.

## User

Add tweakable controls to The Lever.dc.html (declare with dc_set_props, read via this.props): Instead build my profile -> Register

## Assistant

_[tool: dc_set_props]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Welcome CTA now reads **Register**, driven by a tweak. Three more in the Tweaks panel: triage depth (five / three / straight to an instrument), framework footnote on/off, and whether the 30-minute recheck starts checked.

## User

Address these comments from my teammates:

**Kirill** (on `The Lever.dc.html` at `[data-dc-tpl="15"]`):
<commented-element>react:    The Lever › IOSDevice
dom:      body › div#dc-root › div.sc-host › div › div.sc-host-x › div › div › div › div › div › div › p[5/5]
text:     "One button. Five questions. It hands you the one instrument…"
children: text
selector: [data-dc-tpl="15"]</commented-element>
<teammate-comment>It hands you a tool to lever the problem. Something like this. Or propose some better wordplay</teammate-comment>

**Kirill** (on `The Lever.dc.html` at `.scp1`):
<commented-element>react:    The Lever › IOSDevice
dom:      body › div#dc-root › div.sc-host › div › div.sc-host-x › div › div › div › div › div › div › div.scp1[2/2]
text:     "Skip — I need it now"
children: text
selector: .scp1</commented-element>
<teammate-comment>Maybe do it green? And make it like: SKIP! I NEED IT NOW!</teammate-comment>

**Kirill** (on `The Lever.dc.html` at `[data-dc-tpl="14"]`):
<commented-element>react:    The Lever › IOSDevice
dom:      body › div#dc-root › div.sc-host › div › div.sc-host-x › div › div › div › div › div › div › p[4/5]
text:     "No counters. No meeting list. No tally of the money you sav…"
children: text
selector: [data-dc-tpl="14"]</commented-element>
<teammate-comment>No sobriety counter. No anonymous meeting search. No sponsor contact. No saved money amount. - maybe change the wording, but the gist is that</teammate-comment>

**Kirill** (on `The Lever.dc.html` at `[data-dc-tpl="10"]`):
<commented-element>react:    The Lever › IOSDevice
dom:      body › div#dc-root › div.sc-host › div › div.sc-host-x › div › div › div › div › div › div › div[1/5]
selector: [data-dc-tpl="10"]</commented-element>
<teammate-comment>Maybe a new simple logo capturing the name of the app - The Lever. But keep it simplistic and minimal</teammate-comment>

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: ready_for_verification]_

All four addressed on the welcome screen:

- **Logo** — a lever: red bar tilting on a white fulcrum over a ground rule.
- **Denial line** — "No sobriety counter. No meeting search. No sponsor to call. No tally of the money you saved."
- **Wordplay** — "It hands you the lever that moves the thing you can't shift by hand."
- **Skip** — green outline, "SKIP! I NEED IT NOW!", fills green on hover. Note it's the one non-system color in the app; say the word if you'd rather it stay in the red/ink palette.

## User

Found issues — fixing…

## User

Found issues — fixing…

## User

Don;t like the logo, too much details and lloiks like children playground. Any other ideas? Maybe not minimalistic?

## Assistant



## Assistant

_[tool: ask_user]_

Four sketches up: a TL block lockup, a wordmark with the bar cutting through it, a solid red plate with the name knocked out, and a framed mark with a red bar. Pick one and I'll build it.

## User

Answered — Asked for follow-up questions; logo: option_2

## Assistant



## Assistant

_[tool: ask_user]_

Two follow-ups up: what the mark says, and how the lever reads — bar through the word, the word's top half tilted off its baseline, or a bar pivoting beneath it.

## User

Answered — Asked Claude to decide; bar: option_2

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

The wordmark now reads as one word sheared off its baseline — red top half tilting, bone bottom half fixed, split by the rule. The home header carries a small one-line version of the same mark.

## User

Address these comments from my teammates:

**Kirill** (on `The Lever.dc.html` at `.scp1`):
<commented-element>react:    The Lever › IOSDevice
dom:      body › div#dc-root › div.sc-host › div › div.sc-host-x › div › div › div › div › div › div › div.scp1[2/2]
text:     "SKIP. I NEED IT NOW! →"
children: span, span
selector: .scp1</commented-element>
<teammate-comment>Yeah maybe lets move back to black color scheme - remove green</teammate-comment>

**Kirill** (on `The Lever.dc.html` at `[data-dc-tpl="24"]`):
<commented-element>react:    The Lever › IOSDevice
dom:      body › div#dc-root › div.sc-host › div › div.sc-host-x › div › div › div › div › div › div › p[4/4]
text:     "One button. Five questions. It hands you the lever that mov…"
children: text
selector: [data-dc-tpl="24"]</commented-element>
<teammate-comment>Make The Lever words standing out.</teammate-comment>

## Assistant

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Green gone — skip button is now bone outline on ink, inverting on hover. "The lever" in the line below is set in the accent red so it stands out.

