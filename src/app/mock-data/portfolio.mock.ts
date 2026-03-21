import { Portfolio, Holding } from '../core/models/portfolio.model';
import { UserRole } from '../core/models/user.model';

const ADMIN_HOLDINGS: Holding[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 20, avgPrice: 2850.5, currentPrice: 2925.5, totalInvested: 57010, currentValue: 58510, pnl: 1500, pnlPercent: 2.63, dayPnL: 250, dayPnLPercent: 0.86 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 15, avgPrice: 3200.75, currentPrice: 3350, totalInvested: 48011.25, currentValue: 50250, pnl: 2238.75, pnlPercent: 4.66, dayPnL: 450, dayPnLPercent: 1.36 },
  { symbol: 'INFY', name: 'Infosys Limited', quantity: 25, avgPrice: 2800, currentPrice: 2850.5, totalInvested: 70000, currentValue: 71262.5, pnl: 1262.5, pnlPercent: 1.8, dayPnL: 125, dayPnLPercent: 0.44 },
  { symbol: 'WIPRO', name: 'Wipro Limited', quantity: 40, avgPrice: 425.5, currentPrice: 460.75, totalInvested: 17020, currentValue: 18430, pnl: 1410, pnlPercent: 8.28, dayPnL: 180, dayPnLPercent: 0.39 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', quantity: 10, avgPrice: 2600, currentPrice: 2550, totalInvested: 26000, currentValue: 25500, pnl: -500, pnlPercent: -1.92, dayPnL: -100, dayPnLPercent: -0.39 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', quantity: 30, avgPrice: 1450, currentPrice: 1520.5, totalInvested: 43500, currentValue: 45615, pnl: 2115, pnlPercent: 4.86, dayPnL: 350, dayPnLPercent: 0.77 },
  { symbol: 'AXISBANK', name: 'Axis Bank', quantity: 50, avgPrice: 920, currentPrice: 945.75, totalInvested: 46000, currentValue: 47287.5, pnl: 1287.5, pnlPercent: 2.8, dayPnL: 500, dayPnLPercent: 0.53 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', quantity: 35, avgPrice: 880, currentPrice: 925.5, totalInvested: 30800, currentValue: 32392.5, pnl: 1592.5, pnlPercent: 5.17, dayPnL: 400, dayPnLPercent: 0.43 },
];

const PAID_HOLDINGS: Holding[] = [
  { symbol: 'INFY', name: 'Infosys Limited', quantity: 10, avgPrice: 2800, currentPrice: 2850.5, totalInvested: 28000, currentValue: 28505, pnl: 505, pnlPercent: 1.8, dayPnL: 50, dayPnLPercent: 0.44 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 5, avgPrice: 3200.75, currentPrice: 3350, totalInvested: 16003.75, currentValue: 16750, pnl: 746.25, pnlPercent: 4.66, dayPnL: 150, dayPnLPercent: 1.36 },
  { symbol: 'WIPRO', name: 'Wipro Limited', quantity: 15, avgPrice: 425.5, currentPrice: 460.75, totalInvested: 6382.5, currentValue: 6911.25, pnl: 528.75, pnlPercent: 8.28, dayPnL: 75, dayPnLPercent: 0.39 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', quantity: 12, avgPrice: 1450, currentPrice: 1520.5, totalInvested: 17400, currentValue: 18246, pnl: 846, pnlPercent: 4.86, dayPnL: 140, dayPnLPercent: 0.77 },
  { symbol: 'AXISBANK', name: 'Axis Bank', quantity: 20, avgPrice: 920, currentPrice: 945.75, totalInvested: 18400, currentValue: 18915, pnl: 515, pnlPercent: 2.8, dayPnL: 200, dayPnLPercent: 0.53 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 8, avgPrice: 2850.5, currentPrice: 2925.5, totalInvested: 22804, currentValue: 23404, pnl: 600, pnlPercent: 2.63, dayPnL: 100, dayPnLPercent: 0.86 },
];

const FREE_HOLDINGS: Holding[] = [
  { symbol: 'INFY', name: 'Infosys Limited', quantity: 10, avgPrice: 2800, currentPrice: 2850.5, totalInvested: 28000, currentValue: 28505, pnl: 505, pnlPercent: 1.8, dayPnL: 50, dayPnLPercent: 0.44 },
  { symbol: 'WIPRO', name: 'Wipro Limited', quantity: 20, avgPrice: 425.5, currentPrice: 460.75, totalInvested: 8510, currentValue: 9215, pnl: 705, pnlPercent: 8.28, dayPnL: 100, dayPnLPercent: 0.39 },
  { symbol: 'AXISBANK', name: 'Axis Bank', quantity: 15, avgPrice: 920, currentPrice: 945.75, totalInvested: 13800, currentValue: 14186.25, pnl: 386.25, pnlPercent: 2.8, dayPnL: 150, dayPnLPercent: 0.53 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', quantity: 5, avgPrice: 2600, currentPrice: 2550, totalInvested: 13000, currentValue: 12750, pnl: -250, pnlPercent: -1.92, dayPnL: -50, dayPnLPercent: -0.39 },
];

function createPortfolio(
  userRole: UserRole,
  holdings: Holding[],
  totalInvested: number,
  totalValue: number,
  cash: number,
  tradeCount: number
): Portfolio {
  const todayPnL = holdings.reduce((sum, holding) => sum + holding.dayPnL, 0);
  const todayPnLPercent = totalInvested > 0 ? Number(((todayPnL / totalInvested) * 100).toFixed(2)) : 0;
  const totalPnL = Number((totalValue - totalInvested).toFixed(2));
  const totalPnLPercent = totalInvested > 0 ? Number(((totalPnL / totalInvested) * 100).toFixed(2)) : 0;

  return {
    userId: `user-${userRole}`,
    totalValue: Number(totalValue.toFixed(2)),
    investedValue: Number(totalInvested.toFixed(2)),
    currentValue: Number(totalValue.toFixed(2)),
    cash: Number(cash.toFixed(2)),
    todayPnL: Number(todayPnL.toFixed(2)),
    todayPnLPercent,
    totalPnL,
    totalPnLPercent,
    holdings,
    tradeCount,
    lastUpdated: '2026-03-20T09:15:00.000Z',
  };
}

export const MOCK_PORTFOLIOS_BY_ROLE: Record<UserRole, Portfolio> = {
  ADMIN: createPortfolio('ADMIN', ADMIN_HOLDINGS, 338341.25, 369247.5, 130752.5, 45),
  PAID: createPortfolio('PAID', PAID_HOLDINGS, 108990.75, 112731.25, 137268.75, 28),
  FREE: createPortfolio('FREE', FREE_HOLDINGS, 63310, 64656.25, 35343.75, 12),
};
