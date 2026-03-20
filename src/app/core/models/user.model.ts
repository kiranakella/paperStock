export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'PAID' | 'FREE';
  portfolioValue: number;
  investedValue: number;
  availableBalance: number;
  todayPnL: number;
  todayPnLPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
