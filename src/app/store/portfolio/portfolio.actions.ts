import { createAction, props } from '@ngrx/store';
import { Portfolio, Holding } from '../../core/models/portfolio.model';

// Fetch Portfolio Actions
export const fetchPortfolio = createAction(
  '[Portfolio] Fetch Portfolio'
);

export const fetchPortfolioSuccess = createAction(
  '[Portfolio] Fetch Portfolio Success',
  props<{ portfolio: Portfolio }>()
);

export const fetchPortfolioFailure = createAction(
  '[Portfolio] Fetch Portfolio Failure',
  props<{ error: string }>()
);

// Fetch Holdings Actions
export const fetchHoldings = createAction(
  '[Portfolio] Fetch Holdings'
);

export const fetchHoldingsSuccess = createAction(
  '[Portfolio] Fetch Holdings Success',
  props<{ holdings: Holding[] }>()
);

export const fetchHoldingsFailure = createAction(
  '[Portfolio] Fetch Holdings Failure',
  props<{ error: string }>()
);

// Update Portfolio Actions
export const updatePortfolio = createAction(
  '[Portfolio] Update Portfolio',
  props<{ portfolio: Portfolio }>()
);

export const updateHoldings = createAction(
  '[Portfolio] Update Holdings',
  props<{ holdings: Holding[] }>()
);

export const updatePortfolioValue = createAction(
  '[Portfolio] Update Portfolio Value',
  props<{ totalValue: number; todayPnL: number; todayPnLPercent: number }>()
);

// Clear Portfolio Actions
export const clearPortfolio = createAction(
  '[Portfolio] Clear Portfolio'
);

// Initialize Mock Portfolio Actions
export const initializeMockPortfolio = createAction(
  '[Portfolio] Initialize Mock Portfolio',
  props<{ userRole: 'ADMIN' | 'PAID' | 'FREE' }>()
);
