export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  timestamp: string;
}

export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
  high: number;
  low: number;
  volume: number;
}

export interface StockList {
  symbol: string;
  name: string;
  sector: string;
}
