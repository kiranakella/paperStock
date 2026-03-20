import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../config/ngrx.config';
import * as PortfolioSelectors from '../../../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-holdings-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  template: `
    <div class="holdings-container">
      <div class="holdings-header">
        <h2>Your Holdings</h2>
        <p class="subtitle">{{ dataSource.data.length }} active positions</p>
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="dataSource" class="holdings-table">
          <!-- Symbol Column -->
          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Symbol</th>
            <td mat-cell *matCellDef="let element" class="symbol-cell">
              <strong>{{ element.symbol }}</strong>
              <div class="stock-name">{{ element.name }}</div>
            </td>
          </ng-container>

          <!-- Quantity Column -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Qty</th>
            <td mat-cell *matCellDef="let element">{{ element.quantity }}</td>
          </ng-container>

          <!-- Avg Price Column -->
          <ng-container matColumnDef="avgPrice">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Avg Price</th>
            <td mat-cell *matCellDef="let element">₹{{ element.avgPrice | number:'1.2-2' }}</td>
          </ng-container>

          <!-- Current Price Column -->
          <ng-container matColumnDef="currentPrice">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Current</th>
            <td mat-cell *matCellDef="let element" [ngClass]="element.currentPrice >= element.avgPrice ? 'positive' : 'negative'">
              ₹{{ element.currentPrice | number:'1.2-2' }}
            </td>
          </ng-container>

          <!-- Invested Value Column -->
          <ng-container matColumnDef="totalInvested">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Invested</th>
            <td mat-cell *matCellDef="let element">₹{{ element.totalInvested | number:'1.2-2' }}</td>
          </ng-container>

          <!-- Current Value Column -->
          <ng-container matColumnDef="currentValue">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Current Val</th>
            <td mat-cell *matCellDef="let element">₹{{ element.currentValue | number:'1.2-2' }}</td>
          </ng-container>

          <!-- P&L Column -->
          <ng-container matColumnDef="pnl">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>P&L</th>
            <td mat-cell *matCellDef="let element" [ngClass]="element.pnl >= 0 ? 'positive' : 'negative'">
              <strong>₹{{ element.pnl | number:'1.2-2' }}</strong>
              <div class="pnl-percent">{{ element.pnlPercent | number:'1.2-2' }}%</div>
            </td>
          </ng-container>

          <!-- Day P&L Column -->
          <ng-container matColumnDef="dayPnL">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Day P&L</th>
            <td mat-cell *matCellDef="let element" [ngClass]="element.dayPnL >= 0 ? 'positive' : 'negative'">
              ₹{{ element.dayPnL | number:'1.2-2' }}
              <div class="pnl-percent">{{ element.dayPnLPercent | number:'1.2-2' }}%</div>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button matTooltip="Sell" color="warn">
                <mat-icon>sell</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div *ngIf="!(holdings$ | async)?.length" class="no-data">
          <mat-icon>inventory_2</mat-icon>
          <p>No holdings yet. Start by placing a trade!</p>
        </div>
      </div>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 25, 100]"
        showFirstLastButtons
        aria-label="Select page"
      ></mat-paginator>
    </div>
  `,
  styles: [`
    .holdings-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
    }

    .holdings-header {
      margin-bottom: 24px;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 16px;
    }

    .holdings-header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      color: #212121;
    }

    .subtitle {
      margin: 8px 0 0 0;
      font-size: 13px;
      color: #666;
    }

    .table-container {
      overflow-x: auto;
      margin-bottom: 16px;
    }

    .holdings-table {
      width: 100%;
      border-collapse: collapse;

      th {
        background: #f5f5f5;
        font-weight: 600;
        color: #424242;
        padding: 16px;
        text-align: left;
        border-bottom: 2px solid #e0e0e0;
      }

      td {
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
      }

      tbody tr:hover {
        background: #fafafa;
      }
    }

    .symbol-cell {
      font-weight: 600;
      color: #667eea;
    }

    .stock-name {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
      font-weight: normal;
    }

    .positive {
      color: #4caf50;
      font-weight: 500;
    }

    .negative {
      color: #f44336;
      font-weight: 500;
    }

    .pnl-percent {
      font-size: 12px;
      margin-top: 2px;
    }

    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #999;

      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        opacity: 0.3;
      }

      p {
        margin: 0;
        font-size: 16px;
      }
    }

    @media (max-width: 768px) {
      .holdings-container {
        padding: 12px;
      }

      .holdings-table {
        font-size: 13px;

        th, td {
          padding: 12px 8px;
        }
      }
    }
  `]
})
export class HoldingsTableComponent implements OnInit, OnDestroy {
  holdings$ = this.store.select(PortfolioSelectors.selectHoldings);
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['symbol', 'quantity', 'avgPrice', 'currentPrice', 'totalInvested', 'currentValue', 'pnl', 'dayPnL', 'actions'];
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Holdings Table Component loaded');
    this.holdings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((holdings) => {
        if (holdings && holdings.length > 0) {
          console.log('Holdings updated:', holdings.length);
          this.dataSource.data = holdings;
          this.cdr.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

