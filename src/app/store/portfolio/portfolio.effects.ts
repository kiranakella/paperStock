import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PortfolioService } from '../../core/services/portfolio.service';
import * as PortfolioActions from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
  fetchPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.fetchPortfolio),
      switchMap(({ userRole }) =>
        this.portfolioService.loadPortfolio(userRole).pipe(
          map((portfolio) =>
            PortfolioActions.fetchPortfolioSuccess({ portfolio })
          ),
          catchError((error) =>
            of(PortfolioActions.fetchPortfolioFailure({ error: this.getErrorMessage(error, 'Failed to load portfolio') }))
          )
        )
      )
    )
  );

  fetchHoldings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.fetchHoldings),
      switchMap(({ userRole }) =>
        this.portfolioService.loadHoldings(userRole).pipe(
          map((holdings) =>
            PortfolioActions.fetchHoldingsSuccess({ holdings })
          ),
          catchError((error) =>
            of(PortfolioActions.fetchHoldingsFailure({ error: this.getErrorMessage(error, 'Failed to load holdings') }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioService
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
