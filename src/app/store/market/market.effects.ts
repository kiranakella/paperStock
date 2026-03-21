import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StocksService } from '../../core/services/stocks.service';
import * as MarketActions from './market.actions';

@Injectable()
export class MarketEffects {
  fetchStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MarketActions.fetchStocks),
      switchMap(() =>
        this.stocksService.loadStocks().pipe(
          map((stocks) => MarketActions.fetchStocksSuccess({ stocks })),
          catchError((error) =>
            of(MarketActions.fetchStocksFailure({ error: this.getErrorMessage(error, 'Failed to load market data') }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private stocksService: StocksService
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
