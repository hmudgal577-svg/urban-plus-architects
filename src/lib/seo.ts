export interface StructuredDataOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'service' | 'project';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateOrganizationSchema(settings?: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ArchitectureFirm',
    '@id': 'https://urbanplusarchitects.com/#organization',
    name: settings?.studioName || 'Urban Plus Architects & Associates',
    alternateName: 'Urban Plus Architects Gwalior',
    url: 'https://urbanplusarchitects.com',
    logo: 'https://urbanplusarchitects.com/images/logo.png',
    founder: {
      '@type': 'Person',
      name: settings?.principalArchitect || 'Ar. Shailendra Bhadoria',
      jobTitle: 'Principal Architect',
    },
    foundingDate: settings?.establishedYear || '2012',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar',
      addressLocality: 'Gwalior',
      addressRegion: 'Madhya Pradesh',
      postalCode: '474005',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.2372',
      longitude: '78.2053',
    },
    areaServed: [
      'Gwalior',
      'Bhind',
      'Dabra',
      'Indore',
      'Jhansi',
      'Shivpuri',
      'Madhya Pradesh',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: settings?.email || 'urban.plusgwl@gmail.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      settings?.facebookUrl,
      settings?.instagramUrl,
      settings?.linkedinUrl,
      settings?.youtubeUrl,
    ].filter(Boolean),
  };
}

export function generateLocalBusinessSchema(settings?: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: settings?.studioName || 'Urban Plus Architects & Associates',
    image: settings?.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    '@id': 'https://urbanplusarchitects.com/#localbusiness',
    url: 'https://urbanplusarchitects.com',
    telephone: settings?.phone || '+91 751 245 0000',
    priceRange: '₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A-81, Aditya Puram, Opposite/Near DD Nagar, Deen Dayal Nagar',
      addressLocality: 'Gwalior',
      addressRegion: 'Madhya Pradesh',
      postalCode: '474005',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '10:00',
      closes: '19:00',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
