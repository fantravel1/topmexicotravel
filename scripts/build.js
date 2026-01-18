#!/usr/bin/env node

/**
 * Top Mexico Travel - Static Site Build System
 * Generates 1000+ static HTML pages optimized for 100% Lighthouse scores
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { destinationImages, homepageImages, itineraryImages, genericImages } from '../data/images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  languages: ['en', 'es', 'de', 'fr', 'pt'],
  baseUrl: 'https://topmexicotravel.com',
  distDir: path.join(ROOT, 'dist'),
  contentDir: path.join(ROOT, 'content'),
  templatesDir: path.join(ROOT, 'src/templates'),
  partialsDir: path.join(ROOT, 'src/partials'),
  stylesDir: path.join(ROOT, 'src/styles'),
  assetsDir: path.join(ROOT, 'src/assets'),
  dataDir: path.join(ROOT, 'data')
};

// Simple Handlebars-like template engine
function compileTemplate(template, data) {
  let result = template;

  // Handle partials {{> partialName}}
  const partialRegex = /\{\{>\s*(\w+)\s*\}\}/g;
  let match;
  while ((match = partialRegex.exec(result)) !== null) {
    const partialPath = path.join(CONFIG.partialsDir, `${match[1]}.html`);
    if (fs.existsSync(partialPath)) {
      const partialContent = fs.readFileSync(partialPath, 'utf-8');
      result = result.replace(match[0], compileTemplate(partialContent, data));
    }
  }

  // Handle conditionals {{#if condition}}...{{/if}}
  const ifRegex = /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(ifRegex, (match, condition, content) => {
    const value = getNestedValue(data, condition.trim());
    return value ? compileTemplate(content, data) : '';
  });

  // Handle each loops {{#each items}}...{{/each}}
  const eachRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
  result = result.replace(eachRegex, (match, arrayName, itemTemplate) => {
    const array = data[arrayName];
    if (!Array.isArray(array)) return '';
    return array.map((item, index) => {
      const itemData = { ...data, ...item, this: item, '@index': index, '@first': index === 0, '@last': index === array.length - 1 };
      return compileTemplate(itemTemplate, itemData);
    }).join('');
  });

  // Handle unless {{#unless @last}}...{{/unless}}
  const unlessRegex = /\{\{#unless\s+([^}]+)\}\}([\s\S]*?)\{\{\/unless\}\}/g;
  result = result.replace(unlessRegex, (match, condition, content) => {
    const value = getNestedValue(data, condition.trim());
    return !value ? compileTemplate(content, data) : '';
  });

  // Handle helper functions {{eq a b}}
  const eqRegex = /\{\{#if\s+\(eq\s+(\w+)\s+'([^']+)'\)\}\}/g;
  result = result.replace(eqRegex, (match, varName, compareValue) => {
    return data[varName] === compareValue ? '' : '';
  });

  // Handle triple-brace (unescaped) {{{content}}}
  const tripleRegex = /\{\{\{(\w+)\}\}\}/g;
  result = result.replace(tripleRegex, (match, key) => {
    return data[key] !== undefined ? data[key] : '';
  });

  // Handle this.property {{this.name}}
  const thisRegex = /\{\{this\.(\w+)\}\}/g;
  result = result.replace(thisRegex, (match, key) => {
    const value = data.this ? data.this[key] : data[key];
    return escapeHtml(value !== undefined ? String(value) : '');
  });

  // Handle nested properties {{../name}}
  const parentRegex = /\{\{\.\.\/(\w+)\}\}/g;
  result = result.replace(parentRegex, (match, key) => {
    return escapeHtml(data[key] !== undefined ? String(data[key]) : '');
  });

  // Handle simple variables {{variableName}}
  const varRegex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  result = result.replace(varRegex, (match, key) => {
    const value = data[key];
    return escapeHtml(value !== undefined ? String(value) : '');
  });

  return result;
}

function getNestedValue(obj, path) {
  if (path.startsWith('@')) {
    return obj[path];
  }
  return path.split('.').reduce((o, k) => (o || {})[k], obj);
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Load critical CSS for inlining
function getCriticalCss() {
  const cssPath = path.join(CONFIG.stylesDir, 'critical.css');
  if (fs.existsSync(cssPath)) {
    return fs.readFileSync(cssPath, 'utf-8');
  }
  return '';
}

// Translation strings
const translations = {
  en: {
    home: 'Home',
    destinations: 'Destinations',
    things_to_do: 'Things to Do',
    hotels: 'Hotels',
    restaurants: 'Restaurants',
    itineraries: 'Itineraries',
    guides: 'Travel Guides',
    best_time: 'Best Time to Visit',
    avg_temp: 'Average Temperature',
    known_for: 'Known For',
    airport: 'Airport Code',
    about: 'About',
    getting_there: 'Getting There',
    getting_around: 'Getting Around',
    safety: 'Safety Information',
    faqs: 'Frequently Asked Questions'
  },
  es: {
    home: 'Inicio',
    destinations: 'Destinos',
    things_to_do: 'Qué Hacer',
    hotels: 'Hoteles',
    restaurants: 'Restaurantes',
    itineraries: 'Itinerarios',
    guides: 'Guías de Viaje',
    best_time: 'Mejor Época',
    avg_temp: 'Temperatura Promedio',
    known_for: 'Conocido Por',
    airport: 'Código de Aeropuerto',
    about: 'Acerca de',
    getting_there: 'Cómo Llegar',
    getting_around: 'Cómo Moverse',
    safety: 'Información de Seguridad',
    faqs: 'Preguntas Frecuentes'
  },
  de: {
    home: 'Startseite',
    destinations: 'Reiseziele',
    things_to_do: 'Aktivitäten',
    hotels: 'Hotels',
    restaurants: 'Restaurants',
    itineraries: 'Reiserouten',
    guides: 'Reiseführer',
    best_time: 'Beste Reisezeit',
    avg_temp: 'Durchschnittstemperatur',
    known_for: 'Bekannt für',
    airport: 'Flughafencode',
    about: 'Über',
    getting_there: 'Anreise',
    getting_around: 'Fortbewegung',
    safety: 'Sicherheitsinformationen',
    faqs: 'Häufig gestellte Fragen'
  },
  fr: {
    home: 'Accueil',
    destinations: 'Destinations',
    things_to_do: 'À Faire',
    hotels: 'Hôtels',
    restaurants: 'Restaurants',
    itineraries: 'Itinéraires',
    guides: 'Guides de Voyage',
    best_time: 'Meilleure Période',
    avg_temp: 'Température Moyenne',
    known_for: 'Connu Pour',
    airport: "Code d'Aéroport",
    about: 'À Propos',
    getting_there: 'Comment y Aller',
    getting_around: 'Se Déplacer',
    safety: 'Informations de Sécurité',
    faqs: 'Questions Fréquentes'
  },
  pt: {
    home: 'Início',
    destinations: 'Destinos',
    things_to_do: 'O Que Fazer',
    hotels: 'Hotéis',
    restaurants: 'Restaurantes',
    itineraries: 'Roteiros',
    guides: 'Guias de Viagem',
    best_time: 'Melhor Época',
    avg_temp: 'Temperatura Média',
    known_for: 'Conhecido Por',
    airport: 'Código do Aeroporto',
    about: 'Sobre',
    getting_there: 'Como Chegar',
    getting_around: 'Como se Locomover',
    safety: 'Informações de Segurança',
    faqs: 'Perguntas Frequentes'
  }
};

// Generate breadcrumbs
function generateBreadcrumbs(lang, type, name, slug) {
  const t = translations[lang];
  const breadcrumbs = [
    { name: t.destinations, url: `/${lang}/destinations/`, position: 2 }
  ];

  if (type === 'destination') {
    breadcrumbs.push({ name: name, url: `/${lang}/${slug}/`, position: 3, current: true });
  }

  return breadcrumbs;
}

// Generate a destination page
function generateDestinationPage(lang, content, template, criticalCss) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  // Use Unsplash images if available, fall back to SVG
  const imageData = destinationImages[content.slug];
  const heroImage = imageData ? imageData.hero : `/assets/images/destinations/${content.slug}-hero.svg`;
  const heroAlt = imageData ? imageData.alt : `${content.name}, Mexico - Travel destination`;

  // Extract quick facts from content
  const quickFacts = content.quick_facts || {};

  // Process attractions with fallback images
  const processedAttractions = (content.attractions || []).map(attr => ({
    ...attr,
    image: attr.image || (imageData?.gallery?.[0]) || genericImages.culture,
    url: `/${lang}/${content.slug}/things-to-do/#${attr.name.toLowerCase().replace(/\s+/g, '-')}`
  }));

  // Process neighborhoods with images
  const processedNeighborhoods = (content.neighborhoods || []).map(nb => ({
    ...nb,
    image: nb.image || (imageData?.neighborhoods?.[nb.slug]?.image) || genericImages.colonial,
    url: `/${lang}/${content.slug}/neighborhoods/${nb.slug || nb.name.toLowerCase().replace(/\s+/g, '-')}/`
  }));

  // Process restaurants with images
  const processedRestaurants = (content.restaurants || []).map(rest => ({
    ...rest,
    image: rest.image || genericImages.food,
    url: rest.url || '#'
  }));

  // Process hotels with images
  const processedHotels = (content.hotels || []).map(hotel => ({
    ...hotel,
    image: hotel.image || genericImages.colonial,
    url: hotel.url || '#'
  }));

  // Process day trips with images
  const processedDayTrips = (content.day_trips || []).map(trip => ({
    ...trip,
    image: trip.image || genericImages.ruins
  }));

  const pageData = {
    ...content,
    lang,
    t,
    critical_css: criticalCss,
    hero_image: heroImage,
    hero_image_alt: heroAlt,
    gallery_images: imageData ? imageData.gallery : [],
    canonical_url: `${CONFIG.baseUrl}/${lang}/${content.slug}/`,
    og_type: 'website',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: heroImage.startsWith('http') ? heroImage : `${CONFIG.baseUrl}${heroImage}`,
    og_image_alt: content.hero_alt || `${content.name}, Mexico`,
    meta_title: content.meta_title || `${content.name} Travel Guide 2026 | Top Mexico Travel`,
    meta_description: content.meta_description || `Complete ${content.name} travel guide: best things to do, hotels, restaurants, and insider tips for your Mexico vacation.`,
    tourist_types_json: JSON.stringify(content.tags || ['Beach', 'Culture', 'Adventure']),
    breadcrumbs: generateBreadcrumbs(lang, 'destination', content.name, content.slug),
    currentYear: new Date().getFullYear(),
    // Map quick facts for template
    best_time_to_visit: content.best_time_to_visit || quickFacts.best_time || 'Year-round',
    average_temperature: content.average_temperature || quickFacts.avg_temp || '25°C (77°F)',
    known_for: content.known_for || (content.highlights ? content.highlights.slice(0, 2).join(', ') : 'Beautiful scenery'),
    airport_code: content.airport_code || quickFacts.airport || 'Various',
    tagline: content.tagline || content.introduction?.snippet?.substring(0, 100) + '...' || `Discover ${content.name}`,
    featured_snippet_intro: content.featured_snippet_intro || content.introduction?.snippet || `Discover the best of ${content.name}, Mexico.`,
    introduction: content.introduction?.full || '',
    latitude: content.coordinates?.latitude || 23.6345,
    longitude: content.coordinates?.longitude || -102.5528,
    // Processed content with images
    attractions: processedAttractions,
    neighborhoods: processedNeighborhoods,
    featured_restaurants: processedRestaurants.slice(0, 4),
    featured_hotels: processedHotels.slice(0, 4),
    day_trips: processedDayTrips,
    // Practical info
    getting_there: content.practical_info?.getting_there || '',
    getting_around: content.practical_info?.getting_around || '',
    safety_info: content.practical_info?.safety_info || '',
    // Food guide
    food_guide: content.food_guide || null
  };

  return compileTemplate(template, pageData);
}

// Generate homepage
function generateHomepage(lang, template, criticalCss, destinations) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  // Select featured destinations with Unsplash images
  const featuredDestinations = destinations.slice(0, 8).map(d => {
    const imageData = destinationImages[d.slug];
    return {
      name: d.name,
      description: d.introduction?.snippet || d.tagline || `Explore ${d.name}, Mexico`,
      image: imageData ? imageData.hero.replace('w=1920&h=1080', 'w=800&h=600') : `/assets/images/destinations/${d.slug}-hero.svg`,
      url: `/${lang}/${d.slug}/`,
      tags: (d.tags || ['Beach', 'Culture']).slice(0, 3)
    };
  });

  const featuredItineraries = [
    {
      title: '7 Days in the Yucatán Peninsula',
      description: 'From Caribbean beaches to ancient pyramids, explore the best of the Yucatán.',
      image: itineraryImages['yucatan-7-days']?.image || '/assets/images/itineraries/yucatan-7-days.svg',
      url: `/${lang}/itineraries/yucatan-7-days/`,
      duration: '7 Days',
      destinations: ['Cancún', 'Tulum', 'Chichén Itzá']
    },
    {
      title: '5 Days in Mexico City',
      description: 'Culture, cuisine, and history in one of the world\'s greatest cities.',
      image: itineraryImages['mexico-city-5-days']?.image || '/assets/images/itineraries/cdmx-5-days.svg',
      url: `/${lang}/itineraries/mexico-city-5-days/`,
      duration: '5 Days',
      destinations: ['Mexico City']
    },
    {
      title: '10 Days: Pacific Coast Road Trip',
      description: 'Sun, surf, and seafood from Puerto Vallarta to Oaxaca.',
      image: itineraryImages['pacific-coast-10-days']?.image || '/assets/images/itineraries/pacific-coast.svg',
      url: `/${lang}/itineraries/pacific-coast-10-days/`,
      duration: '10 Days',
      destinations: ['Puerto Vallarta', 'Sayulita', 'Oaxaca']
    }
  ];

  const pageData = {
    lang,
    t,
    slug: '',
    critical_css: criticalCss,
    canonical_url: `${CONFIG.baseUrl}/${lang}/`,
    og_type: 'website',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: homepageImages.hero,
    og_image_alt: homepageImages.alt,
    hero_image: homepageImages.hero,
    hero_image_alt: homepageImages.alt,
    meta_title: 'Top Mexico Travel - Your Complete Guide to Mexico | Beaches, Culture, Adventure',
    meta_description: 'Plan your perfect Mexico vacation. Comprehensive guides to beaches, ancient ruins, cuisine, and culture. Expert tips for Cancún, Tulum, Mexico City, Oaxaca & more.',
    breadcrumbs: [],
    featured_destinations: featuredDestinations,
    featured_itineraries: featuredItineraries,
    currentYear: new Date().getFullYear()
  };

  return compileTemplate(template, pageData);
}

// Generate destinations listing page
function generateDestinationsListPage(lang, template, criticalCss, destinations) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  // Categorize destinations
  const beachTypes = ['beach', 'surf', 'eco-beach', 'desert-beach', 'lagoon'];
  const colonialTypes = ['colonial'];
  const culturalTypes = ['city', 'cultural'];
  const islandTypes = ['island'];

  const categorizeDestination = (d) => {
    const imageData = destinationImages[d.slug];
    return {
      name: d.name,
      description: d.introduction?.snippet?.substring(0, 120) + '...' || `Explore ${d.name}`,
      image: imageData ? imageData.hero.replace('w=1920&h=1080', 'w=800&h=600') : `/assets/images/destinations/${d.slug}-hero.svg`,
      url: `/${lang}/${d.slug}/`,
      state: d.state || 'Mexico',
      type: d.type || 'beach'
    };
  };

  const allDestinations = destinations.map(categorizeDestination);
  const beachDestinations = destinations.filter(d => beachTypes.includes(d.type)).map(categorizeDestination);
  const colonialDestinations = destinations.filter(d => colonialTypes.includes(d.type)).map(categorizeDestination);
  const culturalDestinations = destinations.filter(d => culturalTypes.includes(d.type)).map(categorizeDestination);
  const islandDestinations = destinations.filter(d => islandTypes.includes(d.type)).map(categorizeDestination);

  const pageData = {
    lang,
    t,
    slug: 'destinations',
    critical_css: criticalCss,
    canonical_url: `${CONFIG.baseUrl}/${lang}/destinations/`,
    og_type: 'website',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: homepageImages.hero,
    og_image_alt: 'Mexico Destinations - Beaches, Cities, Culture',
    hero_image: homepageImages.hero,
    hero_image_alt: 'Explore all Mexico destinations',
    meta_title: 'Mexico Destinations - Complete Travel Guide | Top Mexico Travel',
    meta_description: 'Explore all Mexico destinations: Caribbean beaches, colonial cities, ancient ruins, and vibrant culture. Find your perfect Mexican vacation spot.',
    destination_count: destinations.length,
    all_destinations: allDestinations,
    beach_destinations: beachDestinations,
    colonial_destinations: colonialDestinations,
    cultural_destinations: culturalDestinations,
    island_destinations: islandDestinations,
    currentYear: new Date().getFullYear()
  };

  return compileTemplate(template, pageData);
}

// Generate itineraries list page
function generateItinerariesListPage(lang, template, criticalCss, itineraries) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  const itineraryCards = itineraries.map(itin => ({
    title: itin.title,
    description: itin.introduction?.substring(0, 160) + '...' || `Explore ${itin.title}`,
    image: itin.hero_image?.replace('w=1920&h=1080', 'w=800&h=600') || '/assets/images/itineraries/default.svg',
    url: `/${lang}/itineraries/${itin.slug}/`,
    duration: itin.duration,
    destinations: itin.destinations || []
  }));

  const pageData = {
    lang,
    t,
    slug: 'itineraries',
    critical_css: criticalCss,
    canonical_url: `${CONFIG.baseUrl}/${lang}/itineraries/`,
    og_type: 'website',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: homepageImages.hero,
    og_image_alt: 'Mexico Travel Itineraries',
    hero_image: homepageImages.hero,
    hero_image_alt: 'Mexico Travel Itineraries',
    meta_title: 'Mexico Travel Itineraries - Day-by-Day Trip Plans | Top Mexico Travel',
    meta_description: 'Expertly crafted Mexico itineraries: 7 days in the Yucatán, 5 days in Mexico City, Pacific Coast road trips, and more. Complete day-by-day travel plans.',
    itineraries: itineraryCards,
    currentYear: new Date().getFullYear()
  };

  return compileTemplate(template, pageData);
}

// Generate individual itinerary page
function generateItineraryPage(lang, itinerary, template, criticalCss) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  const pageData = {
    ...itinerary,
    lang,
    t,
    critical_css: criticalCss,
    canonical_url: `${CONFIG.baseUrl}/${lang}/itineraries/${itinerary.slug}/`,
    og_type: 'article',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: itinerary.og_image || itinerary.hero_image,
    og_image_alt: itinerary.hero_alt || itinerary.title,
    meta_title: itinerary.meta_title || `${itinerary.title} | Top Mexico Travel`,
    meta_description: itinerary.meta_description || itinerary.introduction?.substring(0, 160),
    tourist_types_json: JSON.stringify(itinerary.best_for || ['Travelers']),
    day_count: itinerary.days?.length || 0,
    mid_range_budget: itinerary.estimated_budget?.mid_range || '$1,500-2,500 USD',
    getting_there: itinerary.practical_info?.getting_there || '',
    getting_around: itinerary.practical_info?.getting_around || '',
    currentYear: new Date().getFullYear()
  };

  return compileTemplate(template, pageData);
}

// Generate guides list page
function generateGuidesListPage(lang, template, criticalCss, guides) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  const guideCards = guides.map(guide => ({
    title: guide.title,
    description: guide.introduction?.substring(0, 160) + '...' || `Read ${guide.title}`,
    url: `/${lang}/guides/${guide.slug}/`,
    last_updated: guide.last_updated || ''
  }));

  const pageData = {
    lang,
    t,
    slug: 'guides',
    critical_css: criticalCss,
    canonical_url: `${CONFIG.baseUrl}/${lang}/guides/`,
    og_type: 'website',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: homepageImages.hero,
    og_image_alt: 'Mexico Travel Guides',
    hero_image: homepageImages.hero,
    hero_image_alt: 'Mexico Travel Guides',
    meta_title: 'Mexico Travel Guides - Visa, Safety, Budget & More | Top Mexico Travel',
    meta_description: 'Essential Mexico travel guides: visa requirements, safety tips, best time to visit, budget planning, and more. Everything you need for your trip.',
    guides: guideCards,
    currentYear: new Date().getFullYear()
  };

  return compileTemplate(template, pageData);
}

// Generate individual guide page
function generateGuidePage(lang, guide, template, criticalCss) {
  const t = translations[lang];
  const ogLocales = { en: 'en_US', es: 'es_MX', de: 'de_DE', fr: 'fr_FR', pt: 'pt_BR' };

  // Process sections to convert markdown-like content to HTML
  const processedSections = (guide.sections || []).map(section => ({
    ...section,
    content: section.content
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '</p><ul><li>')
      .replace(/\n(\d+)\. /g, '</p><ol><li>')
  }));

  const pageData = {
    ...guide,
    sections: processedSections,
    lang,
    t,
    critical_css: criticalCss,
    canonical_url: `${CONFIG.baseUrl}/${lang}/guides/${guide.slug}/`,
    og_type: 'article',
    og_locale: ogLocales[lang] || 'en_US',
    og_image: guide.og_image || guide.hero_image,
    og_image_alt: guide.hero_alt || guide.title,
    meta_title: guide.meta_title || `${guide.title} | Top Mexico Travel`,
    meta_description: guide.meta_description || guide.introduction?.substring(0, 160),
    currentYear: new Date().getFullYear()
  };

  return compileTemplate(template, pageData);
}

// Main build function
async function build() {
  console.log('🏗️  Building topmexicotravel.com...\n');

  // Clean and create dist directory
  if (fs.existsSync(CONFIG.distDir)) {
    fs.rmSync(CONFIG.distDir, { recursive: true });
  }
  fs.mkdirSync(CONFIG.distDir, { recursive: true });

  // Load templates
  const destinationTemplate = fs.readFileSync(path.join(CONFIG.templatesDir, 'destination.html'), 'utf-8');
  const homepageTemplate = fs.readFileSync(path.join(CONFIG.templatesDir, 'homepage.html'), 'utf-8');
  const destinationsListTemplate = fs.readFileSync(path.join(CONFIG.templatesDir, 'destinations-list.html'), 'utf-8');
  const itineraryTemplate = fs.existsSync(path.join(CONFIG.templatesDir, 'itinerary.html'))
    ? fs.readFileSync(path.join(CONFIG.templatesDir, 'itinerary.html'), 'utf-8')
    : null;
  const itinerariesListTemplate = fs.existsSync(path.join(CONFIG.templatesDir, 'itineraries-list.html'))
    ? fs.readFileSync(path.join(CONFIG.templatesDir, 'itineraries-list.html'), 'utf-8')
    : null;
  const guideTemplate = fs.existsSync(path.join(CONFIG.templatesDir, 'guide.html'))
    ? fs.readFileSync(path.join(CONFIG.templatesDir, 'guide.html'), 'utf-8')
    : null;
  const guidesListTemplate = fs.existsSync(path.join(CONFIG.templatesDir, 'guides-list.html'))
    ? fs.readFileSync(path.join(CONFIG.templatesDir, 'guides-list.html'), 'utf-8')
    : null;

  // Load critical CSS
  const criticalCss = getCriticalCss();

  // Load destination content
  const contentPath = path.join(CONFIG.contentDir, 'destinations/en');
  let destinations = [];

  if (fs.existsSync(contentPath)) {
    const files = fs.readdirSync(contentPath).filter(f => f.endsWith('.json'));
    destinations = files.map(f => {
      const content = JSON.parse(fs.readFileSync(path.join(contentPath, f), 'utf-8'));
      return content;
    });
  }

  // Load itinerary content
  const itinerariesPath = path.join(CONFIG.contentDir, 'itineraries/en');
  let itineraries = [];

  if (fs.existsSync(itinerariesPath)) {
    const itinFiles = fs.readdirSync(itinerariesPath).filter(f => f.endsWith('.json'));
    itineraries = itinFiles.map(f => {
      const content = JSON.parse(fs.readFileSync(path.join(itinerariesPath, f), 'utf-8'));
      return content;
    });
  }

  // Load guide content
  const guidesPath = path.join(CONFIG.contentDir, 'guides/en');
  let guides = [];

  if (fs.existsSync(guidesPath)) {
    const guideFiles = fs.readdirSync(guidesPath).filter(f => f.endsWith('.json'));
    guides = guideFiles.map(f => {
      const content = JSON.parse(fs.readFileSync(path.join(guidesPath, f), 'utf-8'));
      return content;
    });
  }

  // Generate pages for each language
  let pageCount = 0;

  for (const lang of CONFIG.languages) {
    console.log(`📝 Generating ${lang.toUpperCase()} pages...`);

    // Create language directory
    const langDir = path.join(CONFIG.distDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    // Generate homepage
    const homepageHtml = generateHomepage(lang, homepageTemplate, criticalCss, destinations);
    fs.writeFileSync(path.join(langDir, 'index.html'), homepageHtml);
    pageCount++;

    // Generate destinations listing page
    const destinationsDir = path.join(langDir, 'destinations');
    fs.mkdirSync(destinationsDir, { recursive: true });
    const destinationsListHtml = generateDestinationsListPage(lang, destinationsListTemplate, criticalCss, destinations);
    fs.writeFileSync(path.join(destinationsDir, 'index.html'), destinationsListHtml);
    pageCount++;

    // Generate destination pages
    for (const destination of destinations) {
      const destDir = path.join(langDir, destination.slug);
      fs.mkdirSync(destDir, { recursive: true });

      const html = generateDestinationPage(lang, destination, destinationTemplate, criticalCss);
      fs.writeFileSync(path.join(destDir, 'index.html'), html);
      pageCount++;

      // Create sub-pages (hotels, things-to-do, restaurants)
      const subPages = ['hotels', 'things-to-do', 'restaurants'];
      for (const sub of subPages) {
        const subDir = path.join(destDir, sub);
        fs.mkdirSync(subDir, { recursive: true });
        // Placeholder for sub-page generation
        fs.writeFileSync(path.join(subDir, 'index.html'), `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><title>${destination.name} ${sub} | Top Mexico Travel</title><meta http-equiv="refresh" content="0; url=/${lang}/${destination.slug}/"></head><body></body></html>`);
        pageCount++;
      }
    }

    // Generate itinerary pages
    if (itineraryTemplate && itinerariesListTemplate && itineraries.length > 0) {
      const itinerariesDir = path.join(langDir, 'itineraries');
      fs.mkdirSync(itinerariesDir, { recursive: true });

      // Generate itineraries list page
      const itinerariesListHtml = generateItinerariesListPage(lang, itinerariesListTemplate, criticalCss, itineraries);
      fs.writeFileSync(path.join(itinerariesDir, 'index.html'), itinerariesListHtml);
      pageCount++;

      // Generate individual itinerary pages
      for (const itinerary of itineraries) {
        const itinDir = path.join(itinerariesDir, itinerary.slug);
        fs.mkdirSync(itinDir, { recursive: true });

        const html = generateItineraryPage(lang, itinerary, itineraryTemplate, criticalCss);
        fs.writeFileSync(path.join(itinDir, 'index.html'), html);
        pageCount++;
      }
    }

    // Generate guide pages
    if (guideTemplate && guidesListTemplate && guides.length > 0) {
      const guidesDir = path.join(langDir, 'guides');
      fs.mkdirSync(guidesDir, { recursive: true });

      // Generate guides list page
      const guidesListHtml = generateGuidesListPage(lang, guidesListTemplate, criticalCss, guides);
      fs.writeFileSync(path.join(guidesDir, 'index.html'), guidesListHtml);
      pageCount++;

      // Generate individual guide pages
      for (const guide of guides) {
        const guideDir = path.join(guidesDir, guide.slug);
        fs.mkdirSync(guideDir, { recursive: true });

        const html = generateGuidePage(lang, guide, guideTemplate, criticalCss);
        fs.writeFileSync(path.join(guideDir, 'index.html'), html);
        pageCount++;
      }
    }
  }

  // Generate root index with language detection
  const rootIndex = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/en/">
  <link rel="alternate" hreflang="en" href="https://topmexicotravel.com/en/">
  <link rel="alternate" hreflang="es" href="https://topmexicotravel.com/es/">
  <link rel="alternate" hreflang="de" href="https://topmexicotravel.com/de/">
  <link rel="alternate" hreflang="fr" href="https://topmexicotravel.com/fr/">
  <link rel="alternate" hreflang="pt" href="https://topmexicotravel.com/pt/">
  <link rel="alternate" hreflang="x-default" href="https://topmexicotravel.com/en/">
  <title>Top Mexico Travel</title>
  <script>
    const lang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
    const supported = ['en', 'es', 'de', 'fr', 'pt'];
    const target = supported.includes(lang) ? lang : 'en';
    window.location.replace('/' + target + '/');
  </script>
</head>
<body>
  <p>Redirecting to <a href="/en/">English version</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(CONFIG.distDir, 'index.html'), rootIndex);
  pageCount++;

  // Copy static assets
  console.log('📦 Copying static assets...');

  // Copy CSS
  const stylesDistDir = path.join(CONFIG.distDir, 'styles');
  fs.mkdirSync(stylesDistDir, { recursive: true });
  if (fs.existsSync(path.join(CONFIG.stylesDir, 'main.css'))) {
    fs.copyFileSync(path.join(CONFIG.stylesDir, 'main.css'), path.join(stylesDistDir, 'main.css'));
  }

  // Copy assets if they exist
  const assetsDistDir = path.join(CONFIG.distDir, 'assets');
  if (fs.existsSync(CONFIG.assetsDir)) {
    copyDir(CONFIG.assetsDir, assetsDistDir);
  } else {
    fs.mkdirSync(assetsDistDir, { recursive: true });
  }

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://topmexicotravel.com/sitemap.xml

# Disallow admin/build paths
Disallow: /admin/
Disallow: /_build/
Disallow: /node_modules/

# AI Bots Welcome
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: CCBot
Allow: /
`;
  fs.writeFileSync(path.join(CONFIG.distDir, 'robots.txt'), robotsTxt);

  // Generate sitemap
  generateSitemap(destinations);

  // Copy CNAME if exists
  const cnameSrc = path.join(ROOT, 'CNAME');
  if (fs.existsSync(cnameSrc)) {
    fs.copyFileSync(cnameSrc, path.join(CONFIG.distDir, 'CNAME'));
  }

  // Add .nojekyll to skip Jekyll processing on GitHub Pages
  fs.writeFileSync(path.join(CONFIG.distDir, '.nojekyll'), '');

  console.log(`\n✅ Build complete! Generated ${pageCount} pages.`);
  console.log(`📁 Output: ${CONFIG.distDir}`);
}

// Helper: copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Generate sitemaps
function generateSitemap(destinations) {
  const today = new Date().toISOString().split('T')[0];

  // Generate sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CONFIG.languages.map(lang => `  <sitemap>
    <loc>${CONFIG.baseUrl}/sitemap-${lang}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(CONFIG.distDir, 'sitemap.xml'), sitemapIndex);

  // Generate language-specific sitemaps
  for (const lang of CONFIG.languages) {
    const urls = [
      { loc: `${CONFIG.baseUrl}/${lang}/`, priority: '1.0', changefreq: 'weekly' },
      ...destinations.map(d => ({
        loc: `${CONFIG.baseUrl}/${lang}/${d.slug}/`,
        priority: '0.8',
        changefreq: 'weekly'
      }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => {
  const hreflangs = CONFIG.languages.map(l =>
    `    <xhtml:link rel="alternate" hreflang="${l}" href="${url.loc.replace(`/${lang}/`, `/${l}/`)}"/>`
  ).join('\n');

  return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${hreflangs}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url.loc.replace(`/${lang}/`, '/en/')}"/>
  </url>`;
}).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(CONFIG.distDir, `sitemap-${lang}.xml`), sitemap);
  }

  console.log('📍 Sitemaps generated');
}

// Run build
build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
