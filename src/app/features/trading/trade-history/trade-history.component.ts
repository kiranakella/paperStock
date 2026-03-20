import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './trade-history.component.html',
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
      price: 2850.5,
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
      price: 2925.5,
      amount: 5851,
      status: 'EXECUTED',
    },
    {
      date: '2026-03-18',
      time: '15:20:45',
      symbol: 'HINDUNILVR',
      type: 'SELL',
      quantity: 8,
      price: 2650,
      amount: 21200,
      status: 'EXECUTED',
    },
  ];

  ngOnInit(): void {
    console.log('Trade History Component loaded');
  }
}
