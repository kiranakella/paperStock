import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Trade } from '../../../core/models/trade.model';
import { TradesService } from '../../../core/services/trades.service';

type TradeHistoryRow = Trade & {
  date: string;
  time: string;
  amount: number;
};

@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './trade-history.component.html',
})
export class TradeHistoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'symbol', 'type', 'quantity', 'price', 'amount', 'status'];
  tradeHistory: TradeHistoryRow[] = [];
  loading$ = this.tradesService.loading$;
  error$ = this.tradesService.error$;

  private destroy$ = new Subject<void>();

  constructor(private tradesService: TradesService) {}

  ngOnInit(): void {
    this.tradesService.trades$
      .pipe(takeUntil(this.destroy$))
      .subscribe((trades) => {
        this.tradeHistory = trades.map((trade) => this.toRow(trade));
      });

    this.tradesService.loadTrades()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private toRow(trade: Trade): TradeHistoryRow {
    const executedAt = trade.executedAt || trade.createdAt;
    const executedDate = new Date(executedAt);

    return {
      ...trade,
      date: executedDate.toISOString().slice(0, 10),
      time: executedDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
      amount: trade.totalAmount,
    };
  }
}
