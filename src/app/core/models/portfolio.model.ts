export interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalInvested: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
}

export interface Portfolio {
  userId: string;
  totalValue: number;
  investedValue: number;
  currentValue: number;
  cash: number;
  todayPnL: number;
  todayPnLPercent: number;
  totalPnL: number;
  totalPnLPercent: number;
  holdings: Holding[];
  tradeCount: number;
  lastUpdated: string;
}

export interface PortfolioStats {
  totalGains: number;
  totalLosses: number;
  winRate: number;
  maxGain: number;
  maxLoss: number;
  avgTradeSize: number;
  totalTrades: number;
}
