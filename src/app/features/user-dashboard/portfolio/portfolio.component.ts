import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AppState } from '../../../config/ngrx.config';
import * as PortfolioSelectors from '../../../store/portfolio/portfolio.selectors';
import { Portfolio } from '../../../core/models/portfolio.model';

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
  template: `
    <div class="portfolio-grid">
      <!-- Total Value Card -->
      <mat-card class="stat-card primary">
        <mat-card-content>
          <div class="card-header">
            <mat-icon class="card-icon">account_balance_wallet</mat-icon>
            <span class="card-label">Portfolio Value</span>
          </div>
          <div class="card-value">
            ₹{{ (portfolio$ | async)?.totalValue | number:'1.2-2' || '0.00' }}
          </div>
          <div class="card-subtitle">Total Holdings</div>
        </mat-card-content>
      </mat-card>

      <!-- Today P&L Card -->
      <mat-card class="stat-card" [ngClass]="(todayPnL$ | async) || 0 >= 0 ? 'success' : 'danger'">
        <mat-card-content>
          <div class="card-header">
            <mat-icon class="card-icon">trending_up</mat-icon>
            <span class="card-label">Today's P&L</span>
          </div>
          <div class="card-value" [ngClass]="(todayPnL$ | async) || 0 >= 0 ? 'positive' : 'negative'">
            ₹{{ (todayPnL$ | async) | number:'1.2-2' || '0.00' }}
            <span class="pnl-percent" [ngClass]="(todayPnLPercent$ | async) || 0 >= 0 ? 'positive' : 'negative'">
              ({{ (todayPnLPercent$ | async) | number:'1.2-2' }}%)
            </span>
          </div>
          <mat-progress-bar mode="determinate" value="50" class="progress"></mat-progress-bar>
        </mat-card-content>
      </mat-card>

      <!-- Total P&L Card -->
      <mat-card class="stat-card" [ngClass]="(portfolioPnL$ | async) || 0 >= 0 ? 'success' : 'danger'">
        <mat-card-content>
          <div class="card-header">
            <mat-icon class="card-icon">assessment</mat-icon>
            <span class="card-label">Total P&L</span>
          </div>
          <div class="card-value" [ngClass]="(portfolioPnL$ | async) || 0 >= 0 ? 'positive' : 'negative'">
            ₹{{ (portfolioPnL$ | async) | number:'1.2-2' || '0.00' }}
            <span class="pnl-percent" [ngClass]="(portfolioPnLPercent$ | async) || 0 >= 0 ? 'positive' : 'negative'">
              ({{ (portfolioPnLPercent$ | async) | number:'1.2-2' }}%)
            </span>
          </div>
          <mat-progress-bar mode="determinate" value="50"></mat-progress-bar>
        </mat-card-content>
      </mat-card>

      <!-- Cash Balance Card -->
      <mat-card class="stat-card info">
        <mat-card-content>
          <div class="card-header">
            <mat-icon class="card-icon">paid</mat-icon>
            <span class="card-label">Available Cash</span>
          </div>
          <div class="card-value">
            ₹{{ (cash$ | async) | number:'1.2-2' || '0.00' }}
          </div>
          <div class="card-subtitle">Ready to Trade</div>
        </mat-card-content>
      </mat-card>

      <!-- Holdings Count Card -->
      <mat-card class="stat-card warning">
        <mat-card-content>
          <div class="card-header">
            <mat-icon class="card-icon">inventory_2</mat-icon>
            <span class="card-label">Holdings</span>
          </div>
          <div class="card-value">
            {{ (holdingCount$ | async) || 0 }}
          </div>
          <div class="card-subtitle">Active Positions</div>
        </mat-card-content>
      </mat-card>

      <!-- Trades Count Card -->
      <mat-card class="stat-card secondary">
        <mat-card-content>
          <div class="card-header">
            <mat-icon class="card-icon">history</mat-icon>
            <span class="card-label">Total Trades</span>
          </div>
          <div class="card-value">
            {{ (tradeCount$ | async) || 0 }}
          </div>
          <div class="card-subtitle">All-time Trades</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .stat-card {
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
    }

    .stat-card.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .stat-card.secondary {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .stat-card.success {
      background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
      color: white;
    }

    .stat-card.danger {
      background: linear-gradient(135deg, #f44336 0%, #e53935 100%);
      color: white;
    }

    .stat-card.info {
      background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
      color: white;
    }

    .stat-card.warning {
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
      color: white;
    }

    mat-card-content {
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .card-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      opacity: 0.9;
    }

    .card-label {
      font-size: 13px;
      font-weight: 500;
      opacity: 0.9;
      letter-spacing: 0.5px;
    }

    .card-value {
      font-size: 28px;
      font-weight: 600;
      margin: 12px 0;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .card-value.positive {
      color: #4caf50;
    }

    .card-value.negative {
      color: #f44336;
    }

    .pnl-percent {
      font-size: 16px;
      font-weight: 500;

      &.positive {
        color: #4caf50;
      }

      &.negative {
        color: #f44336;
      }
    }

    .card-subtitle {
      font-size: 12px;
      opacity: 0.85;
      margin-top: 8px;
    }

    .progress {
      margin-top: 12px;
      height: 4px;
    }

    @media (max-width: 768px) {
      .portfolio-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }

      .card-value {
        font-size: 22px;
      }
    }
  `]
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

