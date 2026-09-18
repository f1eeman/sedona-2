export type HotelKind = 'hotel' | 'motel' | 'apartments'
export type HotelFacility = 'pool' | 'parking' | 'wifi'

export interface Hotel {
  id: string
  title: string
  kind: HotelKind
  price: number
  rating: number
  image: string
  facilities: HotelFacility[]
}

export const HOTEL_KINDS: HotelKind[] = ['hotel', 'motel', 'apartments']

export const HOTEL_FACILITIES: HotelFacility[] = ['pool', 'parking', 'wifi']

export const HOTELS: Hotel[] = [
  {
    id: 'amara-resort-and-spa',
    title: 'Amara Resort & Spa',
    kind: 'hotel',
    price: 4000,
    rating: 8.5,
    image: '/img/hotels/amara-resort-and-spa.jpg',
    facilities: ['pool', 'wifi'],
  },
  {
    id: 'desert-quail-inn',
    title: 'Desert Quail Inn',
    kind: 'motel',
    price: 3000,
    rating: 8.9,
    image: '/img/hotels/desert-quail-inn.jpg',
    facilities: ['parking'],
  },
  {
    id: 'villas-at-poco-diablo',
    title: 'Villas at Poco Diablo',
    kind: 'apartments',
    price: 2000,
    rating: 9.2,
    image: '/img/hotels/villas-at-poco-diablo.jpg',
    facilities: ['pool', 'parking', 'wifi'],
  },
]

export const PRICE_LIMITS = { min: 0, max: 5000 }
