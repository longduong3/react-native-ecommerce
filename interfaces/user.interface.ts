export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  avatar?: string;
}

export interface Address {
  street: string;
  ward: string;
  district: string;
  city: string;
  zipCode?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

