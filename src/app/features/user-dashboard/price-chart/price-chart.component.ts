import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../config/ngrx.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  template: `
    <div class="chart-container">
      <!-- Chart Header -->
      <mat-card class="chart-card">
        <mat-card-header>
          <mat-card-title>Stock Price Chart</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <!-- Controls -->
          <div class="chart-controls">
            <mat-form-field appearance="outline">
              <mat-label>Select Stock</mat-label>
              <mat-select [(ngModel)]="selectedStock" (selectionChange)="onStockChange()">
                <mat-option value="RELIANCE">RELIANCE</mat-option>
                <mat-option value="TCS">TCS</mat-option>
                <mat-option value="INFY">INFY</mat-option>
                <mat-option value="WIPRO">WIPRO</mat-option>
                <mat-option value="HINDUNILVR">HINDUNILVR</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-button-toggle-group [(ngModel)]="chartTimeframe" (change)="onTimeframeChange()" [value]="chartTimeframe">
              <mat-button-toggle value="1D">1D</mat-button-toggle>
              <mat-button-toggle value="1W">1W</mat-button-toggle>
              <mat-button-toggle value="1M">1M</mat-button-toggle>
              <mat-button-toggle value="3M">3M</mat-button-toggle>
              <mat-button-toggle value="1Y">1Y</mat-button-toggle>
            </mat-button-toggle-group>
          </div>

          <!-- Chart Placeholder -->
          <div class="chart-wrapper">
            <div class="chart-placeholder">
              <p>📈 Stock Price Chart Visualization</p>
              <p style="font-size: 12px; color: #999;">Chart integration coming soon...</p>
            </div>
          </div>

          <!-- Chart Stats -->
          <div class="chart-stats">
            <div class="stat">
              <span class="stat-label">Current Price:</span>
              <span class="stat-value">₹{{ currentPrice | number:'1.2-2' }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">High:</span>
              <span class="stat-value">₹{{ highPrice | number:'1.2-2' }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Low:</span>
              <span class="stat-value">₹{{ lowPrice | number:'1.2-2' }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Change:</span>
              <span class="stat-value" [ngClass]="priceChange >= 0 ? 'positive' : 'negative'">
                ₹{{ priceChange | number:'1.2-2' }} ({{ priceChangePercent | number:'1.2-2' }}%)
              </span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .chart-container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }

    .chart-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    mat-card-header {
      padding: 20px;
      border-bottom: 2px solid #f0f0f0;
    }

    mat-card-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #212121;
    }

    mat-card-content {
      padding: 20px;
    }

    .chart-controls {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
      align-items: center;
      flex-wrap: wrap;
    }

    mat-form-field {
      min-width: 200px;
    }

    .chart-wrapper {
      position: relative;
      width: 100%;
      height: 400px;
      margin-bottom: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      padding: 16px;
      border: 2px dashed #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chart-placeholder {
      text-align: center;
      color: #999;

      p {
        margin: 8px 0;
        font-size: 16px;
      }
    }

    .chart-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 600;
      color: #212121;

      &.positive {
        color: #4caf50;
      }

      &.negative {
        color: #f44336;
      }
    }

    @media (max-width: 768px) {
      .chart-container {
        padding: 12px;
      }

      .chart-controls {
        flex-direction: column;
        gap: 12px;
      }

      mat-form-field {
        width: 100%;
      }

      .chart-wrapper {
        height: 300px;
      }

      .chart-stats {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      }
    }
  `]
})
export class PriceChartComponent implements OnInit {
  selectedStock = 'INFY';
  chartTimeframe = '1D';
  currentPrice = 2850.50;
  highPrice = 2900;
  lowPrice = 2800;
  priceChange = 50.50;
  priceChangePercent = 1.81;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('Price Chart Component loaded');
  }

  onStockChange(): void {
    console.log('Stock changed to:', this.selectedStock);
  }

  onTimeframeChange(): void {
    console.log('Timeframe changed to:', this.chartTimeframe);
  }
}
