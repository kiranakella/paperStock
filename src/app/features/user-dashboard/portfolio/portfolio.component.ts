import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../config/ngrx.config';
import * as PortfolioSelectors from '../../../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent implements OnInit {
  portfolio$: Observable<any>;
  todayPnL$: Observable<number>;
  todayPnLPercent$: Observable<number>;
  portfolioPnL$: Observable<number>;
  portfolioPnLPercent$: Observable<number>;
  cash$: Observable<number>;
  holdingCount$: Observable<number>;
  tradeCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.portfolio$ = this.store.select(PortfolioSelectors.selectPortfolio);
    this.todayPnL$ = this.store.select(PortfolioSelectors.selectTodayPnL);
    this.todayPnLPercent$ = this.store.select(PortfolioSelectors.selectTodayPnLPercent);
    this.portfolioPnL$ = this.store.select(PortfolioSelectors.selectPortfolioPnL);
    this.portfolioPnLPercent$ = this.store.select(PortfolioSelectors.selectPortfolioPnLPercent);
    this.cash$ = this.store.select(PortfolioSelectors.selectCash);
    this.holdingCount$ = this.store.select(PortfolioSelectors.selectHoldingCount);
    this.tradeCount$ = this.store.select(PortfolioSelectors.selectTradeCount);
  }

  ngOnInit(): void {
    console.log('Portfolio Component loaded');
  }
}
