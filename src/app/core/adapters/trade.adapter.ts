import { Trade, TradeRequest, TradeResponse } from '../models/trade.model';

export interface TradeDto {
  id?: string;
  userId?: string;
  user_id?: string;
  symbol: string;
  type: Trade['type'];
  orderType?: Trade['orderType'];
  order_type?: Trade['orderType'];
  quantity: number;
  price: number;
  totalAmount?: number;
  total_amount?: number;
  status: Trade['status'];
  executedPrice?: number;
  executed_price?: number;
  executedQuantity?: number;
  executed_quantity?: number;
  executedAmount?: number;
  executed_amount?: number;
  fees?: number;
  reason?: string;
  createdAt?: string;
  created_at?: string;
  executedAt?: string;
  executed_at?: string;
}

export function mapTradeDtoToTrade(dto: TradeDto): Trade {
  const price = dto.price ?? 0;
  const quantity = dto.quantity ?? 0;
  const executedPrice = dto.executedPrice ?? dto.executed_price ?? price;
  const executedQuantity = dto.executedQuantity ?? dto.executed_quantity ?? quantity;
  const executedAmount = dto.executedAmount ?? dto.executed_amount ?? Number((executedPrice * executedQuantity).toFixed(2));
  const totalAmount = dto.totalAmount ?? dto.total_amount ?? Number((price * quantity).toFixed(2));

  return {
    id: dto.id ?? `${dto.symbol}-${dto.createdAt ?? dto.created_at ?? Date.now()}`,
    userId: dto.userId ?? dto.user_id ?? '1',
    symbol: dto.symbol,
    type: dto.type,
    orderType: dto.orderType ?? dto.order_type ?? 'MARKET',
    quantity,
    price,
    totalAmount,
    status: dto.status,
    executedPrice,
    executedQuantity,
    executedAmount,
    fees: dto.fees ?? Number((totalAmount * 0.001).toFixed(2)),
    reason: dto.reason,
    createdAt: dto.createdAt ?? dto.created_at ?? new Date().toISOString(),
    executedAt: dto.executedAt ?? dto.executed_at,
  };
}

export function createTradeResponse(trade: Trade): TradeResponse {
  return {
    success: true,
    trade,
    message: 'Trade saved successfully',
  };
}

export function createTradeFromRequest(
  request: TradeRequest,
  currentPrice: number,
  userId: string,
  tradeId: string
): Trade {
  const price = request.orderType === 'LIMIT' ? (request.price ?? currentPrice) : currentPrice;
  const totalAmount = price * request.quantity;
  const fees = Number((totalAmount * 0.001).toFixed(2));
  const executedPrice = price;
  const executedQuantity = request.quantity;
  const executedAmount = Number((executedPrice * executedQuantity).toFixed(2));

  return {
    id: tradeId,
    userId,
    symbol: request.symbol,
    type: request.type,
    orderType: request.orderType,
    quantity: request.quantity,
    price,
    totalAmount,
    status: request.orderType === 'MARKET' ? 'EXECUTED' : 'PENDING',
    executedPrice,
    executedQuantity,
    executedAmount,
    fees,
    createdAt: new Date().toISOString(),
    executedAt: request.orderType === 'MARKET' ? new Date().toISOString() : undefined,
  };
}
