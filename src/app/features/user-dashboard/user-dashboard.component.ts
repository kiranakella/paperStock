import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HoldingsTableComponent } from './holdings-table/holdings-table.component';
import { TradeFormComponent } from './trade-form/trade-form.component';
import { PriceChartComponent } from './price-chart/price-chart.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    PortfolioComponent,
    HoldingsTableComponent,
    TradeFormComponent,
    PriceChartComponent,
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Trading Dashboard</h1>
      </div>

      <mat-tab-group class="dashboard-tabs" dynamicHeight>
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>account_balance</mat-icon>
            <span>Portfolio</span>
          </ng-template>
          <div class="tab-content">
            <app-portfolio></app-portfolio>
          </div>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>inventory</mat-icon>
            <span>Holdings</span>
          </ng-template>
          <div class="tab-content">
            <app-holdings-table></app-holdings-table>
          </div>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>show_chart</mat-icon>
            <span>Trade</span>
          </ng-template>
          <div class="tab-content">
            <app-trade-form></app-trade-form>
          </div>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>trending_up</mat-icon>
            <span>Charts</span>
          </ng-template>
          <div class="tab-content">
            <app-price-chart></app-price-chart>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background: #f5f5f5;
      min-height: calc(100vh - 64px);
    }

    .dashboard-header {
      margin-bottom: 24px;
    }

    .dashboard-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 500;
      color: #212121;
    }

    .dashboard-tabs {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .tab-content {
      padding: 24px;
    }

    ::ng-deep .mat-mdc-tab-labels {
      background: #f9f9f9;
      border-bottom: 2px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 12px;
      }

      .dashboard-header h1 {
        font-size: 20px;
      }

      .tab-content {
        padding: 12px;
      }
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  ngOnInit(): void {
    console.log('User Dashboard Component loaded');
  }
}

