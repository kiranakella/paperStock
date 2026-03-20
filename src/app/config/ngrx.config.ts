import { ActionReducerMap, StoreConfig } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState, authReducer } from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';
import { PortfolioState, portfolioReducer } from '../store/portfolio/portfolio.reducer';
import { PortfolioEffects } from '../store/portfolio/portfolio.effects';
import { MarketState, marketReducer } from '../store/market/market.reducer';

// App State Interface
export interface AppState {
  auth: AuthState;
  portfolio: PortfolioState;
  market: MarketState;
}

export const ngrxConfig = {
  reducers: {
    auth: authReducer,
    portfolio: portfolioReducer,
    market: marketReducer,
  } as ActionReducerMap<AppState>,

  storeConfig: {
    initialState: {},
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictStateSerializability: true,
      strictActionSerializability: true,
      strictActionWithinNgZone: true,
      strictActionTypeUniqueness: true,
    },
  } as StoreConfig<AppState>,

  effects: [AuthEffects, PortfolioEffects],

  devToolsConfig: {
    name: 'PaperStockIndia',
    maxAge: 25,
    logOnly: environment.production,
  },
};

