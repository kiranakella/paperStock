import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core/auth/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map((response) =>
            AuthActions.loginSuccess({ response })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: this.getErrorMessage(error, 'Login failed') }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ name, email, password }) =>
        this.authService.register({ name, email, password }).pipe(
          map((response) =>
            AuthActions.registerSuccess({ response })
          ),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: this.getErrorMessage(error, 'Registration failed') }))
          )
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((response) =>
            AuthActions.refreshTokenSuccess({ response })
          ),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({ error: this.getErrorMessage(error, 'Token refresh failed') }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logout()),
      map(() => AuthActions.logoutSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message || fallback;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message?: unknown }).message || fallback);
    }

    return fallback;
  }
}
