import { createReducer, on } from '@ngrx/store';
import { Portfolio, Holding } from '../../core/models/portfolio.model';
import { MockPortfolioFactory } from '../../core/factories/mock-portfolio.factory';
import * as PortfolioActions from './portfolio.actions';

export interface PortfolioState {
  portfolio: Portfolio | null;
  holdings: Holding[];
  isLoading: boolean;
  error: string | null;
}

export const initialPortfolioState: PortfolioState = {
  portfolio: null,
  holdings: [],
  isLoading: false,
  error: null,
};

export const portfolioReducer = createReducer(
  initialPortfolioState,

  // Fetch Portfolio
  on(PortfolioActions.fetchPortfolio, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(PortfolioActions.fetchPortfolioSuccess, (state, { portfolio }) => ({
    ...state,
    portfolio,
    holdings: portfolio.holdings,
    isLoading: false,
    error: null,
  })),

  on(PortfolioActions.fetchPortfolioFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Fetch Holdings
  on(PortfolioActions.fetchHoldings, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(PortfolioActions.fetchHoldingsSuccess, (state, { holdings }) => ({
    ...state,
    holdings,
    isLoading: false,
    error: null,
  })),

  on(PortfolioActions.fetchHoldingsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Portfolio
  on(PortfolioActions.updatePortfolio, (state, { portfolio }) => ({
    ...state,
    portfolio,
    holdings: portfolio.holdings,
  })),

  // Update Holdings
  on(PortfolioActions.updateHoldings, (state, { holdings }) => ({
    ...state,
    holdings,
    portfolio: state.portfolio ? { ...state.portfolio, holdings } : null,
  })),

  // Update Portfolio Value
  on(PortfolioActions.updatePortfolioValue, (state, { totalValue, todayPnL, todayPnLPercent }) => ({
    ...state,
    portfolio: state.portfolio
      ? {
          ...state.portfolio,
          totalValue,
          currentValue: totalValue,
          todayPnL,
          todayPnLPercent,
        }
      : null,
  })),

  // Clear Portfolio
  on(PortfolioActions.clearPortfolio, (state) => ({
    ...state,
    portfolio: null,
    holdings: [],
    error: null,
  })),

  // Initialize Mock Portfolio
  on(PortfolioActions.initializeMockPortfolio, (state, { userRole }) => {
    const mockPortfolio = MockPortfolioFactory.generatePortfolio(userRole);
    return {
      ...state,
      portfolio: mockPortfolio,
      holdings: mockPortfolio.holdings,
      isLoading: false,
      error: null,
    };
  })
);
