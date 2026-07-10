export type RoomType = "Single Room" | "Shared Room" | "Studio" | "Apartment" | "Family Suite";

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  responseRate: number; // percentage
  responseTime: string; // e.g. "within an hour"
  memberSince: string; // e.g. "2021"
  phone: string;
  email: string;
}

export interface Room {
  id: string;
  title: string;
  slug: string;
  roomType: RoomType;
  price: number; // per month, in BDT
  currency: string;
  rating: number; // 0 - 5
  reviewsCount: number;
  address: string;
  area: string;
  city: string;
  description: string;
  size: number; // sqft
  capacity: number; // max occupants
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  available: boolean;
  availableFrom: string;
  images: string[];
  amenities: string[];
  rules: string[];
  owner: Owner;
  location: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
}