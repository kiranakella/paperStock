import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../config/ngrx.config';
import { Holding } from '../../../core/models/portfolio.model';
import { NIFTY_50_STOCKS, StockList } from '../../../core/models/stock.model';
import * as PortfolioSelectors from '../../../store/portfolio/portfolio.selectors';

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
  templateUrl: './trade-form.component.html',
})
export class TradeFormComponent implements OnInit, OnDestroy {
  tradeForm: FormGroup;
  isSubmitting = false;
  cash$: Observable<number>;
  stockOptions: StockList[] = NIFTY_50_STOCKS.slice(0, 10);
  selectedStockPrice = 0;
  private holdingsSnapshot: Holding[] = [];
  private destroy$ = new Subject<void>();

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

    this.store.select(PortfolioSelectors.selectHoldings)
      .pipe(takeUntil(this.destroy$))
      .subscribe((holdings) => {
        this.holdingsSnapshot = holdings ?? [];
        this.updateSelectedStockPrice(this.tradeForm.get('symbol')?.value);
      });

    this.tradeForm.get('orderType')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((orderType) => {
        const priceControl = this.tradeForm.get('price');
        if (orderType === 'LIMIT') {
          priceControl?.setValidators([Validators.required, Validators.min(0.01)]);
        } else {
          priceControl?.clearValidators();
          priceControl?.setValue(this.selectedStockPrice, { emitEvent: false });
        }
        priceControl?.updateValueAndValidity();
      });

    this.tradeForm.get('symbol')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((symbol) => {
        this.updateSelectedStockPrice(symbol);
      });
  }

  getTotalAmount(): number {
    const quantity = this.tradeForm.get('quantity')?.value || 0;
    const orderType = this.tradeForm.get('orderType')?.value;
    const price = orderType === 'LIMIT'
      ? (this.tradeForm.get('price')?.value || 0)
      : this.selectedStockPrice;
    return quantity * price;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateSelectedStockPrice(symbol: string): void {
    const matchedHolding = this.holdingsSnapshot.find((holding) => holding.symbol === symbol);
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

    this.selectedStockPrice = matchedHolding?.currentPrice ?? fallbackPrices[symbol] ?? 0;

    if (this.tradeForm.get('orderType')?.value === 'MARKET') {
      this.tradeForm.patchValue({ price: this.selectedStockPrice }, { emitEvent: false });
    }
  }

  onSubmit(): void {
    if (!this.tradeForm.valid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      const formValue = this.tradeForm.value;
      console.log('Trade submitted:', formValue);

      this.snackBar.open(
        `${formValue.tradeType} order placed for ${formValue.quantity} units of ${formValue.symbol}`,
        'Close',
        { duration: 5000 }
      );

      this.isSubmitting = false;
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
