import { Stock, StockList } from '../core/models/stock.model';

export const MOCK_STOCK_OPTIONS: StockList[] = [
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
  { symbol: 'DRREDDY', name: "Dr. Reddy's Laboratories", sector: 'Pharma' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Chemicals' },
  { symbol: 'TECHM', name: 'Tech Mahindra', sector: 'IT' },
  { symbol: 'TITAN', name: 'Titan Company', sector: 'Retail' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', sector: 'Automotive' },
];

export const MOCK_STOCKS: Stock[] = [
  { id: '1', symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', currentPrice: 2925.5, previousClose: 2898.5, dayHigh: 2940, dayLow: 2875, change: 27, changePercent: 0.93, volume: 1250000, marketCap: 19780000000000, pe: 28.4, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', currentPrice: 3350, previousClose: 3322.25, dayHigh: 3368, dayLow: 3301, change: 27.75, changePercent: 0.84, volume: 820000, marketCap: 12350000000000, pe: 31.1, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '3', symbol: 'INFY', name: 'Infosys Limited', sector: 'IT', currentPrice: 2850.5, previousClose: 2815.25, dayHigh: 2862, dayLow: 2799, change: 35.25, changePercent: 1.25, volume: 930000, marketCap: 11800000000000, pe: 27.8, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '4', symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT', currentPrice: 460.75, previousClose: 452.1, dayHigh: 464.4, dayLow: 449.8, change: 8.65, changePercent: 1.91, volume: 6100000, marketCap: 2400000000000, pe: 24.5, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '5', symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', currentPrice: 2550, previousClose: 2568, dayHigh: 2572, dayLow: 2531, change: -18, changePercent: -0.7, volume: 510000, marketCap: 5980000000000, pe: 58.3, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '6', symbol: 'LT', name: 'Larsen & Toubro', sector: 'Construction', currentPrice: 3725.4, previousClose: 3690.2, dayHigh: 3741, dayLow: 3678, change: 35.2, changePercent: 0.95, volume: 430000, marketCap: 5120000000000, pe: 34.6, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '7', symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', currentPrice: 1520.5, previousClose: 1498.6, dayHigh: 1528, dayLow: 1489, change: 21.9, changePercent: 1.46, volume: 720000, marketCap: 4120000000000, pe: 26.9, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '8', symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', currentPrice: 945.75, previousClose: 935.2, dayHigh: 948.5, dayLow: 929.6, change: 10.55, changePercent: 1.13, volume: 3200000, marketCap: 2920000000000, pe: 16.2, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '9', symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', currentPrice: 925.5, previousClose: 918.9, dayHigh: 931.3, dayLow: 914.4, change: 6.6, changePercent: 0.72, volume: 2800000, marketCap: 6470000000000, pe: 18.7, timestamp: '2026-03-20T09:15:00.000Z' },
  { id: '10', symbol: 'HDFC', name: 'HDFC Bank', sector: 'Banking', currentPrice: 1685.25, previousClose: 1671.1, dayHigh: 1692, dayLow: 1660, change: 14.15, changePercent: 0.85, volume: 1750000, marketCap: 12800000000000, pe: 19.1, timestamp: '2026-03-20T09:15:00.000Z' },
];
