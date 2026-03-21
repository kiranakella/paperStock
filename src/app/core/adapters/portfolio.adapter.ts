import { Holding, Portfolio } from '../models/portfolio.model';

export interface HoldingDto extends Holding {
  total_invested?: number;
  current_value?: number;
  pnl_percent?: number;
  day_pnl?: number;
  day_pnl_percent?: number;
}

export interface PortfolioDto {
  user_id?: string;
  userId?: string;
  total_value?: number;
  totalValue?: number;
  invested_value?: number;
  investedValue?: number;
  current_value?: number;
  currentValue?: number;
  cash?: number;
  today_pnl?: number;
  todayPnL?: number;
  today_pnl_percent?: number;
  todayPnLPercent?: number;
  total_pnl?: number;
  totalPnL?: number;
  total_pnl_percent?: number;
  totalPnLPercent?: number;
  holdings?: HoldingDto[];
  trade_count?: number;
  tradeCount?: number;
  last_updated?: string;
  lastUpdated?: string;
}

export function mapHoldingDtoToHolding(dto: HoldingDto): Holding {
  return {
    symbol: dto.symbol,
    name: dto.name,
    quantity: dto.quantity,
    avgPrice: dto.avgPrice,
    currentPrice: dto.currentPrice,
    totalInvested: dto.totalInvested ?? dto.total_invested ?? 0,
    currentValue: dto.currentValue ?? dto.current_value ?? 0,
    pnl: dto.pnl,
    pnlPercent: dto.pnlPercent ?? dto.pnl_percent ?? 0,
    dayPnL: dto.dayPnL ?? dto.day_pnl ?? 0,
    dayPnLPercent: dto.dayPnLPercent ?? dto.day_pnl_percent ?? 0,
  };
}

export function mapPortfolioDtoToPortfolio(dto: PortfolioDto): Portfolio {
  return {
    userId: dto.userId ?? dto.user_id ?? '1',
    totalValue: dto.totalValue ?? dto.total_value ?? 0,
    investedValue: dto.investedValue ?? dto.invested_value ?? 0,
    currentValue: dto.currentValue ?? dto.current_value ?? 0,
    cash: dto.cash ?? 0,
    todayPnL: dto.todayPnL ?? dto.today_pnl ?? 0,
    todayPnLPercent: dto.todayPnLPercent ?? dto.today_pnl_percent ?? 0,
    totalPnL: dto.totalPnL ?? dto.total_pnl ?? 0,
    totalPnLPercent: dto.totalPnLPercent ?? dto.total_pnl_percent ?? 0,
    holdings: (dto.holdings ?? []).map(mapHoldingDtoToHolding),
    tradeCount: dto.tradeCount ?? dto.trade_count ?? 0,
    lastUpdated: dto.lastUpdated ?? dto.last_updated ?? new Date().toISOString(),
  };
}
