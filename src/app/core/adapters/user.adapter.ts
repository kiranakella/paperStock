import { AdminUser, AdminUserRecord } from '../models/admin-user.model';
import { User } from '../models/user.model';

export interface UserDto {
  id?: string;
  email: string;
  name: string;
  role: User['role'];
  portfolioValue?: number;
  portfolio_value?: number;
  investedValue?: number;
  invested_value?: number;
  availableBalance?: number;
  available_balance?: number;
  todayPnL?: number;
  today_pnl?: number;
  todayPnLPercent?: number;
  today_pnl_percent?: number;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  status?: AdminUser['status'];
  planLabel?: string;
  plan_label?: string;
  password?: string;
}

export function mapUserDtoToUser(dto: UserDto): User {
  return {
    id: dto.id ?? dto.email,
    email: dto.email,
    name: dto.name,
    role: dto.role,
    portfolioValue: dto.portfolioValue ?? dto.portfolio_value ?? 0,
    investedValue: dto.investedValue ?? dto.invested_value ?? 0,
    availableBalance: dto.availableBalance ?? dto.available_balance ?? 0,
    todayPnL: dto.todayPnL ?? dto.today_pnl ?? 0,
    todayPnLPercent: dto.todayPnLPercent ?? dto.today_pnl_percent ?? 0,
    createdAt: dto.createdAt ?? dto.created_at ?? new Date().toISOString(),
    updatedAt: dto.updatedAt ?? dto.updated_at ?? new Date().toISOString(),
  };
}

export function mapAdminUserRecordToAdminUser(record: AdminUserRecord | UserDto): AdminUser {
  const dto = record as UserDto;
  const user = mapUserDtoToUser(dto);

  return {
    ...user,
    status: dto.status ?? 'PENDING',
    planLabel: dto.planLabel ?? dto.plan_label ?? 'Starter',
  };
}
