import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../config/ngrx.config';
import { Holding } from '../../../core/models/portfolio.model';
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
  templateUrl: './holdings-table.component.html',
})
export class HoldingsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  holdings$ = this.store.select(PortfolioSelectors.selectHoldings);
  dataSource = new MatTableDataSource<Holding>([]);
  displayedColumns: string[] = ['symbol', 'quantity', 'avgPrice', 'currentPrice', 'totalInvested', 'currentValue', 'pnl', 'dayPnL', 'actions'];
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.holdings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((holdings) => {
        const nextHoldings = holdings ?? [];
        this.dataSource.data = nextHoldings;
        if (this.paginator) {
          this.paginator.firstPage();
        }
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
