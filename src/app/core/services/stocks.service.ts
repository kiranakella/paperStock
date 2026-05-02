import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Stock, StockList } from '../models/stock.model';
import { StockDto, mapStockDtoToList, mapStockDtoToStock } from '../adapters/stock.adapter';
import { BaseDataService } from './base-data.service';
import { MOCK_STOCKS, MOCK_STOCK_OPTIONS } from '../../mock-data/stocks.mock';
import { GraphqlApiService } from './graphql-api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StocksService extends BaseDataService {
  private readonly stocksSubject = new BehaviorSubject<Stock[]>([]);
  readonly stocks$ = this.stocksSubject.asObservable();

  constructor(private graphqlApi: GraphqlApiService) {
    super();
  }

  loadStocks(): Observable<Stock[]> {
    if (environment.USE_MOCK !== false) {
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
        apiFactory: () => this.graphqlApi.post<{ getStocks: StockDto[] }>(
          `
            query GetStocks {
              getStocks {
                id
                symbol
                name
                exchange
                price
              }
            }
          `
        ).pipe(map((response) => response.getStocks)),
        mapper: (stocks) => stocks.map(mapStockDtoToStock),
        errorMessage: 'Failed to load stocks',
      }).pipe(tap((stocks) => this.stocksSubject.next(stocks)));
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.graphqlApi.post<{ getStocks: StockDto[] }>(
      `
        query GetStocks {
          getStocks {
            id
            symbol
            name
            exchange
            price
          }
        }
      `
    ).pipe(
      map((response) => response.getStocks.map(mapStockDtoToStock)),
      tap((stocks) => this.stocksSubject.next(stocks)),
      catchError((error) => {
        const message = this.extractErrorMessage(error, 'Failed to load stocks');
        this.errorSubject.next(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  loadStockOptions(): Observable<StockList[]> {
    if (environment.USE_MOCK !== false) {
      return this.request<StockList[], StockDto[]>({
        mockFactory: () => MOCK_STOCK_OPTIONS.map((stock) => ({
          symbol: stock.symbol,
          name: stock.name,
          sector: stock.sector,
        })),
        apiFactory: () => this.graphqlApi.post<{ getStocks: StockDto[] }>(
          `
            query GetStocks {
              getStocks {
                id
                symbol
                name
                exchange
                price
              }
            }
          `
        ).pipe(map((response) => response.getStocks)),
        mapper: (stocks) => stocks.map(mapStockDtoToList),
        errorMessage: 'Failed to load stock options',
      });
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.graphqlApi.post<{ getStocks: StockDto[] }>(
      `
        query GetStocks {
          getStocks {
            id
            symbol
            name
            exchange
            price
          }
        }
      `
    ).pipe(
      map((response) => response.getStocks.map(mapStockDtoToList)),
      catchError((error) => {
        const message = this.extractErrorMessage(error, 'Failed to load stock options');
        this.errorSubject.next(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.loadingSubject.next(false))
    );
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
