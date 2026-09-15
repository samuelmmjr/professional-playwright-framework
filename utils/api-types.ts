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
