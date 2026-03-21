import { AdminUserRecord } from '../core/models/admin-user.model';
import { UserRole } from '../core/models/user.model';

export const MOCK_AUTH_USERS: AdminUserRecord[] = [
  {
    id: '1',
    email: 'admin@paperstockindia.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'ADMIN',
    status: 'ACTIVE',
    planLabel: 'Enterprise Admin',
    portfolioValue: 500000,
    investedValue: 350000,
    availableBalance: 150000,
    todayPnL: 5000,
    todayPnLPercent: 1.85,
    createdAt: '2026-01-10T08:00:00.000Z',
    updatedAt: '2026-03-20T09:15:00.000Z',
  },
  {
    id: '2',
    email: 'paid@paperstockindia.com',
    password: 'paid123',
    name: 'Paid User',
    role: 'PAID',
    status: 'ACTIVE',
    planLabel: 'Pro Trader',
    portfolioValue: 250000,
    investedValue: 200000,
    availableBalance: 50000,
    todayPnL: 2500,
    todayPnLPercent: 1.25,
    createdAt: '2026-01-12T08:00:00.000Z',
    updatedAt: '2026-03-20T09:15:00.000Z',
  },
  {
    id: '3',
    email: 'user@paperstockindia.com',
    password: 'user123',
    name: 'Free User',
    role: 'FREE',
    status: 'ACTIVE',
    planLabel: 'Starter',
    portfolioValue: 100000,
    investedValue: 75000,
    availableBalance: 25000,
    todayPnL: 500,
    todayPnLPercent: 0.5,
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-03-20T09:15:00.000Z',
  },
];

export const MOCK_ADMIN_USERS: AdminUserRecord[] = [
  ...MOCK_AUTH_USERS,
  {
    id: '4',
    email: 'riya.sharma@paperstockindia.com',
    password: 'riya123',
    name: 'Riya Sharma',
    role: 'PAID',
    status: 'ACTIVE',
    planLabel: 'Swing Elite',
    portfolioValue: 320000,
    investedValue: 240000,
    availableBalance: 80000,
    todayPnL: -1200,
    todayPnLPercent: -0.38,
    createdAt: '2026-02-03T08:00:00.000Z',
    updatedAt: '2026-03-20T09:15:00.000Z',
  },
  {
    id: '5',
    email: 'ganesh.kumar@paperstockindia.com',
    password: 'ganesh123',
    name: 'Ganesh Kumar',
    role: 'FREE',
    status: 'SUSPENDED',
    planLabel: 'Starter',
    portfolioValue: 85000,
    investedValue: 62000,
    availableBalance: 23000,
    todayPnL: 320,
    todayPnLPercent: 0.29,
    createdAt: '2026-02-10T08:00:00.000Z',
    updatedAt: '2026-03-20T09:15:00.000Z',
  },
];

export function buildNewUserRecord(input: {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AdminUserRecord['status'];
  planLabel: string;
  portfolioValue: number;
  availableBalance: number;
  todayPnL: number;
}): AdminUserRecord {
  const createdAt = new Date().toISOString();

  return {
    id: input.id,
    name: input.name,
    email: input.email,
    password: '',
    role: input.role,
    status: input.status,
    planLabel: input.planLabel,
    portfolioValue: input.portfolioValue,
    investedValue: Math.max(input.portfolioValue - input.availableBalance, 0),
    availableBalance: input.availableBalance,
    todayPnL: input.todayPnL,
    todayPnLPercent: input.portfolioValue ? Number(((input.todayPnL / input.portfolioValue) * 100).toFixed(2)) : 0,
    createdAt,
    updatedAt: createdAt,
  };
}
