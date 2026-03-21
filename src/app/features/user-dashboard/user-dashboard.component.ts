import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { HoldingsTableComponent } from './holdings-table/holdings-table.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { TradeFormComponent } from './trade-form/trade-form.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    PortfolioComponent,
    HoldingsTableComponent,
    TradeFormComponent,
    PriceChartComponent,
  ],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent {}
