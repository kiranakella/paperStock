import { environment } from '../../../environments/environment';

export const API_VERSION = '/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/register`,
    REFRESH: `${API_VERSION}/auth/refresh`,
  },
  STOCKS: `${API_VERSION}/stocks`,
  STOCK_OPTIONS: `${API_VERSION}/stocks/options`,
  USERS: `${API_VERSION}/users`,
  TRADES: `${API_VERSION}/trades`,
  PORTFOLIO_BY_ROLE: (role: string) => `${API_VERSION}/portfolios/${role.toLowerCase()}`,
} as const;

export function buildApiUrl(path: string): string {
  return `${environment.apiUrl}${path}`;
}
