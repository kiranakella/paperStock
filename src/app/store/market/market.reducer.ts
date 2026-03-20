import { createReducer, on } from '@ngrx/store';
import { Stock } from '../../core/models/stock.model';
import * as MarketActions from './market.actions';

export interface MarketState {
  stocks: Stock[];
  stocksBySymbol: { [symbol: string]: Stock };
  isMarketOpen: boolean;
  isLoading: boolean;
  error: string | null;
  lastUpdate: string;
}

export const initialMarketState: MarketState = {
  stocks: [],
  stocksBySymbol: {},
  isMarketOpen: false,
  isLoading: false,
  error: null,
  lastUpdate: '',
};

export const marketReducer = createReducer(
  initialMarketState,

  // Market Status
  on(MarketActions.startMarket, (state) => ({
    ...state,
    isMarketOpen: true,
    lastUpdate: new Date().toISOString(),
  })),

  on(MarketActions.pauseMarket, (state) => ({
    ...state,
    isMarketOpen: false,
    lastUpdate: new Date().toISOString(),
  })),

  on(MarketActions.setMarketStatus, (state, { isOpen, lastUpdate }) => ({
    ...state,
    isMarketOpen: isOpen,
    lastUpdate,
  })),

  // Fetch Stocks
  on(MarketActions.fetchStocks, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(MarketActions.fetchStocksSuccess, (state, { stocks }) => {
    const stocksBySymbol: { [symbol: string]: Stock } = {};
    stocks.forEach((stock) => {
      stocksBySymbol[stock.symbol] = stock;
    });

    return {
      ...state,
      stocks,
      stocksBySymbol,
      isLoading: false,
      error: null,
      lastUpdate: new Date().toISOString(),
    };
  }),

  on(MarketActions.fetchStocksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Prices
  on(MarketActions.updatePrices, (state, { stocks }) => {
    const stocksBySymbol = { ...state.stocksBySymbol };
    stocks.forEach((stock) => {
      stocksBySymbol[stock.symbol] = stock;
    });

    return {
      ...state,
      stocks: state.stocks.map(
        (s) => stocksBySymbol[s.symbol] || s
      ),
      stocksBySymbol,
      lastUpdate: new Date().toISOString(),
    };
  }),

  on(MarketActions.updateStockPrice, (state, { symbol, price, change, changePercent, timestamp }) => {
    const currentStock = state.stocksBySymbol[symbol];
    if (!currentStock) return state;

    const updatedStock = {
      ...currentStock,
      currentPrice: price,
      change,
      changePercent,
      timestamp,
    };

    return {
      ...state,
      stocks: state.stocks.map((s) =>
        s.symbol === symbol ? updatedStock : s
      ),
      stocksBySymbol: {
        ...state.stocksBySymbol,
        [symbol]: updatedStock,
      },
      lastUpdate: timestamp,
    };
  }),

  // Reset Market
  on(MarketActions.resetMarket, () => ({
    ...initialMarketState,
  }))
);
