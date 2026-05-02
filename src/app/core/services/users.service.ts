import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_ENDPOINTS, buildApiUrl } from '../constants/api-endpoints';
import { ApiResponse } from '../models/api-response.model';
import { AdminUser, AdminUserRecord } from '../models/admin-user.model';
import { UserRole } from '../models/user.model';
import { BaseDataService } from './base-data.service';
import { MOCK_ADMIN_USERS, buildNewUserRecord } from '../../mock-data/users.mock';
import { UserDto, mapAdminUserRecordToAdminUser } from '../adapters/user.adapter';

export interface CreateAdminUserRequest {
  name: string;
  email: string;
  role: UserRole;
  status: AdminUser['status'];
  planLabel: string;
  portfolioValue: number;
  availableBalance: number;
  todayPnL: number;
}

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseDataService {
  private readonly usersSubject = new BehaviorSubject<AdminUser[]>([]);
  readonly users$ = this.usersSubject.asObservable();

  private mockUsers: AdminUserRecord[] = [...MOCK_ADMIN_USERS];

  constructor(private http: HttpClient) {
    super();
    this.useMock = true;
  }

  loadUsers(): Observable<AdminUser[]> {
    return this.request<AdminUser[], UserDto[]>({
      mockFactory: () => this.mockUsers,
      apiFactory: () => this.http.get<ApiResponse<UserDto[]>>(buildApiUrl(API_ENDPOINTS.USERS)),
      mapper: (users) => users.map(mapAdminUserRecordToAdminUser),
      errorMessage: 'Failed to load users',
    }).pipe(tap((users) => this.usersSubject.next(users)));
  }

  createUser(input: CreateAdminUserRequest): Observable<AdminUser> {
    return this.request<AdminUser, UserDto>({
      mockFactory: () => {
        const record = buildNewUserRecord({
          id: String(this.mockUsers.length + 1),
          ...input,
        });
        this.mockUsers = [record, ...this.mockUsers];
        return record;
      },
      apiFactory: () => this.http.post<ApiResponse<UserDto>>(buildApiUrl(API_ENDPOINTS.USERS), input),
      mapper: (user) => mapAdminUserRecordToAdminUser(user),
      errorMessage: 'Failed to create user',
    }).pipe(
      tap((user) => {
        const nextUsers = [user, ...this.usersSubject.value.filter((existing) => existing.email !== user.email)];
        this.usersSubject.next(nextUsers);
      })
    );
  }

  exportUsersCsv(users: AdminUser[]): string {
    const header = [
      'Name',
      'Email',
      'Role',
      'Status',
      'Plan',
      'PortfolioValue',
      'AvailableBalance',
      'TodayPnL',
      'CreatedAt',
    ];

    return [header, ...users.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.planLabel,
      user.portfolioValue,
      user.availableBalance,
      user.todayPnL,
      user.createdAt,
    ])]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');
  }
}
