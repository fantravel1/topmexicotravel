/**
 * Image Data - Curated Unsplash images for all destinations
 * All images are free to use under Unsplash license (free for commercial use, no attribution required)
 * Format: https://images.unsplash.com/photo-ID?w=WIDTH&q=QUALITY&fit=crop
 */

export const destinationImages = {
  // CANCÚN - Caribbean beaches, hotels, turquoise water
  'cancun': {
    hero: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=1920&h=1080&fit=crop&q=80',
    alt: 'Aerial view of Cancún Hotel Zone with turquoise Caribbean waters',
    gallery: [
      'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // TULUM - Ruins, beach, bohemian vibes
  'tulum': {
    hero: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1920&h=1080&fit=crop&q=80',
    alt: 'Tulum Mayan ruins overlooking the Caribbean Sea',
    gallery: [
      'https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548678747-f382e36e3e54?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // PLAYA DEL CARMEN - 5th Avenue, beach life
  'playa-del-carmen': {
    hero: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=1920&h=1080&fit=crop&q=80',
    alt: 'Beautiful beach in Playa del Carmen with palm trees',
    gallery: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // MEXICO CITY - Architecture, culture, urban - EXPANDED FEATURE
  'mexico-city': {
    hero: 'https://images.unsplash.com/photo-1518659526054-e8b8b4a8e1b6?w=1920&h=1080&fit=crop&q=80',
    alt: 'Palacio de Bellas Artes in Mexico City at sunset',
    gallery: [
      'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567622661983-57a88fbc03e5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574493264149-87880133a2ba?w=800&h=600&fit=crop&q=80'
    ],
    // LANDMARKS & ARCHITECTURE
    landmarks: {
      bellasArtes: {
        image: 'https://images.unsplash.com/photo-1518659526054-e8b8b4a8e1b6?w=1200&h=800&fit=crop&q=80',
        alt: 'Palacio de Bellas Artes - Art Nouveau and Art Deco masterpiece'
      },
      angelIndependencia: {
        image: 'https://images.unsplash.com/photo-1567622661983-57a88fbc03e5?w=1200&h=800&fit=crop&q=80',
        alt: 'Angel of Independence monument on Paseo de la Reforma'
      },
      zocalo: {
        image: 'https://images.unsplash.com/photo-1574493264149-87880133a2ba?w=1200&h=800&fit=crop&q=80',
        alt: 'Zócalo - the main plaza and Metropolitan Cathedral'
      },
      nationalPalace: {
        image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1200&h=800&fit=crop&q=80',
        alt: 'National Palace with Diego Rivera murals'
      },
      chapultepec: {
        image: 'https://images.unsplash.com/photo-1599063570110-a9ae6c5d47e4?w=1200&h=800&fit=crop&q=80',
        alt: 'Chapultepec Castle overlooking Mexico City'
      },
      latinoamericana: {
        image: 'https://images.unsplash.com/photo-1567627097931-5d9aabe8d1ee?w=1200&h=800&fit=crop&q=80',
        alt: 'Torre Latinoamericana - iconic Art Deco skyscraper'
      }
    },
    // NEIGHBORHOODS
    neighborhoods: {
      roma: {
        image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1200&h=800&fit=crop&q=80',
        alt: 'Colonia Roma - tree-lined streets and Art Deco architecture'
      },
      condesa: {
        image: 'https://images.unsplash.com/photo-1567622661983-57a88fbc03e5?w=1200&h=800&fit=crop&q=80',
        alt: 'La Condesa - hip cafés and beautiful parks'
      },
      coyoacan: {
        image: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=1200&h=800&fit=crop&q=80',
        alt: 'Coyoacán - bohemian charm and colonial architecture'
      },
      polanco: {
        image: 'https://images.unsplash.com/photo-1518659526054-e8b8b4a8e1b6?w=1200&h=800&fit=crop&q=80',
        alt: 'Polanco - upscale dining and luxury shopping'
      },
      centroHistorico: {
        image: 'https://images.unsplash.com/photo-1574493264149-87880133a2ba?w=1200&h=800&fit=crop&q=80',
        alt: 'Centro Histórico - colonial buildings and vibrant street life'
      },
      sanRafael: {
        image: 'https://images.unsplash.com/photo-1567627097931-5d9aabe8d1ee?w=1200&h=800&fit=crop&q=80',
        alt: 'San Rafael - Art Deco gems and local character'
      }
    },
    // MUSEUMS & CULTURE
    museums: {
      anthropology: {
        image: 'https://images.unsplash.com/photo-1580492516014-4d0c2e2bc3d8?w=1200&h=800&fit=crop&q=80',
        alt: 'National Museum of Anthropology - world-class Mesoamerican collection'
      },
      fridaKahlo: {
        image: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=1200&h=800&fit=crop&q=80',
        alt: 'Casa Azul - Frida Kahlo Museum in Coyoacán'
      },
      soumaya: {
        image: 'https://images.unsplash.com/photo-1567622661983-57a88fbc03e5?w=1200&h=800&fit=crop&q=80',
        alt: 'Museo Soumaya - stunning architecture and European art'
      },
      modernArt: {
        image: 'https://images.unsplash.com/photo-1574493264149-87880133a2ba?w=1200&h=800&fit=crop&q=80',
        alt: 'Museo de Arte Moderno in Chapultepec'
      },
      temploMayor: {
        image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1200&h=800&fit=crop&q=80',
        alt: 'Templo Mayor - ancient Aztec ruins in the heart of the city'
      }
    },
    // FOOD & DINING
    food: {
      tacos: {
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=800&fit=crop&q=80',
        alt: 'Authentic Mexico City street tacos al pastor'
      },
      fineDining: {
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop&q=80',
        alt: 'World-class contemporary Mexican cuisine'
      },
      market: {
        image: 'https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=1200&h=800&fit=crop&q=80',
        alt: 'Colorful market stalls with fresh produce and spices'
      },
      churros: {
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=800&fit=crop&q=80',
        alt: 'Traditional churros con chocolate'
      },
      mezcal: {
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&h=800&fit=crop&q=80',
        alt: 'Craft mezcal and cocktails'
      },
      mercado: {
        image: 'https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=1200&h=800&fit=crop&q=80',
        alt: 'Mercado Roma gourmet food hall'
      }
    },
    // STREETS & ATMOSPHERE
    streets: {
      reforma: {
        image: 'https://images.unsplash.com/photo-1567622661983-57a88fbc03e5?w=1200&h=800&fit=crop&q=80',
        alt: 'Paseo de la Reforma - grand boulevard'
      },
      colorfulBuildings: {
        image: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=1200&h=800&fit=crop&q=80',
        alt: 'Colorful colonial buildings in the historic center'
      },
      artDeco: {
        image: 'https://images.unsplash.com/photo-1567627097931-5d9aabe8d1ee?w=1200&h=800&fit=crop&q=80',
        alt: 'Art Deco architectural details'
      },
      night: {
        image: 'https://images.unsplash.com/photo-1518659526054-e8b8b4a8e1b6?w=1200&h=800&fit=crop&q=80',
        alt: 'Mexico City illuminated at night'
      },
      parqueEspana: {
        image: 'https://images.unsplash.com/photo-1567622661983-57a88fbc03e5?w=1200&h=800&fit=crop&q=80',
        alt: 'Parque España in Condesa'
      }
    },
    // DAY TRIPS
    dayTrips: {
      teotihuacan: {
        image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=800&fit=crop&q=80',
        alt: 'Pyramid of the Sun at Teotihuacán'
      },
      xochimilco: {
        image: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=1200&h=800&fit=crop&q=80',
        alt: 'Colorful trajineras on the canals of Xochimilco'
      }
    },
    credit: 'Unsplash'
  },

  // OAXACA - Culture, markets, Monte Albán
  'oaxaca': {
    hero: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=1920&h=1080&fit=crop&q=80',
    alt: 'Colorful streets of Oaxaca City with colonial architecture',
    gallery: [
      'https://images.unsplash.com/photo-1570737543098-1d3b7f9a69d0?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605216663980-b68d16e21e96?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // SAN MIGUEL DE ALLENDE - Colonial, colorful streets
  'san-miguel-de-allende': {
    hero: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=1920&h=1080&fit=crop&q=80',
    alt: 'Parroquia de San Miguel Arcángel church at sunset',
    gallery: [
      'https://images.unsplash.com/photo-1570737209776-adbb4a8e1ee5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621358733913-1e0a8f10ae9e?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // GUADALAJARA - Urban, mariachi, tequila country
  'guadalajara': {
    hero: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1920&h=1080&fit=crop&q=80',
    alt: 'Guadalajara Cathedral and historic center',
    gallery: [
      'https://images.unsplash.com/photo-1562790879-dfde56fb7223?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605216353764-e8c8b58d9b7d?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // PUERTO VALLARTA - Beach, malecón, sunsets
  'puerto-vallarta': {
    hero: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop&q=80',
    alt: 'Puerto Vallarta beachfront with mountains',
    gallery: [
      'https://images.unsplash.com/photo-1594498257662-0e4de8c6a68a?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580152969655-00a7c66e25b6?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // LOS CABOS - Desert meets ocean, El Arco
  'los-cabos': {
    hero: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&h=1080&fit=crop&q=80',
    alt: 'El Arco rock formation at Cabo San Lucas',
    gallery: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // MÉRIDA - Colonial, Yucatán culture
  'merida': {
    hero: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=1920&h=1080&fit=crop&q=80',
    alt: 'Mérida Cathedral and main plaza',
    gallery: [
      'https://images.unsplash.com/photo-1605216663741-f7b149f6e5c9?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569422901648-f9a1b2acda4c?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // GUANAJUATO - Colorful hillside city
  'guanajuato': {
    hero: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1920&h=1080&fit=crop&q=80',
    alt: 'Colorful buildings on hillsides of Guanajuato',
    gallery: [
      'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580152969655-00a7c66e25b6?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // COZUMEL - Diving, crystal clear water
  'cozumel': {
    hero: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&q=80',
    alt: 'Crystal clear waters of Cozumel for diving',
    gallery: [
      'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // ISLA MUJERES - Small island paradise
  'isla-mujeres': {
    hero: 'https://images.unsplash.com/photo-1548678747-f382e36e3e54?w=1920&h=1080&fit=crop&q=80',
    alt: 'Isla Mujeres beach with turquoise waters',
    gallery: [
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // HOLBOX - Car-free island, whale sharks
  'holbox': {
    hero: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1920&h=1080&fit=crop&q=80',
    alt: 'Pristine beach and shallow waters of Holbox Island',
    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // BACALAR - Lake of seven colors
  'bacalar': {
    hero: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1920&h=1080&fit=crop&q=80',
    alt: 'Bacalar Lagoon with its famous seven shades of blue',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // PUERTO ESCONDIDO - Surf capital
  'puerto-escondido': {
    hero: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1920&h=1080&fit=crop&q=80',
    alt: 'Surfer riding a wave at Puerto Escondido',
    gallery: [
      'https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // SAYULITA - Bohemian surf town
  'sayulita': {
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=80',
    alt: 'Colorful beach town of Sayulita',
    gallery: [
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // TODOS SANTOS - Artist colony, desert
  'todos-santos': {
    hero: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop&q=80',
    alt: 'Desert landscape meeting the Pacific at Todos Santos',
    gallery: [
      'https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // VALLADOLID - Colonial, cenotes gateway
  'valladolid': {
    hero: 'https://images.unsplash.com/photo-1569422901648-f9a1b2acda4c?w=1920&h=1080&fit=crop&q=80',
    alt: 'Colonial architecture in Valladolid town center',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // HUATULCO - Nine bays, eco-tourism
  'huatulco': {
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=80',
    alt: 'Pristine bay and beach in Huatulco',
    gallery: [
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // RIVIERA MAYA - Caribbean beaches, cenotes
  'riviera-maya': {
    hero: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=1920&h=1080&fit=crop&q=80',
    alt: 'Turquoise Caribbean waters along the Riviera Maya coastline',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // SAN CRISTÓBAL DE LAS CASAS - Highland colonial city
  'san-cristobal-de-las-casas': {
    hero: 'https://images.unsplash.com/photo-1605214332753-e91c7f3aff77?w=1920&h=1080&fit=crop&q=80',
    alt: 'Colonial streets of San Cristóbal de las Casas, Chiapas',
    gallery: [
      'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // COPPER CANYON - Dramatic canyon landscapes (Sierra Tarahumara)
  'copper-canyon': {
    hero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&q=80',
    alt: 'Dramatic canyon landscape in the Sierra Madre mountains',
    gallery: [
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // MONTERREY - Modern city with mountains (Cerro de la Silla)
  'monterrey': {
    hero: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1920&h=1080&fit=crop&q=80',
    alt: 'Monterrey cityscape with dramatic mountain backdrop',
    gallery: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // MORELIA - Pink stone colonial city
  'morelia': {
    hero: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=1920&h=1080&fit=crop&q=80',
    alt: 'Morelia Cathedral in pink cantera stone',
    gallery: [
      'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  },

  // QUERÉTARO - Colonial city, wine country
  'queretaro': {
    hero: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=1920&h=1080&fit=crop&q=80',
    alt: 'Querétaro aqueduct and colonial architecture',
    gallery: [
      'https://images.unsplash.com/photo-1574493264149-87880133a2ba?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop&q=80'
    ],
    credit: 'Unsplash'
  }
};

// Homepage hero image
export const homepageImages = {
  hero: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1920&h=1080&fit=crop&q=80',
  alt: 'Beautiful Mexican beach with palm trees and turquoise water',
  credit: 'Unsplash'
};

// Itinerary images
export const itineraryImages = {
  'yucatan-7-days': {
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=600&fit=crop&q=80',
    alt: 'Tulum ruins overlooking the Caribbean'
  },
  'mexico-city-5-days': {
    image: 'https://images.unsplash.com/photo-1518659526054-e8b8b4a8e1b6?w=800&h=600&fit=crop&q=80',
    alt: 'Palacio de Bellas Artes in Mexico City'
  },
  'pacific-coast-10-days': {
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop&q=80',
    alt: 'Surfer on the Pacific Coast of Mexico'
  },
  'weekend-mexico-city-3-days': {
    image: 'https://images.unsplash.com/photo-1518659526054-e8b8b4a8e1b6?w=800&h=600&fit=crop&q=80',
    alt: 'Mexico City weekend escape'
  },
  'riviera-maya-complete-8-days': {
    image: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=800&h=600&fit=crop&q=80',
    alt: 'Riviera Maya Caribbean beach and cenotes'
  },
  'foodie-mexico-10-days': {
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop&q=80',
    alt: 'Mexican food and culinary experiences'
  },
  'wellness-mexico-8-days': {
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop&q=80',
    alt: 'Cenote wellness and yoga in Mexico'
  }
};

// Generic Mexico images for placeholders
export const genericImages = {
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
  ruins: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=600&fit=crop&q=80',
  colonial: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?w=800&h=600&fit=crop&q=80',
  food: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop&q=80',
  culture: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?w=800&h=600&fit=crop&q=80',
  cenote: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80'
};
