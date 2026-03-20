import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../../../config/ngrx.config';
import * as PortfolioSelectors from '../../../store/portfolio/portfolio.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trade-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="trade-container">
      <div class="trade-grid">
        <!-- Trade Form -->
        <mat-card class="trade-form-card">
          <mat-card-header>
            <mat-card-title>Place Trade</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="tradeForm" (ngSubmit)="onSubmit()">
              <!-- Trade Type (Buy/Sell) -->
              <div class="form-section">
                <label class="section-label">Trade Type</label>
                <mat-radio-group formControlName="tradeType" class="radio-group">
                  <mat-radio-button value="BUY" color="primary">
                    <mat-icon class="radio-icon buy">trending_up</mat-icon> BUY
                  </mat-radio-button>
                  <mat-radio-button value="SELL" color="warn">
                    <mat-icon class="radio-icon sell">trending_down</mat-icon> SELL
                  </mat-radio-button>
                </mat-radio-group>
              </div>

              <mat-divider></mat-divider>

              <!-- Stock Selection -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Select Stock</mat-label>
                <mat-select formControlName="symbol">
                  <mat-option value="">-- Choose a stock --</mat-option>
                  <mat-option value="RELIANCE">RELIANCE - Reliance Industries</mat-option>
                  <mat-option value="TCS">TCS - Tata Consultancy Services</mat-option>
                  <mat-option value="INFY">INFY - Infosys Limited</mat-option>
                  <mat-option value="WIPRO">WIPRO - Wipro Limited</mat-option>
                  <mat-option value="HINDUNILVR">HINDUNILVR - Hindustan Unilever</mat-option>
                  <mat-option value="LT">LT - Larsen & Toubro</mat-option>
                  <mat-option value="HCLTECH">HCLTECH - HCL Technologies</mat-option>
                  <mat-option value="AXISBANK">AXISBANK - Axis Bank</mat-option>
                  <mat-option value="ICICIBANK">ICICIBANK - ICICI Bank</mat-option>
                  <mat-option value="HDFC">HDFC - HDFC Bank</mat-option>
                </mat-select>
                <mat-error *ngIf="tradeForm.get('symbol')?.hasError('required')">
                  Stock is required
                </mat-error>
              </mat-form-field>

              <!-- Order Type (Market/Limit) -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Order Type</mat-label>
                <mat-select formControlName="orderType">
                  <mat-option value="MARKET">Market Order</mat-option>
                  <mat-option value="LIMIT">Limit Order</mat-option>
                </mat-select>
              </mat-form-field>

              <!-- Quantity -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Quantity</mat-label>
                <input
                  matInput
                  formControlName="quantity"
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                />
                <mat-error *ngIf="tradeForm.get('quantity')?.hasError('required')">
                  Quantity is required
                </mat-error>
                <mat-error *ngIf="tradeForm.get('quantity')?.hasError('min')">
                  Quantity must be at least 1
                </mat-error>
              </mat-form-field>

              <!-- Price (for limit orders) -->
              <mat-form-field appearance="outline" class="full-width" *ngIf="tradeForm.get('orderType')?.value === 'LIMIT'">
                <mat-label>Price per Share</mat-label>
                <input
                  matInput
                  formControlName="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter limit price"
                />
                <mat-error *ngIf="tradeForm.get('price')?.hasError('required')">
                  Price is required for limit orders
                </mat-error>
              </mat-form-field>

              <!-- Total Amount (Read-only) -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Total Amount</mat-label>
                <input
                  matInput
                  [value]="getTotalAmount() | currency:'INR':'symbol':'1.2-2'"
                  readonly
                  disabled
                />
              </mat-form-field>

              <!-- Submit Button -->
              <button
                mat-raised-button
                [color]="tradeForm.get('tradeType')?.value === 'BUY' ? 'primary' : 'warn'"
                [disabled]="!tradeForm.valid || isSubmitting"
                (click)="onSubmit()"
                class="submit-btn"
              >
                <mat-icon *ngIf="!isSubmitting">{{ tradeForm.get('tradeType')?.value === 'BUY' ? 'shopping_cart' : 'sell' }}</mat-icon>
                <mat-spinner *ngIf="isSubmitting" diameter="20" class="button-spinner"></mat-spinner>
                {{ tradeForm.get('tradeType')?.value === 'BUY' ? 'Place Buy Order' : 'Place Sell Order' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Order Summary -->
        <mat-card class="summary-card">
          <mat-card-header>
            <mat-card-title>Order Summary</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <div class="summary-row">
              <span class="summary-label">Trade Type:</span>
              <span class="summary-value" [ngClass]="tradeForm.get('tradeType')?.value?.toLowerCase()">
                {{ tradeForm.get('tradeType')?.value || 'N/A' }}
              </span>
            </div>

            <div class="summary-row">
              <span class="summary-label">Stock:</span>
              <span class="summary-value">{{ tradeForm.get('symbol')?.value || 'Select stock' }}</span>
            </div>

            <div class="summary-row">
              <span class="summary-label">Quantity:</span>
              <span class="summary-value">{{ tradeForm.get('quantity')?.value || 0 }} units</span>
            </div>

            <div class="summary-row" *ngIf="tradeForm.get('orderType')?.value === 'LIMIT'">
              <span class="summary-label">Limit Price:</span>
              <span class="summary-value">₹{{ tradeForm.get('price')?.value | number:'1.2-2' }}</span>
            </div>

            <mat-divider></mat-divider>

            <div class="summary-row total">
              <span class="summary-label">Total Amount:</span>
              <span class="summary-value">{{ getTotalAmount() | currency:'INR':'symbol':'1.2-2' }}</span>
            </div>

            <div class="info-box">
              <mat-icon>info</mat-icon>
              <span>Available Cash: {{ (cash$ | async) | currency:'INR':'symbol':'1.2-2' }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .trade-container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }

    .trade-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .trade-form-card, .summary-card {
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

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-section {
      margin-bottom: 12px;
    }

    .section-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #666;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .radio-group {
      display: flex;
      gap: 20px;
    }

    mat-radio-button {
      display: flex;
      align-items: center;
    }

    .radio-icon {
      margin-right: 8px;
      font-size: 18px;
      width: 18px;
      height: 18px;

      &.buy {
        color: #4caf50;
      }

      &.sell {
        color: #f44336;
      }
    }

    .full-width {
      width: 100%;
      margin: 12px 0;
    }

    .submit-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      margin-top: 12px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .button-spinner {
      display: inline-block;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
    }

    .summary-label {
      color: #666;
      font-weight: 500;
    }

    .summary-value {
      font-weight: 600;
      color: #212121;

      &.buy {
        color: #4caf50;
      }

      &.sell {
        color: #f44336;
      }
    }

    .summary-row.total {
      padding: 16px 0;
      font-size: 18px;
      border-bottom: none;
      border-top: 2px solid #e0e0e0;
      margin-top: 8px;

      .summary-label {
        color: #212121;
        font-weight: 600;
      }

      .summary-value {
        font-size: 20px;
        color: #667eea;
      }
    }

    .info-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #e3f2fd;
      border-radius: 4px;
      margin-top: 16px;
      font-size: 13px;
      color: #1976d2;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }
    }

    @media (max-width: 1024px) {
      .trade-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .trade-container {
        padding: 12px;
      }

      .trade-grid {
        gap: 16px;
      }
    }
  `]
})
export class TradeFormComponent implements OnInit {
  tradeForm: FormGroup;
  isSubmitting = false;
  cash$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.tradeForm = this.fb.group({
      tradeType: ['BUY', Validators.required],
      symbol: ['', Validators.required],
      orderType: ['MARKET', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, Validators.required],
    });

    this.cash$ = this.store.select(PortfolioSelectors.selectCash);
  }

  ngOnInit(): void {
    console.log('Trade Form Component loaded');

    // Update price validator based on order type
    this.tradeForm.get('orderType')?.valueChanges.subscribe((orderType) => {
      const priceControl = this.tradeForm.get('price');
      if (orderType === 'LIMIT') {
        priceControl?.setValidators([Validators.required, Validators.min(0.01)]);
      } else {
        priceControl?.clearValidators();
      }
      priceControl?.updateValueAndValidity();
    });
  }

  getTotalAmount(): number {
    const quantity = this.tradeForm.get('quantity')?.value || 0;
    const price = this.tradeForm.get('price')?.value || 0;
    return quantity * price;
  }

  onSubmit(): void {
    if (!this.tradeForm.valid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      const formValue = this.tradeForm.value;
      console.log('Trade submitted:', formValue);

      this.snackBar.open(
        `${formValue.tradeType} order placed for ${formValue.quantity} units of ${formValue.symbol}`,
        'Close',
        { duration: 5000 }
      );

      this.isSubmitting = false;
      // Reset form after successful submission
      this.tradeForm.reset({
        tradeType: 'BUY',
        symbol: '',
        orderType: 'MARKET',
        quantity: 1,
        price: 0,
      });
    }, 1500);
  }
}

