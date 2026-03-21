import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS, buildApiUrl } from '../../constants/api-endpoints';
import { ApiResponse } from '../../models/api-response.model';
import { User, AuthResponse, LoginRequest, RegisterRequest, UserRole } from '../../models/user.model';
import { TokenService } from './token.service';
import { MockAuthService } from './mock-auth.service';
import { unwrapApiResponse } from '../../adapters/api-response.adapter';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  private refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly useMockAuth = environment.USE_MOCK !== false;

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
    return this.requestAuth({
      mockFactory: () => this.mockAuthService.login(credentials),
      apiFactory: () => this.http.post<ApiResponse<AuthResponse> | AuthResponse>(
        this.getAuthUrl(API_ENDPOINTS.AUTH.LOGIN),
        credentials
      ),
      errorMessage: 'Login failed',
    }).pipe(
      tap((response) => this.handleAuthResponse(response))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.requestAuth({
      mockFactory: () => this.mockAuthService.register(data),
      apiFactory: () => this.http.post<ApiResponse<AuthResponse> | AuthResponse>(
        this.getAuthUrl(API_ENDPOINTS.AUTH.REGISTER),
        data
      ),
      errorMessage: 'Registration failed',
    }).pipe(
      tap((response) => this.handleAuthResponse(response))
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

    return this.requestAuth({
      mockFactory: () => this.mockAuthService.refreshToken(),
      apiFactory: () => this.http.post<ApiResponse<AuthResponse> | AuthResponse>(
        this.getAuthUrl(API_ENDPOINTS.AUTH.REFRESH),
        { token }
      ),
      errorMessage: 'Token refresh failed',
    }).pipe(
      tap((response) => this.handleAuthResponse(response))
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUserRole(): UserRole {
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
      this.refreshTokenTimeout = null;
    }
  }

  private requestAuth<T>(config: {
    mockFactory: () => Observable<T>;
    apiFactory: () => Observable<ApiResponse<T> | T>;
    errorMessage: string;
  }): Observable<T> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const source = this.useMockAuth
      ? config.mockFactory()
      : config.apiFactory().pipe(map((response) => unwrapApiResponse(response)));

    return source.pipe(
      catchError((error) => {
        const message = this.extractErrorMessage(error, config.errorMessage);
        this.errorSubject.next(message);
        console.error(message, error);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  private getAuthUrl(path: string): string {
    return buildApiUrl(path);
  }

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message || fallback;
    }

    if (error && typeof error === 'object' && 'error' in error) {
      const payload = error as { error?: { message?: string } };
      return payload.error?.message || fallback;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      const payload = error as { message?: string };
      return payload.message || fallback;
    }

    return fallback;
  }
}
