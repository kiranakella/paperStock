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

// NIFTY 50 stocks for demo
export const NIFTY_50_STOCKS: StockList[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT' },
  { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT' },
  { symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG' },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Construction' },
  { symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT' },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking' },
  { symbol: 'HDFC', name: 'HDFC Bank', sector: 'Banking' },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Automotive' },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', sector: 'Finance' },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma' },
  { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories', sector: 'Pharma' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Chemicals' },
  { symbol: 'TECHM', name: 'Tech Mahindra', sector: 'IT' },
  { symbol: 'TITAN', name: 'Titan Company', sector: 'Retail' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', sector: 'Automotive' },
];
