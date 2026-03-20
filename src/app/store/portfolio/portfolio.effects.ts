import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as PortfolioActions from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
  fetchPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.fetchPortfolio),
      switchMap(() =>
        // TODO: Implement API call to fetch portfolio
        of({ userId: '', totalValue: 0, investedValue: 0, currentValue: 0, cash: 100000, todayPnL: 0, todayPnLPercent: 0, totalPnL: 0, totalPnLPercent: 0, holdings: [], tradeCount: 0, lastUpdated: new Date().toISOString() }).pipe(
          map((portfolio) =>
            PortfolioActions.fetchPortfolioSuccess({ portfolio })
          ),
          catchError((error) =>
            of(PortfolioActions.fetchPortfolioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  fetchHoldings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.fetchHoldings),
      switchMap(() =>
        // TODO: Implement API call to fetch holdings
        of([]).pipe(
          map((holdings) =>
            PortfolioActions.fetchHoldingsSuccess({ holdings })
          ),
          catchError((error) =>
            of(PortfolioActions.fetchHoldingsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
