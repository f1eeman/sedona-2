import type { Dict } from '@/i18n/ru'

const en: Dict = {
  site: {
    name: 'Sedona',
    legalName: 'Sedona city tourist portal',
  },
  language: {
    label: 'Site language',
    names: { ru: 'Русский', kk: 'Қазақша', en: 'English' },
  },
  pages: {
    index: {
      title: 'Sedona — hotel booking service',
      description:
        'Sedona is a small town in Arizona that deserves more. Five reasons to come and the best hotel offers.',
      heading: 'Online hotel booking service in Sedona',
    },
    photo: {
      title: 'Photo and video — Sedona',
      description:
        'Photos and a video presentation of Sedona: sunsets, cacti, roads and the daring bridge.',
      heading: 'Sights of Sedona',
      mediaTitle: 'Photo and video',
    },
    form: {
      title: 'Review form — Sedona',
      description:
        'Leave a review about Sedona hotels and the attractions you visited.',
      heading: 'Review form',
    },
    hotels: {
      title: 'Hotels — Sedona',
      description:
        'Hotels, motels and apartments in Sedona: filter by facilities, property type and price per night.',
      heading: 'Hotels',
    },
  },
  nav: {
    index: 'Home',
    photo: 'Photo and video',
    form: 'Review form',
    hotels: 'Hotels',
  },
  menu: { open: 'Open menu', close: 'Close menu' },
  footer: {
    social: {
      twitter: 'We are on Twitter',
      facebook: 'We are on Facebook',
      youtube: 'We are on YouTube',
    },
  },
  features: {
    heading: 'List of advantages',
    slogan: 'Sedona – a small town in Arizona that deserves more!',
    text: 'Let us look at 5 reasons why Sedona beats the Grand Canyon!',
    cards: {
      city: {
        title: 'A real town',
        number: '– No. 1 –',
        text: 'Sedona is not a tourist attraction, it has a life of its own',
        imageAlt: 'A photo of the town of Sedona',
      },
      bridge: {
        title: 'There is a daring bridge',
        number: '– No. 2 –',
        text: 'Yes, you can walk across it! If you dare, of course',
        imageAlt: 'A photo of the daring bridge in Sedona',
      },
      area: {
        title: 'A small area',
        number: '– No. 3 –',
        text: 'All the interesting places are very close together',
      },
      road: {
        title: 'A beautiful road',
        number: '– No. 4 –',
        text: 'The drive to Sedona from Las Vegas is not boring at all!',
      },
      tourists: {
        title: 'Few tourists',
        number: '– No. 5 –',
        text: 'Most people head for the Grand Canyon and crowd in there',
      },
    },
    comfort: {
      hotel: {
        title: 'Lodging',
        text: 'We recommend staying in a real motel, just like in the movies!',
      },
      gift: {
        title: 'Souvenirs',
        text: 'Not only made in China, but locally made too!',
      },
      food: {
        title: 'Food',
        text: 'Always order the signature burger, you will not be disappointed!',
      },
    },
  },
  appointment: {
    title: 'Interested?',
    text: 'Tell us your approximate travel dates and we will show you the best hotel offers in Sedona',
    action: 'Find a hotel',
  },
  map: {
    heading: 'How to reach us',
    frameTitle: 'Sedona on the map of Arizona',
    imageAlt: 'State of Arizona, city of Sedona',
  },
  gallery: {
    heading: 'Photo',
    intro:
      'Cannot make up your mind about the trip because of the exchange rate? The photos will help you forget about politics and economics.',
    author: 'Photo by:',
    like: 'Like',
    photos: {
      sunset: { title: 'Foreign expanses', author: 'Anton' },
      cactus: { title: 'Local vegetation', author: 'Sergey' },
      roads: { title: 'The road north', author: 'Pyotr' },
      bridge: { title: 'The daring bridge', author: 'Matvey' },
    },
  },
  video: {
    heading: 'Video',
    question: 'Still hesitating?',
    intro:
      'Watch the video presentation and hurry for the tickets before they go up in price yet again!',
    play: 'Play video',
    pause: 'Pause video',
    replay: 'Play again',
    progress: 'Video seek',
    soundOn: 'Turn sound on',
    soundOff: 'Turn sound off',
    fullscreen: 'Full screen',
  },
  hotels: {
    filterHeading: 'Hotel selection',
    facilitiesLegend: 'Facilities:',
    kindsLegend: 'Property type:',
    priceLegend: 'Price per night (RUB):',
    priceFrom: 'From',
    priceTo: 'To',
    priceFromLabel: 'Price from, RUB',
    priceToLabel: 'Price to, RUB',
    submit: 'Show',
    found: 'Found:',
    sortingGroup: 'Sorting',
    sortingTitle: 'Sort by:',
    sorts: { price: 'By price', kind: 'By type', rating: 'By rating' },
    directions: { asc: 'Ascending', desc: 'Descending' },
    catalogHeading: 'List of hotels',
    pricePrefix: 'from',
    priceUnit: 'RUB',
    more: 'Details',
    rating: 'Rating:',
    empty:
      'Nothing matched the given conditions. Remove some of the restrictions.',
    kinds: { hotel: 'Hotel', motel: 'Motel', apartments: 'Apartments' },
    facilities: { pool: 'Pool', parking: 'Parking', wifi: 'Wi-fi' },
  },
  reviewForm: {
    heading: 'Leave your review',
    intro:
      'Help our hotels get better! Leave a review about them, and about the attractions you visited',
    personLegend: 'Introduce yourself:',
    person: {
      'user-name': { label: 'First name*:', placeholder: 'Peter' },
      'user-surname': { label: 'Last name*:', placeholder: 'Ivanov' },
      'user-patronymic': {
        label: 'Middle name:',
        placeholder: 'Alexandrovich',
      },
    },
    contactsLegend: 'Contact information:',
    phoneWord: 'Contact',
    phoneTail: 'phone*:',
    phonePlaceholder: 'Enter a phone number',
    emailLabel: 'Email*:',
    emailPlaceholder: 'Enter an e-mail',
    impressionLegend: 'Your overall impression:',
    impressions: {
      good: 'Rather positive',
      bad: 'Rather negative',
      unknown: 'Hard to say',
    },
    attractionsLegend: 'Attractions visited:',
    attractions: {
      bridge: 'The daring bridge',
      mountain: 'Bell Rock',
      park: 'Slide Park',
      rocks: 'Red Rocks',
    },
    emotionsLegend: 'Describe your emotions:',
    additionalLabel: 'Additional information:',
    emotionsPlaceholder: 'Describe all your delights in detail',
    submit: 'Send review',
    required: '* – Required fields',
  },
  modal: {
    error: {
      title: 'Something went wrong!',
      text: 'Check the fields marked in red, most likely you forgot to fill them in',
      action: 'OK',
    },
    success: {
      title: 'Your review has been sent!',
      text: 'Thank you for taking part, your review has already reached us. We will publish it on the site shortly.',
      action: 'Close window',
    },
  },
}

export default en
