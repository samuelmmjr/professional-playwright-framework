export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: string;
  in_stock: boolean;
  is_eco_friendly: boolean;
}

export interface ProductsResponse {
  current_page: number;
  data: ProductResponse[];
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface CartResponse {
  id: string;
  additional_discount_percentage: number | null;
  lat: number | null;
  lng: number | null;
  cart_items: CartItem[];
}

export interface CartItem {
  id: string;
  quantity: number;
  discount_percentage: number | null;
  cart_id: string;
  product_id: string;
  product: ProductResponse;
}

export interface CartActionResponse {
  result: string;
}
