import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_ENDPOINTS, buildApiUrl } from '../constants/api-endpoints';
import { ApiResponse } from '../models/api-response.model';
import { Holding, Portfolio } from '../models/portfolio.model';
import { UserRole } from '../models/user.model';
import { BaseDataService } from './base-data.service';
import { MOCK_PORTFOLIOS_BY_ROLE } from '../../mock-data/portfolio.mock';
import { PortfolioDto, mapPortfolioDtoToPortfolio } from '../adapters/portfolio.adapter';

@Injectable({ providedIn: 'root' })
export class PortfolioService extends BaseDataService {
  private readonly portfolioSubject = new BehaviorSubject<Portfolio | null>(null);
  private readonly holdingsSubject = new BehaviorSubject<Holding[]>([]);

  readonly portfolio$ = this.portfolioSubject.asObservable();
  readonly holdings$ = this.holdingsSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  loadPortfolio(userRole: UserRole): Observable<Portfolio> {
    return this.request<Portfolio, PortfolioDto>({
      mockFactory: () => MOCK_PORTFOLIOS_BY_ROLE[userRole],
      apiFactory: () => this.http.get<ApiResponse<PortfolioDto>>(buildApiUrl(API_ENDPOINTS.PORTFOLIO_BY_ROLE(userRole))),
      mapper: mapPortfolioDtoToPortfolio,
      errorMessage: 'Failed to load portfolio',
    }).pipe(
      tap((portfolio) => {
        this.portfolioSubject.next(portfolio);
        this.holdingsSubject.next(portfolio.holdings);
      })
    );
  }

  loadHoldings(userRole: UserRole): Observable<Holding[]> {
    return this.loadPortfolio(userRole).pipe(map((portfolio) => portfolio.holdings));
  }

  clear(): void {
    this.portfolioSubject.next(null);
    this.holdingsSubject.next([]);
  }
}
