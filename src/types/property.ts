export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  type: 'house' | 'apartment' | 'condo' | 'villa';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  bookedAt: string;
}

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  type: string;
}
