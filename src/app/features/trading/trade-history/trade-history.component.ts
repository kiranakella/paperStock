import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatChipsModule],
  template: `
    <div class="trade-history-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Trade History</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="tradeHistory" class="history-table">
            <!-- Date Column -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date & Time</th>
              <td mat-cell *matCellDef="let element">
                <div class="date-cell">
                  <strong>{{ element.date }}</strong>
                  <small>{{ element.time }}</small>
                </div>
              </td>
            </ng-container>

            <!-- Symbol Column -->
            <ng-container matColumnDef="symbol">
              <th mat-header-cell *matHeaderCellDef>Symbol</th>
              <td mat-cell *matCellDef="let element">
                <strong>{{ element.symbol }}</strong>
              </td>
            </ng-container>

            <!-- Type Column -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let element">
                <mat-chip [ngClass]="element.type.toLowerCase()">
                  <mat-icon>{{ element.type === 'BUY' ? 'arrow_downward' : 'arrow_upward' }}</mat-icon>
                  {{ element.type }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Quantity Column -->
            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef>Qty</th>
              <td mat-cell *matCellDef="let element">{{ element.quantity }}</td>
            </ng-container>

            <!-- Price Column -->
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let element">₹{{ element.price | number:'1.2-2' }}</td>
            </ng-container>

            <!-- Amount Column -->
            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let element">₹{{ element.amount | number:'1.2-2' }}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element">
                <span [ngClass]="'status-' + element.status.toLowerCase()">{{ element.status }}</span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div *ngIf="!tradeHistory.length" class="no-data">
            <mat-icon>history</mat-icon>
            <p>No trades yet. Start by placing a trade!</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .trade-history-container {
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    mat-card {
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
      font-size: 20px;
      font-weight: 600;
      color: #212121;
    }

    .history-table {
      width: 100%;

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

    .date-cell {
      display: flex;
      flex-direction: column;
      gap: 4px;

      small {
        color: #999;
        font-size: 12px;
      }
    }

    mat-chip {
      &.buy {
        background: rgba(76, 175, 80, 0.1);
        color: #4caf50;
      }

      &.sell {
        background: rgba(244, 67, 54, 0.1);
        color: #f44336;
      }
    }

    .status-executed {
      color: #4caf50;
      font-weight: 600;
    }

    .status-pending {
      color: #ff9800;
      font-weight: 600;
    }

    .status-cancelled {
      color: #f44336;
      font-weight: 600;
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
  `]
})
export class TradeHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'symbol', 'type', 'quantity', 'price', 'amount', 'status'];

  tradeHistory = [
    {
      date: '2026-03-20',
      time: '14:30:45',
      symbol: 'INFY',
      type: 'BUY',
      quantity: 10,
      price: 2850.50,
      amount: 28505,
      status: 'EXECUTED',
    },
    {
      date: '2026-03-20',
      time: '13:15:20',
      symbol: 'TCS',
      type: 'SELL',
      quantity: 5,
      price: 3250.75,
      amount: 16253.75,
      status: 'EXECUTED',
    },
    {
      date: '2026-03-19',
      time: '11:45:00',
      symbol: 'WIPRO',
      type: 'BUY',
      quantity: 20,
      price: 450.25,
      amount: 9005,
      status: 'EXECUTED',
    },
    {
      date: '2026-03-19',
      time: '10:30:30',
      symbol: 'RELIANCE',
      type: 'BUY',
      quantity: 2,
      price: 2925.50,
      amount: 5851,
      status: 'EXECUTED',
    },
    {
      date: '2026-03-18',
      time: '15:20:45',
      symbol: 'HINDUNILVR',
      type: 'SELL',
      quantity: 8,
      price: 2650.00,
      amount: 21200,
      status: 'EXECUTED',
    },
  ];

  ngOnInit(): void {
    console.log('Trade History Component loaded');
  }
}

