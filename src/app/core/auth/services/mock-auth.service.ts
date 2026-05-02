import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../models/user.model';
import { MOCK_AUTH_USERS, buildNewUserRecord } from '../../../mock-data/users.mock';
import { User } from '../../models/user.model';

function toAuthResponse(user: User): AuthResponse {
  return {
    user,
    token: `mock_jwt_token_${user.id}_${Date.now()}`,
    expiresIn: 3600,
  };
}

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private mockUsers = [...MOCK_AUTH_USERS];

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        if (credentials.username === 'demo' && credentials.password === 'demo123') {
          return toAuthResponse({
            id: 'demo-user',
            email: 'demo@paperstockindia.com',
            name: 'Demo Trader',
            role: 'FREE',
            portfolioValue: 100000,
            investedValue: 0,
            availableBalance: 100000,
            todayPnL: 0,
            todayPnLPercent: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }

        const user = this.mockUsers.find(
          (u) => (u.email === credentials.username || u.name === credentials.username) && u.password === credentials.password
        );

        if (!user) {
          throw new Error('Invalid username or password');
        }

        return toAuthResponse({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          portfolioValue: user.portfolioValue,
          investedValue: user.investedValue,
          availableBalance: user.availableBalance,
          todayPnL: user.todayPnL,
          todayPnLPercent: user.todayPnLPercent,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return of(null).pipe(
      delay(1500),
      map(() => {
        const existingUser = this.mockUsers.find((u) => u.email === data.email);
        if (existingUser) {
          throw new Error('Email already registered');
        }

        const newUser = buildNewUserRecord({
          id: (this.mockUsers.length + 1).toString(),
          email: data.email,
          name: data.name,
          role: 'FREE',
          status: 'ACTIVE',
          planLabel: 'Starter',
          portfolioValue: 100000,
          availableBalance: 100000,
          todayPnL: 0,
        });

        this.mockUsers.push(newUser);

        return toAuthResponse({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          portfolioValue: newUser.portfolioValue,
          investedValue: newUser.investedValue,
          availableBalance: newUser.availableBalance,
          todayPnL: newUser.todayPnL,
          todayPnLPercent: newUser.todayPnLPercent,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        });
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return of(null).pipe(
      delay(400),
      map(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
          throw new Error('No mock session available');
        }

        const user = JSON.parse(userData) as User;
        return toAuthResponse(user);
      })
    );
  }
}
