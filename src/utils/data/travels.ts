import { Travel } from '@/utils/types/Travel';

export const mockTravels: Travel[] = [
  {
    id: '1',
    title: 'Japan Adventure',
    description: 'Exploring the vibrant streets of Tokyo, Kyoto, Osaka, Takayama and Hakone.',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    date: {
      start: '2024-03-26',
      end: '2024-04-06'
    },
    type: 'cultural',
    photos: [
      '/images/travels/tokyo-1.jpg',
      '/images/travels/tokyo-2.jpg',
      '/images/travels/tokyo-3.jpg'
    ],
    highlights: [
      'Shibuya Crossing',
      'Senso-ji Temple',
      'Tokyo Skytree',
      'Sushi at Tsukiji Market'
    ],
    tips: 'Get a Suica card for easy transportation. Visit temples early to avoid crowds. Eat everything!',
    rating: 5,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Barcelona Concert',
    description: 'Discovering Gaudí\'s masterpieces and Maneskin concert.',
    location: {
      country: 'Spain',
      city: 'Barcelona',
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    date: {
      start: '2023-07-10',
      end: '2023-07-17'
    },
    type: 'cultural',
    photos: [
      '/images/travels/barcelona-1.jpg',
      '/images/travels/barcelona-2.jpg'
    ],
    highlights: [
      'Sagrada Familia',
      'Park Güell',
      'Gothic Quarter',
      'Tapas in El Born'
    ],
    rating: 4,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Iceland ❄️',
    description: 'Full visit around the whole island.',
    location: {
      country: 'Iceland',
      city: 'Interlaken',
      coordinates: { lat: 64.0863, lng: -18.8632 }
    },
    date: {
      start: '2023-09-05',
      end: '2023-09-12'
    },
    type: 'adventure',
    photos: [
      '/images/travels/ice-1.jpg',
      '/images/travels/ice-2.jpg'
    ],
    highlights: [
      'Golden Circle',
      'Blue Lagoon',
      'Reykjavik City',
      'Northern Lights'
    ],
    rating: 5,
    isFeatured: false
  },
  {
    id: '4',
    title: 'San Francisco NBA',
    description: 'Tech conference and networking in the city that never sleeps.',
    location: {
      country: 'USA',
      city: 'San Francisco',
      coordinates: { lat: 37.7828, lng: -122.4560 }
    },
    date: {
      start: '2023-11-03',
      end: '2023-11-10'
    },
    type: 'cultural',
    photos: [
      '/images/travels/sfc-1.jpg'
    ],
    highlights: [
      'Golden Gate Bridge',
      'Alcatraz Island',
      'Fisherman\'s Wharf',
      'Chinatown', 
      'NBA Game'
    ],
    tips: 'Book Alcatraz tickets in advance. Use public transport to get around the city.',
    rating: 4,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Maldives Retreat',
    description: 'Relaxing beach vacation in tropical paradise.',
    location: {
      country: 'Maldives',
      city: 'Malé',
      coordinates: { lat: 4.2569, lng: 73.4525 }
    },
    date: {
      start: '2024-01-20',
      end: '2024-02-05'
    },
    type: 'vacation',
    photos: [
      '/images/travels/mald-1.jpg',
      '/images/travels/mald-2.jpg',
      '/images/travels/mald-3.jpg'
    ],
    highlights: [
      'Overwater Bungalow',
      'Snorkeling with Manta Rays',
      'Sunset',
      'Spa Day'
    ],
    rating: 5,
    isFeatured: true
  }
];