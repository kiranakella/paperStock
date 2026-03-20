import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.reducer';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectPortfolio = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.portfolio
);

export const selectHoldings = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.holdings
);

export const selectPortfolioIsLoading = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.isLoading
);

export const selectPortfolioError = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.error
);

export const selectPortfolioValue = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.totalValue || 0
);

export const selectInvestedValue = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.investedValue || 0
);

export const selectCurrentValue = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.currentValue || 0
);

export const selectPortfolioPnL = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.totalPnL || 0
);

export const selectPortfolioPnLPercent = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.totalPnLPercent || 0
);

export const selectTodayPnL = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.todayPnL || 0
);

export const selectTodayPnLPercent = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.todayPnLPercent || 0
);

export const selectCash = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.cash || 0
);

export const selectHoldingCount = createSelector(
  selectHoldings,
  (holdings) => holdings.length
);

export const selectTradeCount = createSelector(
  selectPortfolio,
  (portfolio) => portfolio?.tradeCount || 0
);
