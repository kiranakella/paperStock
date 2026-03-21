import { User, UserRole } from './user.model';

export type AdminUserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

export interface AdminUser extends User {
  role: UserRole;
  status: AdminUserStatus;
  planLabel: string;
}

export interface AdminUserRecord extends AdminUser {
  password: string;
}
