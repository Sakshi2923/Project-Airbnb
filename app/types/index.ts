export interface Property {
  id: number;
  category: string;
  title: string;
  description: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  image_url: string;
  location: string;
  amenities: string[];
  owner: {
    id: number;
    username: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_landlord: boolean;
}

export interface Reservation {
  id: number;
  property: Property;
  user: User;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
} 