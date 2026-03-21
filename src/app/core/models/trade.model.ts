export type TradeSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type TradeStatus = 'PENDING' | 'EXECUTED' | 'REJECTED' | 'CANCELLED';

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: TradeSide;
  orderType: OrderType;
  quantity: number;
  price: number;
  totalAmount: number;
  status: TradeStatus;
  executedPrice: number;
  executedQuantity: number;
  executedAmount: number;
  fees: number;
  reason?: string;
  createdAt: string;
  executedAt?: string;
}

export interface TradeRequest {
  symbol: string;
  type: TradeSide;
  orderType: OrderType;
  quantity: number;
  price?: number;  // Only for limit orders
}

export interface TradeResponse {
  success: boolean;
  trade?: Trade;
  message: string;
}
