# topmexicotravel.com

> The premier multilingual travel resource for global travelers visiting Mexico

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/topmexicotravel/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/topmexicotravel/actions/workflows/deploy.yml)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen)](https://pagespeed.web.dev/)

## Overview

A high-performance static website built for GitHub Pages deployment, targeting **100% Lighthouse scores** across Performance, Accessibility, Best Practices, and SEO. Designed to serve global travelers in **8+ languages** with comprehensive Mexico travel content optimized for both traditional search engines and AI-powered answer engines.

### Key Features

- **1000+ Static HTML Pages** — Destinations, hotels, restaurants, experiences, itineraries
- **100% Lighthouse Scores** — Performance, Accessibility, Best Practices, SEO
- **Multilingual Support** — EN, ES, DE, FR, PT, IT, JA, ZH with proper hreflang
- **SEO Optimized** — Schema.org structured data, Open Graph, Twitter Cards
- **AEO Optimized** — Answer Engine Optimization for AI assistants and voice search
- **Zero JavaScript Required** — Progressive enhancement, works without JS
- **GitHub Pages Ready** — Deploy from branch with custom domain support

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Architecture](#architecture)
4. [Page Templates](#page-templates)
5. [SEO Implementation](#seo-implementation)
6. [AEO Implementation](#aeo-implementation)
7. [Performance Optimization](#performance-optimization)
8. [Multilingual Support](#multilingual-support)
9. [Content Management](#content-management)
10. [Build System](#build-system)
11. [Deployment](#deployment)
12. [Testing & Validation](#testing--validation)
13. [Contributing](#contributing)

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/topmexicotravel.git
cd topmexicotravel

# Install dependencies
npm install

# Generate all static pages
npm run build

# Preview locally
npm run serve

# Run Lighthouse audit
npm run lighthouse

# Deploy to GitHub Pages
git push origin main
```

### Requirements

- Node.js 18+
- npm 9+
- Git

---

## Project Structure

```
topmexicotravel/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── src/
│   ├── templates/                  # HTML templates
│   │   ├── base.html               # Master template
│   │   ├── destination.html        # Destination pages
│   │   ├── hotel.html              # Hotel pages
│   │   ├── restaurant.html         # Restaurant pages
│   │   ├── experience.html         # Experience/activity pages
│   │   ├── itinerary.html          # Multi-day itineraries
│   │   ├── guide.html              # Travel guides
│   │   └── faq.html                # FAQ pages (AEO optimized)
│   ├── partials/                   # Reusable components
│   │   ├── head.html               # <head> with all meta tags
│   │   ├── header.html             # Site header/navigation
│   │   ├── footer.html             # Site footer
│   │   ├── breadcrumbs.html        # Breadcrumb navigation
│   │   ├── schema-destination.html # Destination schema
│   │   ├── schema-hotel.html       # Hotel schema
│   │   ├── schema-restaurant.html  # Restaurant schema
│   │   ├── schema-faq.html         # FAQ schema
│   │   └── language-switcher.html  # Language selector
│   ├── styles/
│   │   ├── critical.css            # Above-the-fold CSS (inlined)
│   │   ├── main.css                # Full stylesheet
│   │   └── print.css               # Print styles
│   ├── scripts/
│   │   └── main.js                 # Progressive enhancement JS
│   └── assets/
│       ├── images/                 # Optimized images
│       ├── icons/                  # SVG icons
│       └── fonts/                  # Self-hosted fonts (WOFF2)
├── content/
│   ├── destinations/               # Destination content (JSON/MD)
│   │   ├── en/
│   │   ├── es/
│   │   ├── de/
│   │   ├── fr/
│   │   └── pt/
│   ├── hotels/
│   ├── restaurants/
│   ├── experiences/
│   ├── itineraries/
│   └── guides/
├── data/
│   ├── destinations.json           # Destination metadata
│   ├── navigation.json             # Site navigation
│   ├── translations.json           # UI translations
│   └── schema-templates.json       # Schema.org templates
├── dist/                           # Generated static site
│   ├── en/
│   ├── es/
│   ├── de/
│   ├── fr/
│   ├── pt/
│   ├── sitemap.xml
│   ├── sitemap-en.xml
│   ├── sitemap-es.xml
│   ├── robots.txt
│   └── index.html
├── scripts/
│   ├── build.js                    # Main build script
│   ├── generate-pages.js           # Page generation
│   ├── generate-sitemaps.js        # Sitemap generation
│   ├── optimize-images.js          # Image optimization
│   ├── inline-critical-css.js      # Critical CSS inlining
│   └── validate-lighthouse.js      # Lighthouse validation
├── package.json
├── CNAME                           # Custom domain
└── README.md
```

---

## Architecture

### Static Site Generation Philosophy

This project uses a **custom Node.js build system** rather than heavy frameworks to ensure:

1. **Zero runtime JavaScript dependencies** — Pages work without JS
2. **Minimal build complexity** — Easy to understand and modify
3. **Maximum control** — Every byte is intentional
4. **Predictable output** — Same input = same output

### Page Generation Flow

```
content/*.json/md → templates/*.html → dist/*.html
        ↓                   ↓              ↓
    Raw content      HTML structure    Final pages
        +                   +              +
   data/*.json      partials/*.html   Optimized CSS/JS
```

### URL Structure

```
/                           → Homepage (language detection)
/en/                        → English homepage
/es/                        → Spanish homepage
/de/                        → German homepage
/en/cancun/                 → Destination page
/en/cancun/hotels/          → Hotels in destination
/en/cancun/hotels/ritz-carlton/  → Individual hotel
/en/cancun/restaurants/     → Restaurants in destination
/en/cancun/things-to-do/    → Experiences/activities
/en/itineraries/yucatan-7-days/  → Itinerary
/en/guides/cenotes-complete-guide/  → Travel guide
/en/faq/mexico-visa-requirements/   → FAQ (AEO optimized)
```

---

## Page Templates

### Base Template (`src/templates/base.html`)

Every page extends this template, ensuring consistent structure and 100% Lighthouse compliance.

```html
<!DOCTYPE html>
<html lang="{{lang}}" dir="ltr">
<head>
  <!-- CRITICAL: Character encoding must be first -->
  <meta charset="utf-8">
  
  <!-- CRITICAL: Viewport for mobile responsiveness -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- CRITICAL: Preconnect to external origins -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- CRITICAL: Preload largest contentful paint image -->
  <link rel="preload" as="image" href="{{hero_image}}" fetchpriority="high">
  
  <!-- DNS prefetch for analytics/third-parties -->
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  
  <!-- Primary Meta Tags -->
  <title>{{title}} | Top Mexico Travel</title>
  <meta name="title" content="{{title}} | Top Mexico Travel">
  <meta name="description" content="{{description}}">
  <meta name="keywords" content="{{keywords}}">
  <meta name="author" content="Top Mexico Travel">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="{{canonical_url}}">
  
  <!-- Hreflang for multilingual -->
  {{#each languages}}
  <link rel="alternate" hreflang="{{this.code}}" href="{{this.url}}">
  {{/each}}
  <link rel="alternate" hreflang="x-default" href="{{default_url}}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="{{og_type}}">
  <meta property="og:url" content="{{canonical_url}}">
  <meta property="og:title" content="{{title}}">
  <meta property="og:description" content="{{description}}">
  <meta property="og:image" content="{{og_image}}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{{og_image_alt}}">
  <meta property="og:site_name" content="Top Mexico Travel">
  <meta property="og:locale" content="{{og_locale}}">
  {{#each alternate_locales}}
  <meta property="og:locale:alternate" content="{{this}}">
  {{/each}}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="{{canonical_url}}">
  <meta name="twitter:title" content="{{title}}">
  <meta name="twitter:description" content="{{description}}">
  <meta name="twitter:image" content="{{twitter_image}}">
  <meta name="twitter:image:alt" content="{{og_image_alt}}">
  <meta name="twitter:site" content="@topmexicotravel">
  <meta name="twitter:creator" content="@topmexicotravel">
  
  <!-- Additional SEO Meta -->
  <meta name="geo.region" content="MX">
  <meta name="geo.placename" content="{{location_name}}">
  <meta name="geo.position" content="{{latitude}};{{longitude}}">
  <meta name="ICBM" content="{{latitude}}, {{longitude}}">
  
  <!-- Mobile App Meta -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Top Mexico Travel">
  <meta name="application-name" content="Top Mexico Travel">
  <meta name="theme-color" content="#006847">
  <meta name="msapplication-TileColor" content="#006847">
  
  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  
  <!-- CRITICAL CSS (Inlined for performance) -->
  <style>
    {{critical_css}}
  </style>
  
  <!-- Main CSS (deferred loading) -->
  <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
  
  <!-- Print CSS -->
  <link rel="stylesheet" href="/styles/print.css" media="print">
  
  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
    {{schema_json}}
  </script>
  
  <!-- Speakable Schema for Voice Search (AEO) -->
  <script type="application/ld+json">
    {{speakable_schema}}
  </script>
</head>
<body>
  <!-- Skip Link for Accessibility -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Header -->
  {{> header}}
  
  <!-- Breadcrumbs -->
  {{> breadcrumbs}}
  
  <!-- Main Content -->
  <main id="main-content" role="main">
    {{content}}
  </main>
  
  <!-- Footer -->
  {{> footer}}
  
  <!-- Deferred JavaScript -->
  <script src="/scripts/main.js" defer></script>
  
  <!-- Analytics (deferred, non-blocking) -->
  <script defer>
    window.addEventListener('load', function() {
      // Load analytics after page load
      {{analytics_script}}
    });
  </script>
</body>
</html>
```

### Destination Template (`src/templates/destination.html`)

```html
{{!-- Extends base.html --}}
{{#extend "base"}}

{{#content "schema_json"}}
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "@id": "{{canonical_url}}#destination",
  "name": "{{destination_name}}",
  "description": "{{description}}",
  "url": "{{canonical_url}}",
  "touristType": {{json tourist_types}},
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": {{latitude}},
    "longitude": {{longitude}}
  },
  "containedInPlace": {
    "@type": "Country",
    "name": "Mexico",
    "identifier": "MX"
  },
  "image": {
    "@type": "ImageObject",
    "url": "{{hero_image}}",
    "width": 1200,
    "height": 630,
    "caption": "{{hero_image_caption}}"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{rating}}",
    "reviewCount": "{{review_count}}",
    "bestRating": "5",
    "worstRating": "1"
  },
  "includesAttraction": [
    {{#each attractions}}
    {
      "@type": "TouristAttraction",
      "name": "{{this.name}}",
      "description": "{{this.description}}",
      "url": "{{this.url}}"
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ],
  "publicAccess": true,
  "isAccessibleForFree": true
}
{{/content}}

{{#content "main"}}
<article class="destination" itemscope itemtype="https://schema.org/TouristDestination">
  <!-- Hero Section with LCP Image -->
  <header class="destination-hero">
    <picture>
      <source 
        type="image/avif" 
        srcset="{{hero_image_avif_400}} 400w, {{hero_image_avif_800}} 800w, {{hero_image_avif_1200}} 1200w"
        sizes="100vw">
      <source 
        type="image/webp" 
        srcset="{{hero_image_webp_400}} 400w, {{hero_image_webp_800}} 800w, {{hero_image_webp_1200}} 1200w"
        sizes="100vw">
      <img 
        src="{{hero_image}}" 
        alt="{{hero_image_alt}}"
        width="1200" 
        height="630"
        fetchpriority="high"
        decoding="async"
        itemprop="image">
    </picture>
    <div class="destination-hero-content">
      <h1 itemprop="name">{{destination_name}}</h1>
      <p class="destination-tagline" itemprop="description">{{tagline}}</p>
    </div>
  </header>
  
  <!-- Quick Facts (AEO Optimized) -->
  <section class="quick-facts" aria-labelledby="quick-facts-heading">
    <h2 id="quick-facts-heading" class="sr-only">Quick Facts About {{destination_name}}</h2>
    <dl class="facts-grid">
      <div class="fact">
        <dt>Best Time to Visit</dt>
        <dd>{{best_time_to_visit}}</dd>
      </div>
      <div class="fact">
        <dt>Average Temperature</dt>
        <dd>{{average_temperature}}</dd>
      </div>
      <div class="fact">
        <dt>Known For</dt>
        <dd>{{known_for}}</dd>
      </div>
      <div class="fact">
        <dt>Airport Code</dt>
        <dd>{{airport_code}}</dd>
      </div>
    </dl>
  </section>
  
  <!-- Introduction with Featured Snippet Optimization -->
  <section class="destination-intro" aria-labelledby="intro-heading">
    <h2 id="intro-heading">About {{destination_name}}</h2>
    <!-- First paragraph optimized for featured snippets (40-60 words) -->
    <p class="intro-featured">
      {{featured_snippet_intro}}
    </p>
    <div class="intro-full" itemprop="description">
      {{full_introduction}}
    </div>
  </section>
  
  <!-- Things to Do Section -->
  <section class="things-to-do" aria-labelledby="things-heading">
    <h2 id="things-heading">Things to Do in {{destination_name}}</h2>
    <ul class="attractions-grid">
      {{#each attractions}}
      <li itemscope itemtype="https://schema.org/TouristAttraction">
        <article class="attraction-card">
          <picture>
            <source type="image/webp" srcset="{{this.image_webp}}">
            <img 
              src="{{this.image}}" 
              alt="{{this.image_alt}}"
              width="400" 
              height="300"
              loading="lazy"
              decoding="async"
              itemprop="image">
          </picture>
          <h3 itemprop="name">{{this.name}}</h3>
          <p itemprop="description">{{this.description}}</p>
          <a href="{{this.url}}" itemprop="url">Learn more →</a>
        </article>
      </li>
      {{/each}}
    </ul>
    <a href="/{{lang}}/{{slug}}/things-to-do/" class="section-link">
      View all things to do in {{destination_name}} →
    </a>
  </section>
  
  <!-- Hotels Section -->
  <section class="hotels-preview" aria-labelledby="hotels-heading">
    <h2 id="hotels-heading">Where to Stay in {{destination_name}}</h2>
    <ul class="hotels-grid">
      {{#each featured_hotels}}
      <li itemscope itemtype="https://schema.org/Hotel">
        <article class="hotel-card">
          <picture>
            <source type="image/webp" srcset="{{this.image_webp}}">
            <img 
              src="{{this.image}}" 
              alt="{{this.image_alt}}"
              width="400" 
              height="300"
              loading="lazy"
              decoding="async"
              itemprop="image">
          </picture>
          <h3 itemprop="name">{{this.name}}</h3>
          <div class="hotel-rating" itemprop="starRating" itemscope itemtype="https://schema.org/Rating">
            <span itemprop="ratingValue">{{this.stars}}</span> Stars
          </div>
          <p itemprop="description">{{this.description}}</p>
          <a href="{{this.url}}" itemprop="url">View details →</a>
        </article>
      </li>
      {{/each}}
    </ul>
    <a href="/{{lang}}/{{slug}}/hotels/" class="section-link">
      View all hotels in {{destination_name}} →
    </a>
  </section>
  
  <!-- FAQ Section (AEO Optimized with FAQPage Schema) -->
  <section class="faq-section" aria-labelledby="faq-heading">
    <h2 id="faq-heading">Frequently Asked Questions About {{destination_name}}</h2>
    <div itemscope itemtype="https://schema.org/FAQPage">
      {{#each faqs}}
      <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" {{#if @first}}open{{/if}}>
        <summary itemprop="name">{{this.question}}</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text">
            {{this.answer}}
          </div>
        </div>
      </details>
      {{/each}}
    </div>
  </section>
  
  <!-- Related Destinations -->
  <section class="related-destinations" aria-labelledby="related-heading">
    <h2 id="related-heading">Destinations Near {{destination_name}}</h2>
    <ul class="related-grid">
      {{#each related_destinations}}
      <li>
        <a href="{{this.url}}">
          <picture>
            <source type="image/webp" srcset="{{this.image_webp}}">
            <img 
              src="{{this.image}}" 
              alt="{{this.name}}"
              width="300" 
              height="200"
              loading="lazy"
              decoding="async">
          </picture>
          <span>{{this.name}}</span>
        </a>
      </li>
      {{/each}}
    </ul>
  </section>
</article>
{{/content}}

{{/extend}}
```

---

## SEO Implementation

### Meta Tags Checklist

Every page MUST include:

```html
<!-- Required Meta Tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}} | Top Mexico Travel</title>
<meta name="description" content="{{description}}"> <!-- 150-160 chars -->
<link rel="canonical" href="{{canonical_url}}">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:type" content="website">
<meta property="og:url" content="{{canonical_url}}">
<meta property="og:title" content="{{title}}">
<meta property="og:description" content="{{description}}">
<meta property="og:image" content="{{og_image}}"> <!-- 1200x630px -->
<meta property="og:site_name" content="Top Mexico Travel">
<meta property="og:locale" content="{{locale}}">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{title}}">
<meta name="twitter:description" content="{{description}}">
<meta name="twitter:image" content="{{twitter_image}}"> <!-- 1200x600px -->
```

### Schema.org Structured Data

#### Schema Types by Page Type

| Page Type | Primary Schema | Additional Schemas |
|-----------|---------------|-------------------|
| Homepage | WebSite, Organization | SearchAction |
| Destination | TouristDestination | Place, FAQPage |
| Hotel | Hotel | AggregateRating, Offer |
| Restaurant | Restaurant | AggregateRating, Menu |
| Experience | TouristAttraction | Event, Offer |
| Itinerary | TravelAction, ItemList | Trip |
| Guide | Article, HowTo | FAQPage |
| FAQ | FAQPage | - |

#### Organization Schema (Site-wide)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://topmexicotravel.com/#organization",
  "name": "Top Mexico Travel",
  "url": "https://topmexicotravel.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://topmexicotravel.com/assets/logo.png",
    "width": 600,
    "height": 60
  },
  "sameAs": [
    "https://www.facebook.com/topmexicotravel",
    "https://twitter.com/topmexicotravel",
    "https://www.instagram.com/topmexicotravel",
    "https://www.youtube.com/topmexicotravel",
    "https://www.pinterest.com/topmexicotravel"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English", "Spanish", "German", "French", "Portuguese"]
  }
}
```

#### WebSite Schema with SearchAction

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://topmexicotravel.com/#website",
  "url": "https://topmexicotravel.com",
  "name": "Top Mexico Travel",
  "description": "The premier multilingual travel resource for Mexico",
  "publisher": {
    "@id": "https://topmexicotravel.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://topmexicotravel.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["en", "es", "de", "fr", "pt", "it", "ja", "zh"]
}
```

#### Breadcrumb Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://topmexicotravel.com/en/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Destinations",
      "item": "https://topmexicotravel.com/en/destinations/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cancún",
      "item": "https://topmexicotravel.com/en/cancun/"
    }
  ]
}
```

### Sitemap Configuration

#### Main Sitemap Index (`sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://topmexicotravel.com/sitemap-en.xml</loc>
    <lastmod>2026-01-12</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://topmexicotravel.com/sitemap-es.xml</loc>
    <lastmod>2026-01-12</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://topmexicotravel.com/sitemap-de.xml</loc>
    <lastmod>2026-01-12</lastmod>
  </sitemap>
  <!-- Additional language sitemaps -->
</sitemapindex>
```

#### Language-Specific Sitemap (`sitemap-en.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://topmexicotravel.com/en/cancun/</loc>
    <lastmod>2026-01-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://topmexicotravel.com/en/cancun/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://topmexicotravel.com/es/cancun/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://topmexicotravel.com/de/cancun/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://topmexicotravel.com/en/cancun/"/>
    <image:image>
      <image:loc>https://topmexicotravel.com/images/cancun-hero.jpg</image:loc>
      <image:title>Cancún Beach Resort</image:title>
      <image:caption>Crystal clear waters at Cancún's Hotel Zone</image:caption>
    </image:image>
  </url>
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://topmexicotravel.com/sitemap.xml

# Disallow admin/build paths
Disallow: /admin/
Disallow: /_build/
Disallow: /node_modules/

# Crawl-delay for polite bots
Crawl-delay: 1

# Specific bot instructions
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: CCBot
Allow: /
```

---

## AEO Implementation

### Answer Engine Optimization Strategy

AEO (Answer Engine Optimization) targets AI assistants, voice search, and featured snippets. Key principles:

1. **Direct Answers** — Lead with concise, factual answers
2. **Structured Content** — Use clear headings, lists, tables
3. **FAQ Schema** — Machine-readable Q&A pairs
4. **Speakable Schema** — Voice-search optimized content
5. **Entity Focus** — Clear subject-predicate-object structure

### Featured Snippet Optimization

#### Paragraph Snippets (40-60 words)

```html
<!-- Target query: "What is Cancún known for?" -->
<section class="featured-answer">
  <h2>What is Cancún Known For?</h2>
  <p>
    Cancún is known for its stunning Caribbean beaches, vibrant nightlife, 
    and proximity to ancient Mayan ruins. Located on Mexico's Yucatán Peninsula, 
    it offers crystal-clear turquoise waters, world-class resorts, and easy 
    access to Chichén Itzá, making it one of Mexico's most popular tourist 
    destinations.
  </p>
</section>
```

#### List Snippets

```html
<!-- Target query: "Best things to do in Oaxaca" -->
<section class="featured-list">
  <h2>Best Things to Do in Oaxaca</h2>
  <ol>
    <li>Visit Monte Albán archaeological site</li>
    <li>Take a mezcal distillery tour</li>
    <li>Explore Hierve el Agua petrified waterfalls</li>
    <li>Shop at Mercado Benito Juárez</li>
    <li>Taste authentic Oaxacan mole</li>
    <li>Watch artisan rug weaving in Teotitlán del Valle</li>
    <li>Celebrate Day of the Dead</li>
    <li>Visit the Museo de las Culturas de Oaxaca</li>
  </ol>
</section>
```

#### Table Snippets

```html
<!-- Target query: "Mexico visa requirements by country" -->
<section class="featured-table">
  <h2>Mexico Visa Requirements by Country</h2>
  <table>
    <thead>
      <tr>
        <th>Country</th>
        <th>Visa Required</th>
        <th>Max Stay</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>United States</td>
        <td>No</td>
        <td>180 days</td>
      </tr>
      <tr>
        <td>Canada</td>
        <td>No</td>
        <td>180 days</td>
      </tr>
      <tr>
        <td>United Kingdom</td>
        <td>No</td>
        <td>180 days</td>
      </tr>
      <tr>
        <td>Germany</td>
        <td>No</td>
        <td>180 days</td>
      </tr>
      <!-- Additional rows -->
    </tbody>
  </table>
</section>
```

### Speakable Schema (Voice Search)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{page_title}}",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".featured-answer",
      ".quick-facts",
      ".intro-featured"
    ]
  },
  "url": "{{canonical_url}}"
}
```

### FAQ Page Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a visa to visit Mexico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Citizens of the United States, Canada, EU countries, UK, Australia, and many other nations do not need a visa for tourist visits up to 180 days. You will receive a Forma Migratoria Múltiple (FMM) upon arrival, which is now electronic for most air travelers at major airports."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best time to visit Mexico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best time to visit Mexico is during the dry season from November to April. December through February offers ideal weather across most destinations, though this is also peak tourist season with higher prices. The shoulder months of November and April offer good weather with fewer crowds."
      }
    }
  ]
}
```

### HowTo Schema (Itineraries)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Spend 7 Days in the Yucatán Peninsula",
  "description": "A complete one-week itinerary covering Cancún, Tulum, and Mérida",
  "totalTime": "P7D",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "1500-3000"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Days 1-2: Cancún",
      "text": "Arrive at Cancún International Airport. Spend two days exploring the Hotel Zone beaches, snorkeling at Punta Nizuc, and visiting Isla Mujeres.",
      "url": "https://topmexicotravel.com/en/itineraries/yucatan-7-days/#day-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Days 3-4: Tulum",
      "text": "Drive south to Tulum. Visit the clifftop ruins, swim in cenotes like Gran Cenote and Cenote Dos Ojos, and enjoy the beach club scene.",
      "url": "https://topmexicotravel.com/en/itineraries/yucatan-7-days/#day-3"
    }
  ]
}
```

---

## Performance Optimization

### Lighthouse 100 Score Requirements

#### Performance (100)

- [ ] **Largest Contentful Paint (LCP)** < 2.5s
- [ ] **First Input Delay (FID)** < 100ms
- [ ] **Cumulative Layout Shift (CLS)** < 0.1
- [ ] **First Contentful Paint (FCP)** < 1.8s
- [ ] **Time to Interactive (TTI)** < 3.8s
- [ ] **Total Blocking Time (TBT)** < 200ms

#### Accessibility (100)

- [ ] All images have `alt` attributes
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] All form inputs have labels
- [ ] Skip link present
- [ ] ARIA landmarks properly used
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Focus indicators visible
- [ ] Language attribute set

#### Best Practices (100)

- [ ] HTTPS everywhere
- [ ] No browser console errors
- [ ] Images use appropriate aspect ratios
- [ ] No deprecated APIs
- [ ] Charset declared
- [ ] Doctype declared

#### SEO (100)

- [ ] `<title>` present and unique
- [ ] `<meta name="description">` present
- [ ] `<meta name="viewport">` present
- [ ] Document has valid hreflang
- [ ] Links have descriptive text
- [ ] Links are crawlable
- [ ] Page isn't blocked by robots.txt

### Critical CSS Strategy

Inline above-the-fold CSS directly in `<head>` to eliminate render-blocking:

```css
/* critical.css - Inline this in <head> */

/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Typography */
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
  --color-primary: #006847;
  --color-secondary: #CE1126;
  --color-text: #1a1a1a;
  --color-bg: #ffffff;
}

html { 
  font-size: 100%; 
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--color-primary);
  color: white;
  z-index: 100;
}
.skip-link:focus { top: 0; }

/* Header - Above the fold */
.site-header {
  position: sticky;
  top: 0;
  background: var(--color-bg);
  border-bottom: 1px solid #eee;
  z-index: 50;
}

/* Hero Section - Above the fold */
.destination-hero {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: flex-end;
}

.destination-hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.destination-hero-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  width: 100%;
}

/* Prevent CLS */
img, video { 
  max-width: 100%; 
  height: auto;
  display: block;
}

/* Reserve space for images */
.destination-hero img {
  aspect-ratio: 1200 / 630;
}

.attraction-card img,
.hotel-card img {
  aspect-ratio: 4 / 3;
}
```

### Image Optimization

#### Required Image Formats

Generate all images in multiple formats and sizes:

```
image.jpg          → Original (fallback)
image.webp         → WebP (70-80% smaller)
image.avif         → AVIF (80-90% smaller)
image-400.jpg      → 400w variant
image-800.jpg      → 800w variant  
image-1200.jpg     → 1200w variant
image-400.webp     → 400w WebP
image-800.webp     → 800w WebP
image-1200.webp    → 1200w WebP
```

#### Image HTML Pattern

```html
<picture>
  <!-- AVIF for modern browsers (smallest) -->
  <source 
    type="image/avif"
    srcset="
      /images/cancun-hero-400.avif 400w,
      /images/cancun-hero-800.avif 800w,
      /images/cancun-hero-1200.avif 1200w
    "
    sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  >
  <!-- WebP for wide support -->
  <source 
    type="image/webp"
    srcset="
      /images/cancun-hero-400.webp 400w,
      /images/cancun-hero-800.webp 800w,
      /images/cancun-hero-1200.webp 1200w
    "
    sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  >
  <!-- JPEG fallback -->
  <img 
    src="/images/cancun-hero-800.jpg"
    srcset="
      /images/cancun-hero-400.jpg 400w,
      /images/cancun-hero-800.jpg 800w,
      /images/cancun-hero-1200.jpg 1200w
    "
    sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
    alt="Crystal clear turquoise waters at Cancún's Hotel Zone beach"
    width="1200"
    height="630"
    loading="lazy"
    decoding="async"
  >
</picture>
```

#### Hero Image (LCP) Special Treatment

```html
<!-- Hero images should NOT be lazy loaded -->
<img 
  src="/images/hero.jpg"
  alt="..."
  width="1200"
  height="630"
  fetchpriority="high"  <!-- Prioritize download -->
  decoding="async"       <!-- Don't block main thread -->
  <!-- NO loading="lazy" for LCP images -->
>

<!-- Preload in <head> -->
<link 
  rel="preload" 
  as="image" 
  href="/images/hero.webp"
  type="image/webp"
  fetchpriority="high"
>
```

### Font Loading Strategy

Self-host fonts and use `font-display: swap`:

```css
/* In main.css - NOT critical.css */

@font-face {
  font-family: 'Playfair Display';
  src: url('/assets/fonts/playfair-display-v30-latin-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;  /* Show fallback immediately */
}

@font-face {
  font-family: 'Source Sans 3';
  src: url('/assets/fonts/source-sans-3-v8-latin-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Source Sans 3';
  src: url('/assets/fonts/source-sans-3-v8-latin-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

Preload critical fonts in `<head>`:

```html
<link 
  rel="preload" 
  href="/assets/fonts/source-sans-3-v8-latin-regular.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
>
```

### JavaScript Strategy

**Zero JavaScript for core functionality.** Progressive enhancement only:

```javascript
// main.js - Deferred, non-essential

// Feature detection
const supportsModules = 'noModule' in document.createElement('script');
const supportsIntersectionObserver = 'IntersectionObserver' in window;

// Progressive enhancement: Language switcher
document.querySelectorAll('.language-switcher').forEach(switcher => {
  switcher.addEventListener('change', (e) => {
    window.location.href = e.target.value;
  });
});

// Progressive enhancement: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Progressive enhancement: Lazy load images below fold
if (supportsIntersectionObserver) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Progressive enhancement: FAQ accordions
document.querySelectorAll('.faq-section details').forEach(details => {
  details.addEventListener('toggle', () => {
    // Analytics tracking if needed
  });
});
```

---

## Multilingual Support

### Supported Languages

| Code | Language | Locale | Direction |
|------|----------|--------|-----------|
| en | English | en_US | ltr |
| es | Spanish | es_MX | ltr |
| de | German | de_DE | ltr |
| fr | French | fr_FR | ltr |
| pt | Portuguese | pt_BR | ltr |
| it | Italian | it_IT | ltr |
| ja | Japanese | ja_JP | ltr |
| zh | Chinese (Simplified) | zh_CN | ltr |

### Hreflang Implementation

Every page includes complete hreflang tags:

```html
<!-- On /en/cancun/ -->
<link rel="alternate" hreflang="en" href="https://topmexicotravel.com/en/cancun/">
<link rel="alternate" hreflang="es" href="https://topmexicotravel.com/es/cancun/">
<link rel="alternate" hreflang="de" href="https://topmexicotravel.com/de/cancun/">
<link rel="alternate" hreflang="fr" href="https://topmexicotravel.com/fr/cancun/">
<link rel="alternate" hreflang="pt" href="https://topmexicotravel.com/pt/cancun/">
<link rel="alternate" hreflang="it" href="https://topmexicotravel.com/it/cancun/">
<link rel="alternate" hreflang="ja" href="https://topmexicotravel.com/ja/cancun/">
<link rel="alternate" hreflang="zh" href="https://topmexicotravel.com/zh/cancun/">
<link rel="alternate" hreflang="x-default" href="https://topmexicotravel.com/en/cancun/">
```

### Language Detection (Homepage)

```html
<!-- index.html at root -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/en/">
  <link rel="alternate" hreflang="en" href="https://topmexicotravel.com/en/">
  <link rel="alternate" hreflang="es" href="https://topmexicotravel.com/es/">
  <link rel="alternate" hreflang="x-default" href="https://topmexicotravel.com/en/">
  <script>
    // Client-side language detection (progressive enhancement)
    const lang = navigator.language?.slice(0,2) || 'en';
    const supported = ['en','es','de','fr','pt','it','ja','zh'];
    const target = supported.includes(lang) ? lang : 'en';
    window.location.replace('/' + target + '/');
  </script>
</head>
<body>
  <p>Redirecting to <a href="/en/">English version</a>...</p>
</body>
</html>
```

### Content Translation Structure

```
content/
├── destinations/
│   ├── en/
│   │   └── cancun.json
│   ├── es/
│   │   └── cancun.json
│   ├── de/
│   │   └── cancun.json
│   └── ...
```

#### Translation JSON Format

```json
// content/destinations/en/cancun.json
{
  "slug": "cancun",
  "lang": "en",
  "title": "Cancún Travel Guide 2026",
  "meta_description": "Complete Cancún travel guide: best beaches, hotels, restaurants, things to do, and insider tips for your Mexico vacation.",
  "h1": "Cancún",
  "tagline": "Mexico's Caribbean Paradise",
  "featured_snippet_intro": "Cancún is a world-famous beach destination on Mexico's Caribbean coast, known for its turquoise waters, vibrant nightlife, and proximity to ancient Mayan ruins like Chichén Itzá. The Hotel Zone offers all-inclusive resorts while downtown Cancún provides authentic Mexican culture.",
  "sections": {
    "about": {
      "heading": "About Cancún",
      "content": "..."
    },
    "things_to_do": {
      "heading": "Things to Do in Cancún",
      "content": "..."
    }
  },
  "faqs": [
    {
      "question": "What is the best time to visit Cancún?",
      "answer": "The best time to visit Cancún is from December to April during the dry season. This period offers sunny skies, low humidity, and comfortable temperatures around 75-85°F (24-29°C). February and March are peak season due to Spring Break, so book early and expect higher prices."
    }
  ]
}
```

---

## Content Management

### Content File Format

Use JSON for structured content:

```json
// content/destinations/en/oaxaca.json
{
  "id": "oaxaca",
  "type": "destination",
  "lang": "en",
  "slug": "oaxaca",
  "parent": null,
  "seo": {
    "title": "Oaxaca Travel Guide 2026 - Culture, Food & Mezcal",
    "description": "Discover Oaxaca: Mexico's cultural capital. Explore ancient ruins, taste authentic mole and mezcal, shop for artisan crafts, and experience Day of the Dead traditions.",
    "keywords": ["oaxaca travel", "oaxaca mexico", "oaxaca food", "oaxaca mezcal", "monte alban"]
  },
  "content": {
    "name": "Oaxaca",
    "tagline": "Mexico's Cultural Heart",
    "region": "Oaxaca State",
    "country": "Mexico",
    "featured_snippet": "Oaxaca is Mexico's cultural capital, renowned for its indigenous heritage, world-famous cuisine, artisan crafts, and mezcal distilleries. The UNESCO-listed historic center features colonial architecture, bustling markets, and some of Mexico's best restaurants.",
    "introduction": "...",
    "sections": []
  },
  "media": {
    "hero_image": "/images/oaxaca/oaxaca-hero.jpg",
    "hero_image_alt": "Colorful buildings and Santo Domingo church in Oaxaca city center",
    "og_image": "/images/oaxaca/oaxaca-og.jpg",
    "gallery": []
  },
  "data": {
    "coordinates": {
      "latitude": 17.0732,
      "longitude": -96.7266
    },
    "timezone": "America/Mexico_City",
    "airport_codes": ["OAX"],
    "weather": {
      "best_months": ["October", "November", "December", "March", "April"],
      "avg_temp_high_c": 28,
      "avg_temp_low_c": 14,
      "rainy_season": ["June", "July", "August", "September"]
    },
    "practical": {
      "currency": "MXN",
      "language": "Spanish",
      "safety_level": "Level 2",
      "visa_free_countries": 180
    }
  },
  "relationships": {
    "parent_region": "oaxaca-state",
    "related_destinations": ["puebla", "mexico-city", "chiapas"],
    "nearby_attractions": ["monte-alban", "hierve-el-agua", "mitla"]
  },
  "metadata": {
    "created_at": "2024-01-15",
    "updated_at": "2026-01-12",
    "author": "editorial-team",
    "status": "published"
  }
}
```

### Content Validation Schema

```javascript
// scripts/validate-content.js
const Ajv = require('ajv');
const ajv = new Ajv();

const destinationSchema = {
  type: 'object',
  required: ['id', 'type', 'lang', 'slug', 'seo', 'content', 'media', 'data'],
  properties: {
    id: { type: 'string', pattern: '^[a-z0-9-]+$' },
    type: { enum: ['destination', 'hotel', 'restaurant', 'experience', 'itinerary', 'guide'] },
    lang: { enum: ['en', 'es', 'de', 'fr', 'pt', 'it', 'ja', 'zh'] },
    slug: { type: 'string', pattern: '^[a-z0-9-]+$' },
    seo: {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        title: { type: 'string', minLength: 30, maxLength: 60 },
        description: { type: 'string', minLength: 120, maxLength: 160 }
      }
    }
    // ... additional validation
  }
};

const validate = ajv.compile(destinationSchema);
```

---

## Build System

### Package.json

```json
{
  "name": "topmexicotravel",
  "version": "1.0.0",
  "description": "Premier multilingual Mexico travel resource",
  "scripts": {
    "build": "node scripts/build.js",
    "build:pages": "node scripts/generate-pages.js",
    "build:sitemap": "node scripts/generate-sitemaps.js",
    "build:images": "node scripts/optimize-images.js",
    "build:css": "node scripts/inline-critical-css.js",
    "serve": "npx serve dist -l 3000",
    "lighthouse": "node scripts/validate-lighthouse.js",
    "validate": "node scripts/validate-content.js",
    "clean": "rm -rf dist/*",
    "deploy": "npm run build && git subtree push --prefix dist origin gh-pages"
  },
  "dependencies": {
    "handlebars": "^4.7.8",
    "gray-matter": "^4.0.3",
    "sharp": "^0.33.2",
    "glob": "^10.3.10",
    "cheerio": "^1.0.0-rc.12"
  },
  "devDependencies": {
    "lighthouse": "^11.4.0",
    "ajv": "^8.12.0",
    "serve": "^14.2.1"
  }
}
```

### Main Build Script

```javascript
// scripts/build.js
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const matter = require('gray-matter');
const glob = require('glob');

const CONFIG = {
  languages: ['en', 'es', 'de', 'fr', 'pt', 'it', 'ja', 'zh'],
  baseUrl: 'https://topmexicotravel.com',
  distDir: 'dist',
  contentDir: 'content',
  templatesDir: 'src/templates',
  partialsDir: 'src/partials'
};

// Register Handlebars partials
const partialFiles = glob.sync(`${CONFIG.partialsDir}/*.html`);
partialFiles.forEach(file => {
  const name = path.basename(file, '.html');
  const content = fs.readFileSync(file, 'utf-8');
  Handlebars.registerPartial(name, content);
});

// Register Handlebars helpers
Handlebars.registerHelper('json', (context) => JSON.stringify(context));
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('formatDate', (date) => new Date(date).toISOString().split('T')[0]);

// Load and compile templates
const templates = {};
const templateFiles = glob.sync(`${CONFIG.templatesDir}/*.html`);
templateFiles.forEach(file => {
  const name = path.basename(file, '.html');
  const content = fs.readFileSync(file, 'utf-8');
  templates[name] = Handlebars.compile(content);
});

// Generate pages
async function generatePages() {
  const contentFiles = glob.sync(`${CONFIG.contentDir}/**/*.json`);
  
  for (const file of contentFiles) {
    const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const template = templates[content.type] || templates.base;
    
    // Generate page data
    const pageData = {
      ...content,
      canonical_url: `${CONFIG.baseUrl}/${content.lang}/${content.slug}/`,
      languages: generateHreflangLinks(content.slug),
      schema_json: generateSchemaJson(content),
      critical_css: fs.readFileSync('src/styles/critical.css', 'utf-8')
    };
    
    // Render HTML
    const html = template(pageData);
    
    // Write to dist
    const outputPath = `${CONFIG.distDir}/${content.lang}/${content.slug}/index.html`;
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    
    console.log(`Generated: ${outputPath}`);
  }
}

function generateHreflangLinks(slug) {
  return CONFIG.languages.map(lang => ({
    code: lang,
    url: `${CONFIG.baseUrl}/${lang}/${slug}/`
  }));
}

function generateSchemaJson(content) {
  // Generate appropriate schema based on content type
  const schemas = {
    destination: generateDestinationSchema,
    hotel: generateHotelSchema,
    restaurant: generateRestaurantSchema
  };
  
  const generator = schemas[content.type];
  return generator ? JSON.stringify(generator(content), null, 2) : '{}';
}

// Run build
async function build() {
  console.log('🏗️  Building topmexicotravel.com...\n');
  
  // Clean dist
  fs.rmSync(CONFIG.distDir, { recursive: true, force: true });
  fs.mkdirSync(CONFIG.distDir);
  
  // Generate pages
  await generatePages();
  
  // Generate sitemaps
  require('./generate-sitemaps');
  
  // Copy static assets
  fs.cpSync('src/assets', `${CONFIG.distDir}/assets`, { recursive: true });
  fs.cpSync('src/styles/main.css', `${CONFIG.distDir}/styles/main.css`);
  fs.cpSync('src/scripts/main.js', `${CONFIG.distDir}/scripts/main.js`);
  
  // Copy root files
  fs.copyFileSync('robots.txt', `${CONFIG.distDir}/robots.txt`);
  fs.copyFileSync('CNAME', `${CONFIG.distDir}/CNAME`);
  
  console.log('\n✅ Build complete!');
}

build().catch(console.error);
```

### Sitemap Generator

```javascript
// scripts/generate-sitemaps.js
const fs = require('fs');
const glob = require('glob');

const CONFIG = {
  baseUrl: 'https://topmexicotravel.com',
  languages: ['en', 'es', 'de', 'fr', 'pt', 'it', 'ja', 'zh'],
  distDir: 'dist'
};

function generateSitemapIndex() {
  const sitemaps = CONFIG.languages.map(lang => `
  <sitemap>
    <loc>${CONFIG.baseUrl}/sitemap-${lang}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

function generateLanguageSitemap(lang) {
  const pages = glob.sync(`${CONFIG.distDir}/${lang}/**/index.html`);
  
  const urls = pages.map(page => {
    const relativePath = page.replace(`${CONFIG.distDir}/`, '').replace('/index.html', '/');
    const slug = relativePath.replace(`${lang}/`, '');
    
    // Generate hreflang links
    const hreflangs = CONFIG.languages.map(l => 
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${CONFIG.baseUrl}/${l}/${slug}"/>`
    ).join('\n');
    
    return `
  <url>
    <loc>${CONFIG.baseUrl}/${relativePath}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${hreflangs}
    <xhtml:link rel="alternate" hreflang="x-default" href="${CONFIG.baseUrl}/en/${slug}"/>
  </url>`;
  }).join('');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

// Generate all sitemaps
fs.writeFileSync(`${CONFIG.distDir}/sitemap.xml`, generateSitemapIndex());
CONFIG.languages.forEach(lang => {
  fs.writeFileSync(`${CONFIG.distDir}/sitemap-${lang}.xml`, generateLanguageSitemap(lang));
});

console.log('📍 Sitemaps generated');
```

### Image Optimization Script

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const SIZES = [400, 800, 1200];
const FORMATS = ['webp', 'avif'];

async function optimizeImages() {
  const images = glob.sync('src/assets/images/**/*.{jpg,jpeg,png}');
  
  for (const imagePath of images) {
    const dir = path.dirname(imagePath).replace('src/assets', 'dist');
    const basename = path.basename(imagePath, path.extname(imagePath));
    
    fs.mkdirSync(dir, { recursive: true });
    
    // Generate each size and format
    for (const size of SIZES) {
      for (const format of FORMATS) {
        const outputPath = `${dir}/${basename}-${size}.${format}`;
        
        await sharp(imagePath)
          .resize(size, null, { withoutEnlargement: true })
          .toFormat(format, { quality: format === 'avif' ? 65 : 80 })
          .toFile(outputPath);
        
        console.log(`Generated: ${outputPath}`);
      }
      
      // Also generate optimized JPEG
      const jpegPath = `${dir}/${basename}-${size}.jpg`;
      await sharp(imagePath)
        .resize(size, null, { withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(jpegPath);
    }
  }
}

optimizeImages().catch(console.error);
```

---

## Deployment

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        
      - name: Optimize images
        run: npm run build:images
        
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun --upload.target=temporary-public-storage
        continue-on-error: true
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Custom Domain Configuration

1. Create `CNAME` file in repository root:
```
topmexicotravel.com
```

2. Configure DNS:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR_USERNAME.github.io.
```

3. Enable HTTPS in repository Settings → Pages

---

## Testing & Validation

### Lighthouse CI Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/en/',
        'http://localhost:3000/en/cancun/',
        'http://localhost:3000/en/oaxaca/',
        'http://localhost:3000/en/guides/mexico-visa-requirements/'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.99 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Validation Checklist

Run before every deployment:

```bash
# Validate HTML
npx html-validate "dist/**/*.html"

# Validate structured data
# Use Google's Rich Results Test: https://search.google.com/test/rich-results

# Check broken links
npx broken-link-checker https://topmexicotravel.com --recursive

# Run Lighthouse
npm run lighthouse

# Validate sitemaps
# Use Google Search Console

# Check hreflang
# Use Aleyda Solis' hreflang tool: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run validate && npm run lighthouse"
    }
  }
}
```

---

## Contributing

### Content Guidelines

1. **All content must be original** or properly licensed (see Free Sources documentation)
2. **SEO titles**: 30-60 characters, include primary keyword
3. **Meta descriptions**: 120-160 characters, compelling and keyword-rich
4. **Featured snippets**: First paragraph 40-60 words, direct answer format
5. **Images**: Always include descriptive alt text, proper dimensions

### Code Style

- HTML: Semantic elements, ARIA where needed, proper heading hierarchy
- CSS: BEM naming, CSS custom properties, mobile-first
- JavaScript: Progressive enhancement only, no required JS for core functionality

### Pull Request Process

1. Create feature branch from `main`
2. Make changes, ensure all validation passes
3. Run `npm run lighthouse` - must achieve 100 scores
4. Submit PR with description of changes
5. Await review and merge

---

## License

Content: © 2026 Top Mexico Travel. All rights reserved.
Code: MIT License

---

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org)
- [Web.dev Performance](https://web.dev/performance)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse)
- [Hreflang Generator](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)
