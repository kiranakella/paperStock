import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../config/ngrx.config';
import { Holding } from '../../../core/models/portfolio.model';
import { NIFTY_50_STOCKS, StockList } from '../../../core/models/stock.model';
import * as PortfolioSelectors from '../../../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './price-chart.component.html',
})
export class PriceChartComponent implements OnInit, OnDestroy {
  selectedStock = 'INFY';
  chartTimeframe = '1D';
  stockOptions: StockList[] = NIFTY_50_STOCKS.slice(0, 10);
  currentPrice = 2850.5;
  highPrice = 2900;
  lowPrice = 2800;
  priceChange = 50.5;
  priceChangePercent = 1.81;
  linePoints = '';
  areaPoints = '';

  private holdingsSnapshot: Holding[] = [];
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(PortfolioSelectors.selectHoldings)
      .pipe(takeUntil(this.destroy$))
      .subscribe((holdings) => {
        this.holdingsSnapshot = holdings ?? [];

        if (!this.holdingsSnapshot.some((holding) => holding.symbol === this.selectedStock) && this.holdingsSnapshot.length > 0) {
          this.selectedStock = this.holdingsSnapshot[0].symbol;
        }

        this.syncChartData();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStockChange(): void {
    this.syncChartData();
  }

  onTimeframeChange(): void {
    this.syncChartData();
  }

  private syncChartData(): void {
    const basePrice = this.getBasePrice(this.selectedStock);
    const points = this.buildSeries(basePrice, this.selectedStock, this.chartTimeframe);

    this.currentPrice = points[points.length - 1];
    this.highPrice = Math.max(...points);
    this.lowPrice = Math.min(...points);
    this.priceChange = this.currentPrice - points[0];
    this.priceChangePercent = points[0] ? (this.priceChange / points[0]) * 100 : 0;
    this.linePoints = this.toSvgPoints(points);
    this.areaPoints = `0,100 ${this.linePoints} 100,100`;
  }

  private getBasePrice(symbol: string): number {
    const matchedHolding = this.holdingsSnapshot.find((holding) => holding.symbol === symbol);
    if (matchedHolding) {
      return matchedHolding.currentPrice;
    }

    const fallbackPrices: Record<string, number> = {
      RELIANCE: 2925.5,
      TCS: 3350,
      INFY: 2850.5,
      WIPRO: 460.75,
      HINDUNILVR: 2550,
      LT: 3725.4,
      HCLTECH: 1520.5,
      AXISBANK: 945.75,
      ICICIBANK: 925.5,
      HDFC: 1685.25,
    };

    return fallbackPrices[symbol] ?? 1000;
  }

  private buildSeries(basePrice: number, symbol: string, timeframe: string): number[] {
    const lengths: Record<string, number> = {
      '1D': 8,
      '1W': 10,
      '1M': 12,
      '3M': 14,
      '1Y': 16,
    };

    const driftMap: Record<string, number> = {
      '1D': 0.004,
      '1W': 0.009,
      '1M': 0.018,
      '3M': 0.026,
      '1Y': 0.042,
    };

    const count = lengths[timeframe] ?? 8;
    const drift = driftMap[timeframe] ?? 0.004;
    const seed = symbol.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return Array.from({ length: count }, (_, index) => {
      const wave = Math.sin((index + seed % 5) * 0.9) * basePrice * drift;
      const bias = (index - (count - 1) / 2) * basePrice * (drift / 3);
      return Number((basePrice + wave + bias).toFixed(2));
    });
  }

  private toSvgPoints(points: number[]): string {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = Math.max(max - min, 1);

    return points
      .map((point, index) => {
        const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100;
        const y = 92 - (((point - min) / range) * 72);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  }
}
