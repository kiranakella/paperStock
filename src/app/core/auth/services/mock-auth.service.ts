import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private mockUsers = [
    {
      id: '1',
      email: 'admin@paperstockindia.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'ADMIN' as const,
      portfolioValue: 500000,
      investedValue: 350000,
      availableBalance: 150000,
      todayPnL: 5000,
      todayPnLPercent: 1.85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'paid@paperstockindia.com',
      password: 'paid123',
      name: 'Paid User',
      role: 'PAID' as const,
      portfolioValue: 250000,
      investedValue: 200000,
      availableBalance: 50000,
      todayPnL: 2500,
      todayPnLPercent: 1.25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      email: 'user@paperstockindia.com',
      password: 'user123',
      name: 'Free User',
      role: 'FREE' as const,
      portfolioValue: 100000,
      investedValue: 75000,
      availableBalance: 25000,
      todayPnL: 500,
      todayPnLPercent: 0.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return of(null).pipe(
      delay(1000), // Simulate API delay
      map(() => {
        const user = this.mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        return {
          user: {
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
          },
          token: `mock_jwt_token_${user.id}_${Date.now()}`,
          expiresIn: 3600,
        };
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

        const newUser = {
          id: (this.mockUsers.length + 1).toString(),
          email: data.email,
          password: data.password,
          name: data.name,
          role: 'FREE' as const,
          portfolioValue: 100000,
          investedValue: 0,
          availableBalance: 100000,
          todayPnL: 0,
          todayPnLPercent: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        this.mockUsers.push(newUser);

        return {
          user: {
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
          },
          token: `mock_jwt_token_${newUser.id}_${Date.now()}`,
          expiresIn: 3600,
        };
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return of({ user: null } as any).pipe(
      delay(500),
      map(() => {
        throw new Error('Token refresh not implemented in mock');
      })
    );
  }
}
