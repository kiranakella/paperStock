import { createReducer, on } from '@ngrx/store';
import { User, AuthResponse } from '../../core/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    token: response.token,
    isLoading: false,
    isLoggedIn: true,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    token: response.token,
    isLoading: false,
    isLoggedIn: true,
    error: null,
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Refresh Token
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.refreshTokenSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    token: response.token,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    token: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
  })),

  // Update User
  on(AuthActions.updateUser, (state, { user }) => ({
    ...state,
    user,
  })),

  // Clear Error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
