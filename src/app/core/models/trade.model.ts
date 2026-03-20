export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price: number;
  totalAmount: number;
  status: 'PENDING' | 'EXECUTED' | 'REJECTED' | 'CANCELLED';
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
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;  // Only for limit orders
}

export interface TradeResponse {
  success: boolean;
  trade?: Trade;
  message: string;
}
