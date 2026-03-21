import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_ENDPOINTS, buildApiUrl } from '../constants/api-endpoints';
import { Stock, StockList } from '../models/stock.model';
import { StockDto, mapStockDtoToList, mapStockDtoToStock } from '../adapters/stock.adapter';
import { BaseDataService } from './base-data.service';
import { MOCK_STOCKS, MOCK_STOCK_OPTIONS } from '../../mock-data/stocks.mock';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class StocksService extends BaseDataService {
  private readonly stocksSubject = new BehaviorSubject<Stock[]>([]);
  readonly stocks$ = this.stocksSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  loadStocks(): Observable<Stock[]> {
    return this.request<Stock[], StockDto[]>({
      mockFactory: () => MOCK_STOCKS.map((stock) => ({
        id: stock.id,
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        currentPrice: stock.currentPrice,
        previousClose: stock.previousClose,
        dayHigh: stock.dayHigh,
        dayLow: stock.dayLow,
        change: stock.change,
        changePercent: stock.changePercent,
        volume: stock.volume,
        marketCap: stock.marketCap,
        pe: stock.pe,
        timestamp: stock.timestamp,
      })),
      apiFactory: () => this.http.get<ApiResponse<StockDto[]>>(buildApiUrl(API_ENDPOINTS.STOCKS)),
      mapper: (stocks) => stocks.map(mapStockDtoToStock),
      errorMessage: 'Failed to load stocks',
    }).pipe(tap((stocks) => this.stocksSubject.next(stocks)));
  }

  loadStockOptions(): Observable<StockList[]> {
    return this.request<StockList[], StockDto[]>({
      mockFactory: () => MOCK_STOCK_OPTIONS.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
      })),
      apiFactory: () => this.http.get<ApiResponse<StockDto[]>>(buildApiUrl(API_ENDPOINTS.STOCK_OPTIONS)),
      mapper: (stocks) => stocks.map(mapStockDtoToList),
      errorMessage: 'Failed to load stock options',
    });
  }

  getStockBySymbol(symbol: string): Observable<Stock | null> {
    return this.stocks$.pipe(
      map((stocks) => stocks.find((stock) => stock.symbol === symbol) || null)
    );
  }

  getStockSnapshot(symbol: string): Stock | null {
    return this.stocksSubject.value.find((stock) => stock.symbol === symbol) || null;
  }
}
