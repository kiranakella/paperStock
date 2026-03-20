import { createAction, props } from '@ngrx/store';
import { Stock } from '../../core/models/stock.model';

// Market Status Actions
export const startMarket = createAction(
  '[Market] Start Market'
);

export const pauseMarket = createAction(
  '[Market] Pause Market'
);

export const setMarketStatus = createAction(
  '[Market] Set Market Status',
  props<{ isOpen: boolean; lastUpdate: string }>()
);

// Price Update Actions
export const updatePrices = createAction(
  '[Market] Update Prices',
  props<{ stocks: Stock[] }>()
);

export const updateStockPrice = createAction(
  '[Market] Update Stock Price',
  props<{ symbol: string; price: number; change: number; changePercent: number; timestamp: string }>()
);

// Fetch Market Data Actions
export const fetchStocks = createAction(
  '[Market] Fetch Stocks'
);

export const fetchStocksSuccess = createAction(
  '[Market] Fetch Stocks Success',
  props<{ stocks: Stock[] }>()
);

export const fetchStocksFailure = createAction(
  '[Market] Fetch Stocks Failure',
  props<{ error: string }>()
);

// Reset Market Actions
export const resetMarket = createAction(
  '[Market] Reset Market Data'
);
