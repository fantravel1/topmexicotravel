#!/usr/bin/env node

/**
 * Asset Generator - Creates placeholder SVG images for all destinations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Destination themes with colors and icons
const destinations = {
  'cancun': { name: 'Cancún', type: 'beach', colors: ['#00D4FF', '#00B4D8'], tagline: 'Caribbean Paradise' },
  'tulum': { name: 'Tulum', type: 'beach-ruins', colors: ['#20B2AA', '#48D1CC'], tagline: 'Where Jungle Meets Sea' },
  'playa-del-carmen': { name: 'Playa del Carmen', type: 'beach', colors: ['#00CED1', '#40E0D0'], tagline: 'Riviera Maya\'s Heart' },
  'mexico-city': { name: 'Mexico City', type: 'city', colors: ['#6B7280', '#9CA3AF'], tagline: 'A World of Culture' },
  'oaxaca': { name: 'Oaxaca', type: 'cultural', colors: ['#DC2626', '#F97316'], tagline: 'Soul of Mexico' },
  'san-miguel-de-allende': { name: 'San Miguel', type: 'colonial', colors: ['#F59E0B', '#FBBF24'], tagline: 'Colonial Elegance' },
  'guadalajara': { name: 'Guadalajara', type: 'city', colors: ['#7C3AED', '#A78BFA'], tagline: 'Land of Mariachi' },
  'puerto-vallarta': { name: 'Puerto Vallarta', type: 'beach', colors: ['#0891B2', '#22D3EE'], tagline: 'Pacific Romance' },
  'los-cabos': { name: 'Los Cabos', type: 'desert-beach', colors: ['#D97706', '#F59E0B'], tagline: 'Desert Meets Sea' },
  'merida': { name: 'Mérida', type: 'colonial', colors: ['#059669', '#34D399'], tagline: 'The White City' },
  'guanajuato': { name: 'Guanajuato', type: 'colonial', colors: ['#EC4899', '#F472B6'], tagline: 'City of Colors' },
  'cozumel': { name: 'Cozumel', type: 'island', colors: ['#0EA5E9', '#38BDF8'], tagline: 'Diver\'s Paradise' },
  'isla-mujeres': { name: 'Isla Mujeres', type: 'island', colors: ['#14B8A6', '#5EEAD4'], tagline: 'Island of Women' },
  'holbox': { name: 'Holbox', type: 'island', colors: ['#06B6D4', '#67E8F9'], tagline: 'Car-Free Paradise' },
  'bacalar': { name: 'Bacalar', type: 'lagoon', colors: ['#0D9488', '#2DD4BF'], tagline: 'Lake of Seven Colors' },
  'puerto-escondido': { name: 'Puerto Escondido', type: 'surf', colors: ['#0369A1', '#0EA5E9'], tagline: 'Surf Capital' },
  'sayulita': { name: 'Sayulita', type: 'surf', colors: ['#FBBF24', '#FCD34D'], tagline: 'Bohemian Beach Town' },
  'todos-santos': { name: 'Todos Santos', type: 'desert', colors: ['#92400E', '#D97706'], tagline: 'Artist\'s Oasis' },
  'valladolid': { name: 'Valladolid', type: 'colonial', colors: ['#7C2D12', '#EA580C'], tagline: 'Gateway to Cenotes' },
  'huatulco': { name: 'Huatulco', type: 'eco-beach', colors: ['#15803D', '#22C55E'], tagline: 'Nine Pristine Bays' }
};

// Generate beach-style SVG
function generateBeachSVG(dest) {
  const [color1, color2] = dest.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB"/>
      <stop offset="100%" style="stop-color:#E0F7FA"/>
    </linearGradient>
    <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${color1}"/>
      <stop offset="100%" style="stop-color:${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="450" fill="url(#sky)"/>
  <rect y="400" width="1200" height="400" fill="url(#water)"/>
  <ellipse cx="100" cy="100" rx="60" ry="60" fill="#fff" opacity="0.8"/>
  <ellipse cx="130" cy="110" rx="50" ry="40" fill="#fff" opacity="0.6"/>
  <ellipse cx="300" cy="150" rx="80" ry="40" fill="#fff" opacity="0.5"/>
  <path d="M0 480 Q300 440 600 460 Q900 480 1200 450 L1200 530 L0 530 Z" fill="#F5DEB3"/>
  <path d="M0 510 Q200 500 400 510 Q600 520 800 510 Q1000 500 1200 510" stroke="#fff" stroke-width="3" fill="none" opacity="0.5"/>
  <g transform="translate(150, 320) scale(0.7)">
    <rect x="20" y="60" width="15" height="120" fill="#8B4513"/>
    <ellipse cx="27" cy="35" rx="55" ry="28" fill="#228B22" transform="rotate(-25 27 35)"/>
    <ellipse cx="27" cy="45" rx="50" ry="25" fill="#32CD32" transform="rotate(20 27 45)"/>
  </g>
  <g transform="translate(950, 300) scale(0.8)">
    <rect x="20" y="60" width="18" height="140" fill="#8B4513"/>
    <ellipse cx="29" cy="35" rx="60" ry="30" fill="#228B22" transform="rotate(25 29 35)"/>
    <ellipse cx="29" cy="45" rx="55" ry="28" fill="#32CD32" transform="rotate(-20 29 45)"/>
  </g>
  <text x="600" y="680" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#fff" opacity="0.95">${dest.name}</text>
  <text x="600" y="740" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">${dest.tagline}</text>
</svg>`;
}

// Generate city-style SVG
function generateCitySVG(dest) {
  const [color1, color2] = dest.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="citysky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A5F"/>
      <stop offset="50%" style="stop-color:#3D5A80"/>
      <stop offset="100%" style="stop-color:${color1}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#citysky)"/>
  <!-- Stars -->
  <circle cx="100" cy="80" r="2" fill="#fff"/>
  <circle cx="300" cy="120" r="1.5" fill="#fff"/>
  <circle cx="500" cy="60" r="2" fill="#fff"/>
  <circle cx="700" cy="100" r="1" fill="#fff"/>
  <circle cx="900" cy="50" r="2" fill="#fff"/>
  <circle cx="1100" cy="90" r="1.5" fill="#fff"/>
  <!-- Buildings -->
  <rect x="50" y="350" width="100" height="450" fill="${color1}" opacity="0.8"/>
  <rect x="60" y="380" width="20" height="30" fill="#FFE4B5" opacity="0.7"/>
  <rect x="100" y="380" width="20" height="30" fill="#FFE4B5" opacity="0.5"/>
  <rect x="180" y="280" width="120" height="520" fill="${color2}" opacity="0.9"/>
  <rect x="330" y="400" width="90" height="400" fill="${color1}" opacity="0.7"/>
  <rect x="450" y="320" width="150" height="480" fill="${color2}" opacity="0.85"/>
  <!-- Cathedral/Monument -->
  <rect x="550" y="250" width="100" height="550" fill="#D4A574"/>
  <polygon points="600,150 550,250 650,250" fill="#D4A574"/>
  <rect x="680" y="380" width="80" height="420" fill="${color1}" opacity="0.8"/>
  <rect x="790" y="300" width="130" height="500" fill="${color2}" opacity="0.9"/>
  <rect x="950" y="350" width="110" height="450" fill="${color1}" opacity="0.75"/>
  <rect x="1080" y="420" width="120" height="380" fill="${color2}" opacity="0.8"/>
  <text x="600" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#fff">${dest.name}</text>
  <text x="600" y="760" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">${dest.tagline}</text>
</svg>`;
}

// Generate colonial-style SVG
function generateColonialSVG(dest) {
  const [color1, color2] = dest.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="colonialsky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB"/>
      <stop offset="100%" style="stop-color:#B0E0E6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#colonialsky)"/>
  <!-- Cobblestone street -->
  <rect y="550" width="1200" height="250" fill="#696969"/>
  <ellipse cx="100" cy="650" rx="30" ry="20" fill="#808080" opacity="0.5"/>
  <ellipse cx="200" cy="680" rx="25" ry="18" fill="#808080" opacity="0.4"/>
  <ellipse cx="350" cy="640" rx="28" ry="19" fill="#808080" opacity="0.5"/>
  <!-- Colonial buildings -->
  <rect x="50" y="250" width="200" height="300" fill="${color1}"/>
  <rect x="70" y="280" width="50" height="80" fill="#8B4513"/>
  <rect x="150" y="280" width="50" height="80" fill="#8B4513"/>
  <rect x="70" y="400" width="50" height="80" fill="#8B4513"/>
  <rect x="150" y="400" width="50" height="80" fill="#8B4513"/>
  <rect x="100" y="450" width="80" height="100" fill="#4A3728"/>
  <rect x="300" y="200" width="180" height="350" fill="${color2}"/>
  <polygon points="390,100 300,200 480,200" fill="${color2}"/>
  <circle cx="390" cy="150" r="20" fill="#FFD700"/>
  <rect x="350" y="350" width="60" height="100" fill="#8B4513"/>
  <rect x="550" y="280" width="150" height="270" fill="#E8E4E1"/>
  <rect x="750" y="220" width="200" height="330" fill="${color1}"/>
  <rect x="1000" y="300" width="180" height="250" fill="${color2}"/>
  <text x="600" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#fff" stroke="#333" stroke-width="2">${dest.name}</text>
  <text x="600" y="760" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#fff" stroke="#333" stroke-width="1">${dest.tagline}</text>
</svg>`;
}

// Generate island-style SVG
function generateIslandSVG(dest) {
  const [color1, color2] = dest.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="islandsky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB"/>
      <stop offset="100%" style="stop-color:#E0F7FA"/>
    </linearGradient>
    <linearGradient id="islandwater" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${color1}"/>
      <stop offset="100%" style="stop-color:${color2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="450" fill="url(#islandsky)"/>
  <rect y="400" width="1200" height="400" fill="url(#islandwater)"/>
  <!-- Island -->
  <ellipse cx="600" cy="480" rx="350" ry="100" fill="#F5DEB3"/>
  <ellipse cx="600" cy="460" rx="250" ry="60" fill="#228B22"/>
  <!-- Palm trees on island -->
  <g transform="translate(450, 350) scale(0.5)">
    <rect x="20" y="60" width="12" height="100" fill="#8B4513"/>
    <ellipse cx="26" cy="35" rx="45" ry="22" fill="#228B22" transform="rotate(-20 26 35)"/>
    <ellipse cx="26" cy="40" rx="40" ry="20" fill="#32CD32" transform="rotate(25 26 40)"/>
  </g>
  <g transform="translate(650, 340) scale(0.6)">
    <rect x="20" y="60" width="14" height="110" fill="#8B4513"/>
    <ellipse cx="27" cy="35" rx="50" ry="25" fill="#228B22" transform="rotate(15 27 35)"/>
    <ellipse cx="27" cy="40" rx="45" ry="22" fill="#32CD32" transform="rotate(-25 27 40)"/>
  </g>
  <!-- Boat -->
  <path d="M850 520 Q870 540 890 520 L880 500 L860 500 Z" fill="#8B4513"/>
  <line x1="870" y1="500" x2="870" y2="470" stroke="#8B4513" stroke-width="2"/>
  <polygon points="870,470 870,490 895,480" fill="#fff"/>
  <!-- Waves -->
  <path d="M0 550 Q150 540 300 550 Q450 560 600 550 Q750 540 900 550 Q1050 560 1200 550" stroke="#fff" stroke-width="2" fill="none" opacity="0.5"/>
  <text x="600" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#fff">${dest.name}</text>
  <text x="600" y="760" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">${dest.tagline}</text>
</svg>`;
}

// Generate cultural/ruins style SVG
function generateCulturalSVG(dest) {
  const [color1, color2] = dest.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="culturalsky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FF8C00"/>
      <stop offset="50%" style="stop-color:#FFB347"/>
      <stop offset="100%" style="stop-color:#87CEEB"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#culturalsky)"/>
  <!-- Mountains -->
  <polygon points="0,600 200,350 400,600" fill="#228B22" opacity="0.6"/>
  <polygon points="300,600 550,300 800,600" fill="#228B22" opacity="0.7"/>
  <polygon points="700,600 950,380 1200,600" fill="#228B22" opacity="0.6"/>
  <!-- Pyramid -->
  <polygon points="600,200 400,500 800,500" fill="${color1}"/>
  <line x1="600" y1="200" x2="600" y2="500" stroke="${color2}" stroke-width="2" opacity="0.5"/>
  <line x1="500" y1="350" x2="700" y2="350" stroke="${color2}" stroke-width="2" opacity="0.5"/>
  <line x1="450" y1="425" x2="750" y2="425" stroke="${color2}" stroke-width="2" opacity="0.5"/>
  <!-- Steps -->
  <rect x="560" y="420" width="80" height="80" fill="${color2}" opacity="0.8"/>
  <!-- Ground -->
  <rect y="500" width="1200" height="300" fill="#8FBC8F"/>
  <!-- Agave plants -->
  <g transform="translate(100, 520) scale(0.4)">
    <polygon points="50,100 30,20 50,30 70,20" fill="#228B22"/>
    <polygon points="50,100 20,40 50,50 80,40" fill="#32CD32"/>
  </g>
  <g transform="translate(1000, 530) scale(0.5)">
    <polygon points="50,100 30,20 50,30 70,20" fill="#228B22"/>
    <polygon points="50,100 20,40 50,50 80,40" fill="#32CD32"/>
  </g>
  <text x="600" y="680" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#fff" stroke="#333" stroke-width="1">${dest.name}</text>
  <text x="600" y="740" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#fff">${dest.tagline}</text>
</svg>`;
}

// Main generation function
function generateDestinationSVG(slug, dest) {
  switch(dest.type) {
    case 'beach':
    case 'beach-ruins':
    case 'eco-beach':
    case 'surf':
    case 'lagoon':
    case 'desert-beach':
      return generateBeachSVG(dest);
    case 'city':
      return generateCitySVG(dest);
    case 'colonial':
    case 'desert':
      return generateColonialSVG(dest);
    case 'island':
      return generateIslandSVG(dest);
    case 'cultural':
      return generateCulturalSVG(dest);
    default:
      return generateBeachSVG(dest);
  }
}

// Generate all assets
async function generateAssets() {
  console.log('🎨 Generating image assets...\n');

  const destImagesDir = path.join(ROOT, 'src/assets/images/destinations');
  const imagesDir = path.join(ROOT, 'src/assets/images');
  const iconsDir = path.join(ROOT, 'src/assets/icons');

  // Ensure directories exist
  [destImagesDir, imagesDir, iconsDir].forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });

  // Generate destination images
  let count = 0;
  for (const [slug, dest] of Object.entries(destinations)) {
    const svg = generateDestinationSVG(slug, dest);
    const filePath = path.join(destImagesDir, `${slug}-hero.svg`);
    fs.writeFileSync(filePath, svg);
    count++;
    console.log(`  ✓ ${dest.name}`);
  }

  // Generate main hero image
  const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="herosky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B35"/>
      <stop offset="30%" style="stop-color:#FF8E53"/>
      <stop offset="60%" style="stop-color:#FFB347"/>
      <stop offset="100%" style="stop-color:#87CEEB"/>
    </linearGradient>
    <linearGradient id="heroocean" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00CED1"/>
      <stop offset="50%" style="stop-color:#20B2AA"/>
      <stop offset="100%" style="stop-color:#008B8B"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="600" fill="url(#herosky)"/>
  <circle cx="960" cy="300" r="80" fill="#FFD700" opacity="0.9"/>
  <circle cx="960" cy="300" r="100" fill="#FFD700" opacity="0.3"/>
  <ellipse cx="960" cy="700" rx="1200" ry="250" fill="url(#heroocean)"/>
  <path d="M0 750 Q480 680 960 720 Q1440 760 1920 700 L1920 1080 L0 1080 Z" fill="#F4E4BC"/>
  <g transform="translate(150, 450)">
    <rect x="45" y="100" width="25" height="220" fill="#8B4513"/>
    <ellipse cx="57" cy="50" rx="90" ry="45" fill="#228B22" transform="rotate(-30 57 50)"/>
    <ellipse cx="57" cy="60" rx="80" ry="40" fill="#32CD32" transform="rotate(20 57 60)"/>
    <ellipse cx="57" cy="45" rx="85" ry="42" fill="#228B22" transform="rotate(-55 57 45)"/>
  </g>
  <g transform="translate(1650, 430)">
    <rect x="45" y="100" width="28" height="240" fill="#8B4513"/>
    <ellipse cx="59" cy="50" rx="95" ry="47" fill="#228B22" transform="rotate(30 59 50)"/>
    <ellipse cx="59" cy="60" rx="85" ry="42" fill="#32CD32" transform="rotate(-20 59 60)"/>
    <ellipse cx="59" cy="45" rx="90" ry="45" fill="#228B22" transform="rotate(55 59 45)"/>
  </g>
  <path d="M0 700 Q320 680 640 700 Q960 720 1280 700 Q1600 680 1920 700" stroke="#fff" stroke-width="4" fill="none" opacity="0.4"/>
  <text x="960" y="950" text-anchor="middle" font-family="Georgia, serif" font-size="120" font-weight="bold" fill="#006847" opacity="0.15">MEXICO</text>
</svg>`;
  fs.writeFileSync(path.join(imagesDir, 'mexico-hero.svg'), heroSvg);

  // Generate placeholder image
  const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
  <rect width="400" height="300" fill="#E5E7EB"/>
  <text x="200" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#9CA3AF">Image Coming Soon</text>
</svg>`;
  fs.writeFileSync(path.join(imagesDir, 'placeholder.svg'), placeholderSvg);

  // Generate favicon
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#006847"/>
  <text x="16" y="23" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFD700">M</text>
</svg>`;
  fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), faviconSvg);

  // Generate itinerary images
  const itineraryDir = path.join(imagesDir, 'itineraries');
  fs.mkdirSync(itineraryDir, { recursive: true });

  const itineraries = [
    { name: 'yucatan-7-days', title: '7 Days Yucatán', colors: ['#00CED1', '#20B2AA'] },
    { name: 'cdmx-5-days', title: '5 Days CDMX', colors: ['#6B7280', '#9CA3AF'] },
    { name: 'pacific-coast', title: 'Pacific Coast', colors: ['#0891B2', '#22D3EE'] }
  ];

  for (const itin of itineraries) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="itingrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${itin.colors[0]}"/>
      <stop offset="100%" style="stop-color:${itin.colors[1]}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#itingrad)"/>
  <text x="200" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#fff">${itin.title}</text>
  <text x="200" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#fff" opacity="0.9">Travel Itinerary</text>
</svg>`;
    fs.writeFileSync(path.join(itineraryDir, `${itin.name}.svg`), svg);
  }

  console.log(`\n✅ Generated ${count} destination images + hero + itineraries + icons`);
}

generateAssets().catch(err => {
  console.error('❌ Asset generation failed:', err);
  process.exit(1);
});
