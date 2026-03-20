import { Portfolio, Holding } from '../models/portfolio.model';

/**
 * Mock Portfolio Factory
 * Generates sample portfolio data for different user roles
 */

export class MockPortfolioFactory {
  /**
   * Generate portfolio data based on user role
   */
  static generatePortfolio(userRole: 'ADMIN' | 'PAID' | 'FREE'): Portfolio {
    let holdings: Holding[];
    let totalInsvested: number;
    let cash: number;
    let totalValue: number;

    switch (userRole) {
      case 'ADMIN':
        holdings = [
          {
            symbol: 'RELIANCE',
            name: 'Reliance Industries',
            quantity: 20,
            avgPrice: 2850.50,
            currentPrice: 2925.50,
            totalInvested: 57010,
            currentValue: 58510,
            pnl: 1500,
            pnlPercent: 2.63,
            dayPnL: 250,
            dayPnLPercent: 0.86,
          },
          {
            symbol: 'TCS',
            name: 'Tata Consultancy Services',
            quantity: 15,
            avgPrice: 3200.75,
            currentPrice: 3350.00,
            totalInvested: 48011.25,
            currentValue: 50250,
            pnl: 2238.75,
            pnlPercent: 4.66,
            dayPnL: 450,
            dayPnLPercent: 1.36,
          },
          {
            symbol: 'INFY',
            name: 'Infosys Limited',
            quantity: 25,
            avgPrice: 2800.00,
            currentPrice: 2850.50,
            totalInvested: 70000,
            currentValue: 71262.5,
            pnl: 1262.5,
            pnlPercent: 1.80,
            dayPnL: 125,
            dayPnLPercent: 0.44,
          },
          {
            symbol: 'WIPRO',
            name: 'Wipro Limited',
            quantity: 40,
            avgPrice: 425.50,
            currentPrice: 460.75,
            totalInvested: 17020,
            currentValue: 18430,
            pnl: 1410,
            pnlPercent: 8.28,
            dayPnL: 180,
            dayPnLPercent: 0.39,
          },
          {
            symbol: 'HINDUNILVR',
            name: 'Hindustan Unilever',
            quantity: 10,
            avgPrice: 2600.00,
            currentPrice: 2550.00,
            totalInvested: 26000,
            currentValue: 25500,
            pnl: -500,
            pnlPercent: -1.92,
            dayPnL: -100,
            dayPnLPercent: -0.39,
          },
          {
            symbol: 'HCLTECH',
            name: 'HCL Technologies',
            quantity: 30,
            avgPrice: 1450.00,
            currentPrice: 1520.50,
            totalInvested: 43500,
            currentValue: 45615,
            pnl: 2115,
            pnlPercent: 4.86,
            dayPnL: 350,
            dayPnLPercent: 0.77,
          },
          {
            symbol: 'AXISBANK',
            name: 'Axis Bank',
            quantity: 50,
            avgPrice: 920.00,
            currentPrice: 945.75,
            totalInvested: 46000,
            currentValue: 47287.5,
            pnl: 1287.5,
            pnlPercent: 2.80,
            dayPnL: 500,
            dayPnLPercent: 0.53,
          },
          {
            symbol: 'ICICIBANK',
            name: 'ICICI Bank',
            quantity: 35,
            avgPrice: 880.00,
            currentPrice: 925.50,
            totalInvested: 30800,
            currentValue: 32392.5,
            pnl: 1592.5,
            pnlPercent: 5.17,
            dayPnL: 400,
            dayPnLPercent: 0.43,
          },
        ];
        totalInsvested = 338341.25;
        totalValue = 369247.5;
        cash = 130752.5;
        break;

      case 'PAID':
        holdings = [
          {
            symbol: 'INFY',
            name: 'Infosys Limited',
            quantity: 10,
            avgPrice: 2800.00,
            currentPrice: 2850.50,
            totalInvested: 28000,
            currentValue: 28505,
            pnl: 505,
            pnlPercent: 1.80,
            dayPnL: 50,
            dayPnLPercent: 0.44,
          },
          {
            symbol: 'TCS',
            name: 'Tata Consultancy Services',
            quantity: 5,
            avgPrice: 3200.75,
            currentPrice: 3350.00,
            totalInvested: 16003.75,
            currentValue: 16750,
            pnl: 746.25,
            pnlPercent: 4.66,
            dayPnL: 150,
            dayPnLPercent: 1.36,
          },
          {
            symbol: 'WIPRO',
            name: 'Wipro Limited',
            quantity: 15,
            avgPrice: 425.50,
            currentPrice: 460.75,
            totalInvested: 6382.5,
            currentValue: 6911.25,
            pnl: 528.75,
            pnlPercent: 8.28,
            dayPnL: 75,
            dayPnLPercent: 0.39,
          },
          {
            symbol: 'HCLTECH',
            name: 'HCL Technologies',
            quantity: 12,
            avgPrice: 1450.00,
            currentPrice: 1520.50,
            totalInvested: 17400,
            currentValue: 18246,
            pnl: 846,
            pnlPercent: 4.86,
            dayPnL: 140,
            dayPnLPercent: 0.77,
          },
          {
            symbol: 'AXISBANK',
            name: 'Axis Bank',
            quantity: 20,
            avgPrice: 920.00,
            currentPrice: 945.75,
            totalInvested: 18400,
            currentValue: 18915,
            pnl: 515,
            pnlPercent: 2.80,
            dayPnL: 200,
            dayPnLPercent: 0.53,
          },
          {
            symbol: 'RELIANCE',
            name: 'Reliance Industries',
            quantity: 8,
            avgPrice: 2850.50,
            currentPrice: 2925.50,
            totalInvested: 22804,
            currentValue: 23404,
            pnl: 600,
            pnlPercent: 2.63,
            dayPnL: 100,
            dayPnLPercent: 0.86,
          },
        ];
        totalInsvested = 108990.75;
        totalValue = 112731.25;
        cash = 137268.75;
        break;

      case 'FREE':
      default:
        holdings = [
          {
            symbol: 'INFY',
            name: 'Infosys Limited',
            quantity: 10,
            avgPrice: 2800.00,
            currentPrice: 2850.50,
            totalInvested: 28000,
            currentValue: 28505,
            pnl: 505,
            pnlPercent: 1.80,
            dayPnL: 50,
            dayPnLPercent: 0.44,
          },
          {
            symbol: 'WIPRO',
            name: 'Wipro Limited',
            quantity: 20,
            avgPrice: 425.50,
            currentPrice: 460.75,
            totalInvested: 8510,
            currentValue: 9215,
            pnl: 705,
            pnlPercent: 8.28,
            dayPnL: 100,
            dayPnLPercent: 0.39,
          },
          {
            symbol: 'AXISBANK',
            name: 'Axis Bank',
            quantity: 15,
            avgPrice: 920.00,
            currentPrice: 945.75,
            totalInvested: 13800,
            currentValue: 14186.25,
            pnl: 386.25,
            pnlPercent: 2.80,
            dayPnL: 150,
            dayPnLPercent: 0.53,
          },
          {
            symbol: 'HINDUNILVR',
            name: 'Hindustan Unilever',
            quantity: 5,
            avgPrice: 2600.00,
            currentPrice: 2550.00,
            totalInvested: 13000,
            currentValue: 12750,
            pnl: -250,
            pnlPercent: -1.92,
            dayPnL: -50,
            dayPnLPercent: -0.39,
          },
        ];
        totalInsvested = 63310;
        totalValue = 64656.25;
        cash = 35343.75;
        break;
    }

    const todayPnL = holdings.reduce((sum, h) => sum + h.dayPnL, 0);
    const totalInvestedAmount = totalInsvested;
    const todayPnLPercent =
      totalInvestedAmount > 0 ? (todayPnL / totalInvestedAmount) * 100 : 0;
    const totalPnL = totalValue - totalInvestedAmount;
    const totalPnLPercent =
      totalInvestedAmount > 0 ? (totalPnL / totalInvestedAmount) * 100 : 0;

    return {
      userId: `user-${userRole}`,
      totalValue: parseFloat(totalValue.toFixed(2)),
      investedValue: parseFloat(totalInvestedAmount.toFixed(2)),
      currentValue: parseFloat(totalValue.toFixed(2)),
      cash: parseFloat(cash.toFixed(2)),
      todayPnL: parseFloat(todayPnL.toFixed(2)),
      todayPnLPercent: parseFloat(todayPnLPercent.toFixed(2)),
      totalPnL: parseFloat(totalPnL.toFixed(2)),
      totalPnLPercent: parseFloat(totalPnLPercent.toFixed(2)),
      holdings,
      tradeCount: userRole === 'ADMIN' ? 45 : userRole === 'PAID' ? 28 : 12,
      lastUpdated: new Date().toISOString(),
    };
  }
}
