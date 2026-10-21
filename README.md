# Samsun City Guide

**English** | [Türkçe](README.tr.md)

A static travel guide to Samsun, Türkiye, instrumented with Google Analytics 4 and custom events. Built for a master's level **Web Analytics** course.

**Live site:** https://samsun-rehberi.vercel.app

The site content is in Turkish.

## Pages

| Page             | Content                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `index.html`     | Home page with guide sections and highlights                                                       |
| `places.html`    | 12 must-see places in and around the city                                                          |
| `atakum.html`    | In-depth guide to Atakum: seafront, Batıpark and the Amazon Village, Çobanlı Pier, a one-day route |
| `districts.html` | All 17 districts of Samsun with sights, local food and locator maps                                |
| `food.html`      | Local dishes and a district-by-district food table                                                 |
| `itinerary.html` | Hour-by-hour two-day itinerary                                                                     |
| `practical.html` | Transport, seasons and FAQ                                                                         |
| `about.html`     | About, image credits and privacy notice                                                            |

## Measurement plan

GA4 Enhanced Measurement collects page views, scrolls and outbound clicks automatically. On top of that, the site sends the following custom events:

| Event             | Fired when                                         | Parameters                   | Question it answers                              |
| ----------------- | -------------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| `open_map`        | A "Haritada aç" (open in maps) link is clicked     | `place_name`, `page_section` | Which places do visitors actually plan to visit? |
| `select_district` | A district is chosen on the districts page         | `district_name`              | Which districts draw the most interest?          |
| `cta_click`       | An in-page button or card is clicked               | `cta_label`, `cta_target`    | Which paths do visitors take through the site?   |
| `faq_open`        | An FAQ item is expanded                            | `question`                   | What do visitors want to know before a trip?     |
| `read_complete`   | The visitor scrolls to the end of the main content | `content_group`              | Which pages are read to the end?                 |

Every page also sends a `content_group` (`home`, `places`, `atakum`, `districts`, `food`, `itinerary`, `practical`, `about`) so page groups can be compared in reports.

The event code lives in `js/main.js`.

## Tech

- Plain HTML, CSS and JavaScript. No framework, no build step.
- Responsive layout with a mobile menu, keyboard focus styles and a skip link.
- Hero photo slideshow, scroll reveal animations and cross-page view transitions, all disabled when the visitor prefers reduced motion.
- Original logo and favicon drawn as SVG.
- Deployed on Vercel. `vercel.json` enables clean URLs (`/atakum` instead of `/atakum.html`).

```
.
├── index.html, places.html, atakum.html, ...
├── css/style.css
├── js/main.js
├── favicon.svg
└── vercel.json
```

## Run locally

Any static server works:

```bash
npx serve .
```

Opening the HTML files directly in a browser also works.

## Images

All photos are freely licensed images from [Wikimedia Commons](https://commons.wikimedia.org) and [Pexels](https://www.pexels.com/license/). Each photo links to its source page with the author and license. The full list is on `about.html`. Some food photos show the dish in general and may differ from the Samsun-style serving.

## Privacy

The site uses Google Analytics 4 for aggregate visitor statistics only. No personal data is collected. Details are on `about.html`.

## Author

Eren İşci
