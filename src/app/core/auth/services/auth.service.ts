import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../../models/user.model';
import { TokenService } from './token.service';
import { MockAuthService } from './mock-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private refreshTokenTimeout: any;
  private useMockAuth = (environment as any).useMockAuth !== false; // Use mock auth in development by default

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private mockAuthService: MockAuthService
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.tokenService.getToken();
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
        this.scheduleTokenRefresh();
      } catch (e) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    const loginRequest = this.useMockAuth
      ? this.mockAuthService.login(credentials)
      : this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials);

    return loginRequest.pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.message || error.message || 'Login failed'));
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    const registerRequest = this.useMockAuth
      ? this.mockAuthService.register(data)
      : this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data);

    return registerRequest.pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Register error:', error);
        return throwError(() => new Error(error.error?.message || error.message || 'Registration failed'));
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.clearTokenRefreshTimeout();
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const token = this.tokenService.getToken();
    if (!token) {
      return throwError(() => new Error('No token available'));
    }

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {}).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Token refresh error:', error);
        this.logout();
        return throwError(() => new Error('Token refresh failed'));
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUserRole(): string {
    return this.currentUserSubject.value?.role || 'FREE';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.tokenService.setToken(response.token, response.expiresIn);
    localStorage.setItem('user_data', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isLoggedInSubject.next(true);
    this.scheduleTokenRefresh();
  }

  private scheduleTokenRefresh(): void {
    const expiry = this.tokenService.getTokenExpiry();
    if (!expiry) return;

    this.clearTokenRefreshTimeout();

    // Refresh token 1 minute before expiry
    const refreshTime = expiry - Date.now() - 60 * 1000;

    if (refreshTime > 0) {
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe({
          error: () => this.logout()
        });
      }, refreshTime);
    }
  }

  private clearTokenRefreshTimeout(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }
}
