import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../../core/models/user.model';

type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

type AdminUserRow = User & {
  status: UserStatus;
  planLabel: string;
};

type NewUserForm = {
  name: string;
  email: string;
  role: User['role'];
  status: UserStatus;
  planLabel: string;
  portfolioValue: number;
  availableBalance: number;
  todayPnL: number;
};

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent {
  displayedColumns = ['name', 'role', 'status', 'planLabel', 'portfolioValue', 'availableBalance', 'todayPnL', 'actions'];
  searchTerm = '';
  lastSync = '03:18 AM';
  isAddUserModalOpen = false;

  users: AdminUserRow[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@paperstockindia.com',
      role: 'ADMIN',
      portfolioValue: 500000,
      investedValue: 350000,
      availableBalance: 150000,
      todayPnL: 5000,
      todayPnLPercent: 1.85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE',
      planLabel: 'Enterprise Admin',
    },
    {
      id: '2',
      name: 'Paid User',
      email: 'paid@paperstockindia.com',
      role: 'PAID',
      portfolioValue: 250000,
      investedValue: 200000,
      availableBalance: 50000,
      todayPnL: 2500,
      todayPnLPercent: 1.25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE',
      planLabel: 'Pro Trader',
    },
    {
      id: '3',
      name: 'Free User',
      email: 'user@paperstockindia.com',
      role: 'FREE',
      portfolioValue: 100000,
      investedValue: 75000,
      availableBalance: 25000,
      todayPnL: 500,
      todayPnLPercent: 0.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'PENDING',
      planLabel: 'Starter',
    },
    {
      id: '4',
      name: 'Riya Sharma',
      email: 'riya.sharma@paperstockindia.com',
      role: 'PAID',
      portfolioValue: 320000,
      investedValue: 240000,
      availableBalance: 80000,
      todayPnL: -1200,
      todayPnLPercent: -0.38,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE',
      planLabel: 'Swing Elite',
    },
    {
      id: '5',
      name: 'Ganesh Kumar',
      email: 'ganesh.kumar@paperstockindia.com',
      role: 'FREE',
      portfolioValue: 85000,
      investedValue: 62000,
      availableBalance: 23000,
      todayPnL: 320,
      todayPnLPercent: 0.29,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'SUSPENDED',
      planLabel: 'Starter',
    },
  ];

  newUserForm: NewUserForm = this.getDefaultNewUserForm();

  constructor(private snackBar: MatSnackBar) {}

  get filteredUsers(): AdminUserRow[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return this.users;
    }

    return this.users.filter((user) =>
      [user.name, user.email, user.role, user.status, user.planLabel]
        .some((value) => value.toLowerCase().includes(query))
    );
  }

  get activeUsers(): number {
    return this.users.filter((user) => user.status === 'ACTIVE').length;
  }

  get paidUsers(): number {
    return this.users.filter((user) => user.role === 'PAID').length;
  }

  get pendingUsers(): number {
    return this.users.filter((user) => user.status === 'PENDING').length;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  openAddUserModal(): void {
    this.newUserForm = this.getDefaultNewUserForm();
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal(): void {
    this.isAddUserModalOpen = false;
  }

  createMockUser(): void {
    if (!this.newUserForm.name.trim() || !this.newUserForm.email.trim()) {
      this.snackBar.open('Name and email are required to create a mock user.', 'Close', { duration: 3000 });
      return;
    }

    const now = new Date();
    const user: AdminUserRow = {
      id: String(this.users.length + 1),
      name: this.newUserForm.name.trim(),
      email: this.newUserForm.email.trim(),
      role: this.newUserForm.role,
      status: this.newUserForm.status,
      planLabel: this.newUserForm.planLabel.trim() || this.getPlanLabel(this.newUserForm.role),
      portfolioValue: Number(this.newUserForm.portfolioValue) || 0,
      investedValue: Math.max((Number(this.newUserForm.portfolioValue) || 0) - (Number(this.newUserForm.availableBalance) || 0), 0),
      availableBalance: Number(this.newUserForm.availableBalance) || 0,
      todayPnL: Number(this.newUserForm.todayPnL) || 0,
      todayPnLPercent: this.calculateTodayPnLPercent(
        Number(this.newUserForm.todayPnL) || 0,
        Number(this.newUserForm.portfolioValue) || 0
      ),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    this.users = [user, ...this.users];
    this.lastSync = this.formatSyncTime(now);
    this.closeAddUserModal();
    this.snackBar.open(`Mock user created for ${user.name}.`, 'Close', { duration: 3500 });
  }

  exportUsers(): void {
    const header = [
      'Name',
      'Email',
      'Role',
      'Status',
      'Plan',
      'PortfolioValue',
      'AvailableBalance',
      'TodayPnL',
      'CreatedAt',
    ];

    const rows = this.filteredUsers.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.planLabel,
      user.portfolioValue,
      user.availableBalance,
      user.todayPnL,
      user.createdAt,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `mock-users-${stamp}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    this.lastSync = this.formatSyncTime(new Date());
    this.snackBar.open(`Exported ${this.filteredUsers.length} mock users.`, 'Close', { duration: 3000 });
  }

  private getDefaultNewUserForm(): NewUserForm {
    return {
      name: '',
      email: '',
      role: 'FREE',
      status: 'PENDING',
      planLabel: 'Starter',
      portfolioValue: 100000,
      availableBalance: 100000,
      todayPnL: 0,
    };
  }

  private getPlanLabel(role: User['role']): string {
    switch (role) {
      case 'ADMIN':
        return 'Enterprise Admin';
      case 'PAID':
        return 'Pro Trader';
      case 'FREE':
      default:
        return 'Starter';
    }
  }

  private calculateTodayPnLPercent(todayPnL: number, portfolioValue: number): number {
    if (!portfolioValue) {
      return 0;
    }

    return Number(((todayPnL / portfolioValue) * 100).toFixed(2));
  }

  private formatSyncTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}
