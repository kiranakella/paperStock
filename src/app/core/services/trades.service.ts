import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_ENDPOINTS, buildApiUrl } from '../constants/api-endpoints';
import { ApiResponse } from '../models/api-response.model';
import { Trade, TradeRequest, TradeResponse } from '../models/trade.model';
import { BaseDataService } from './base-data.service';
import { MOCK_TRADES } from '../../mock-data/trades.mock';
import { TradeDto, createTradeFromRequest, createTradeResponse, mapTradeDtoToTrade } from '../adapters/trade.adapter';
import { StocksService } from './stocks.service';

@Injectable({ providedIn: 'root' })
export class TradesService extends BaseDataService {
  private readonly tradesSubject = new BehaviorSubject<Trade[]>([]);
  readonly trades$ = this.tradesSubject.asObservable();

  private mockTrades: Trade[] = [...MOCK_TRADES];

  constructor(
    private http: HttpClient,
    private stocksService: StocksService
  ) {
    super();
  }

  loadTrades(): Observable<Trade[]> {
    return this.request<Trade[], TradeDto[]>({
      mockFactory: () => this.mockTrades,
      apiFactory: () => this.http.get<ApiResponse<TradeDto[]>>(buildApiUrl(API_ENDPOINTS.TRADES)),
      mapper: (trades) => trades.map(mapTradeDtoToTrade),
      errorMessage: 'Failed to load trades',
    }).pipe(tap((trades) => this.tradesSubject.next(trades)));
  }

  placeTrade(request: TradeRequest): Observable<TradeResponse> {
    const currentPrice = this.stocksService.getStockSnapshot(request.symbol)?.currentPrice ?? request.price ?? 0;

    return this.request<TradeResponse, TradeDto>({
      mockFactory: () => {
        const trade = createTradeFromRequest(
          request,
          currentPrice,
          '1',
          `trade-${this.mockTrades.length + 1}`
        );
        this.mockTrades = [trade, ...this.mockTrades];
        return trade;
      },
      apiFactory: () => this.http.post<ApiResponse<TradeDto>>(buildApiUrl(API_ENDPOINTS.TRADES), request),
      mapper: (trade) => createTradeResponse(mapTradeDtoToTrade(trade)),
      errorMessage: 'Failed to place trade',
    }).pipe(
      tap((response) => {
        if (response.trade) {
          this.tradesSubject.next([response.trade, ...this.tradesSubject.value]);
        }
      })
    );
  }
}
