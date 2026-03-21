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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../config/ngrx.config';
import { Holding } from '../../../core/models/portfolio.model';
import { StockList } from '../../../core/models/stock.model';
import { TradeRequest } from '../../../core/models/trade.model';
import { StocksService } from '../../../core/services/stocks.service';
import { TradesService } from '../../../core/services/trades.service';
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
  cash$ = this.store.select(PortfolioSelectors.selectCash);
  stockOptions: StockList[] = [];
  selectedStockPrice = 0;
  stockLoading$ = this.stocksService.loading$;
  private holdingsSnapshot: Holding[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private stocksService: StocksService,
    private tradesService: TradesService
  ) {
    this.tradeForm = this.fb.group({
      tradeType: ['BUY', Validators.required],
      symbol: ['', Validators.required],
      orderType: ['MARKET', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.tradesService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isSubmitting = isLoading;
      });

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

    this.stocksService.loadStocks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.updateSelectedStockPrice(this.tradeForm.get('symbol')?.value),
        error: (error) => {
          this.snackBar.open(error.message || 'Failed to load stocks', 'Close', { duration: 3500 });
        },
      });

    this.stocksService.loadStockOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stockOptions) => {
          this.stockOptions = stockOptions;
          if (!this.tradeForm.get('symbol')?.value && stockOptions.length > 0) {
            this.tradeForm.patchValue({ symbol: stockOptions[0].symbol }, { emitEvent: true });
          }
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Failed to load stock options', 'Close', { duration: 3500 });
        },
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

  onSubmit(): void {
    if (!this.tradeForm.valid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    const formValue = this.tradeForm.value;
    const request: TradeRequest = {
      symbol: formValue.symbol,
      type: formValue.tradeType,
      orderType: formValue.orderType,
      quantity: Number(formValue.quantity),
      price: formValue.orderType === 'LIMIT' ? Number(formValue.price) : this.selectedStockPrice,
    };

    this.tradesService.placeTrade(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.snackBar.open(
            response.message || `${formValue.tradeType} order placed for ${formValue.quantity} units of ${formValue.symbol}`,
            'Close',
            { duration: 5000 }
          );

          this.tradeForm.reset({
            tradeType: 'BUY',
            symbol: this.stockOptions[0]?.symbol || '',
            orderType: 'MARKET',
            quantity: 1,
            price: 0,
          });

          this.updateSelectedStockPrice(this.tradeForm.get('symbol')?.value);
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Failed to place trade', 'Close', { duration: 3500 });
        },
      });
  }

  private updateSelectedStockPrice(symbol: string): void {
    const matchedHolding = this.holdingsSnapshot.find((holding) => holding.symbol === symbol);
    const stockPrice = this.stocksService.getStockSnapshot(symbol)?.currentPrice;

    this.selectedStockPrice = matchedHolding?.currentPrice ?? stockPrice ?? 0;

    if (this.tradeForm.get('orderType')?.value === 'MARKET') {
      this.tradeForm.patchValue({ price: this.selectedStockPrice }, { emitEvent: false });
    }
  }
}
