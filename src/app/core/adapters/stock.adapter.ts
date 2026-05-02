import { Stock, StockList } from '../models/stock.model';

export interface StockDto {
  id?: string;
  symbol: string;
  name: string;
  sector?: string;
  currentPrice?: number;
  previousClose?: number;
  dayHigh?: number;
  dayLow?: number;
  change?: number;
  changePercent?: number;
  volume?: number;
  marketCap?: number;
  pe?: number;
  timestamp?: string;
  price?: number;
  current_price?: number;
  previous_close?: number;
  day_high?: number;
  day_low?: number;
  change_percent?: number;
  market_cap?: number;
}

export function mapStockDtoToStock(dto: StockDto): Stock {
  const currentPrice = dto.currentPrice ?? dto.current_price ?? dto.price ?? 0;
  const previousClose = dto.previousClose ?? dto.previous_close ?? currentPrice;
  const dayHigh = dto.dayHigh ?? dto.day_high ?? currentPrice;
  const dayLow = dto.dayLow ?? dto.day_low ?? currentPrice;
  const change = dto.change ?? currentPrice - previousClose;
  const changePercent = dto.changePercent ?? dto.change_percent ?? (previousClose ? (change / previousClose) * 100 : 0);

  return {
    id: dto.id ?? dto.symbol,
    symbol: dto.symbol,
    name: dto.name,
    sector: dto.sector ?? '',
    currentPrice,
    previousClose,
    dayHigh,
    dayLow,
    change,
    changePercent,
    volume: dto.volume ?? 0,
    marketCap: dto.marketCap ?? dto.market_cap ?? 0,
    pe: dto.pe ?? 0,
    timestamp: dto.timestamp ?? new Date().toISOString(),
  };
}

export function mapStockDtoToList(dto: StockDto): StockList {
  return {
    symbol: dto.symbol,
    name: dto.name,
    sector: dto.sector ?? '',
  };
}
