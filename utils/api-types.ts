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

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  dob: string;
  address: string[];
  postcode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  password: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  price: number;

  is_location_offer?: boolean;
  is_rental?: boolean;

  co2_rating?: string;
  in_stock?: boolean | null;
  is_eco_friendly?: boolean;

  brand?: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };

  product_image?: {
    id: string;
    file_name?: string;
    title?: string;
    by_name?: string;
    by_url?: string;
    source_name?: string;
    source_url?: string;
  };
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

// =======================
// Invoice Create Request
// =======================

export interface CreateInvoiceRequest {
  billing_street: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  billing_postcode: string;

  payment_method: string;

  cart_id: string;

  payment_details?: {
    bank_name?: string;
    account_name?: string;
    account_number?: string;
  };
}

// =======================
// Invoice Create Response
// =======================

export interface InvoiceResponse {
  id: string;
  user_id: string;

  invoice_number: string;
  invoice_date: string;
  created_at: string;

  billing_street: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;

  subtotal: number;
  total: number;

  additional_discount_percentage: number | null;
  additional_discount_amount: number;

  eco_discount_percentage?: number;
  eco_discount_amount?: number;

  status?: string | null;
  status_message?: string | null;
}

// =======================
// Invoice Detail Response
// =======================

export interface InvoiceDetailsResponse {
  id: string;

  invoice_date: string;
  invoice_number: string;

  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;

  billing_postal_code: string | null;

  subtotal: number;
  total: number;

  additional_discount_percentage: number | null;
  additional_discount_amount: number;

  eco_discount_percentage?: number;
  eco_discount_amount?: number;

  status: string;
  status_message: string | null;

  created_at: string;

  user_id: string;

  invoicelines: InvoiceLine[];

  payment: InvoicePayment;
}

export interface InvoiceLine {
  id: string;

  invoice_id: string;
  product_id: string;

  unit_price: number;

  discount_percentage: number | null;
  discounted_price: number | null;

  quantity: number;

  product: ProductResponse;
}

export interface InvoicePayment {
  payment_method: string;

  payment_details?: {
    bank_name?: string;
    account_name?: string;
    account_number?: string;
  };
}
