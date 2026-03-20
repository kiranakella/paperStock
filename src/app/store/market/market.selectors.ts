import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarketState } from './market.reducer';

export const selectMarketState = createFeatureSelector<MarketState>('market');

export const selectAllStocks = createSelector(
  selectMarketState,
  (state: MarketState) => state.stocks
);

export const selectStocksBySymbol = createSelector(
  selectMarketState,
  (state: MarketState) => state.stocksBySymbol
);

export const selectIsMarketOpen = createSelector(
  selectMarketState,
  (state: MarketState) => state.isMarketOpen
);

export const selectMarketIsLoading = createSelector(
  selectMarketState,
  (state: MarketState) => state.isLoading
);

export const selectMarketError = createSelector(
  selectMarketState,
  (state: MarketState) => state.error
);

export const selectMarketLastUpdate = createSelector(
  selectMarketState,
  (state: MarketState) => state.lastUpdate
);

export const selectStockCount = createSelector(
  selectAllStocks,
  (stocks) => stocks.length
);

// Selector to get a specific stock by symbol
export const selectStockBySymbol = (symbol: string) =>
  createSelector(
    selectStocksBySymbol,
    (stocksBySymbol) => stocksBySymbol[symbol] || null
  );

// Selector to get stocks that have gainers (positive change)
export const selectGainers = createSelector(
  selectAllStocks,
  (stocks) => stocks.filter((s) => s.change > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 10)
);

// Selector to get stocks that have losers (negative change)
export const selectLosers = createSelector(
  selectAllStocks,
  (stocks) => stocks.filter((s) => s.change < 0).sort((a, b) => a.changePercent - b.changePercent).slice(0, 10)
);
