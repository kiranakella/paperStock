import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminUser } from '../../../core/models/admin-user.model';
import { UserRole } from '../../../core/models/user.model';
import { CreateAdminUserRequest, UsersService } from '../../../core/services/users.service';

type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

type NewUserForm = {
  name: string;
  email: string;
  role: UserRole;
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
export class UserManagementComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'role', 'status', 'planLabel', 'portfolioValue', 'availableBalance', 'todayPnL', 'actions'];
  searchTerm = '';
  lastSync = '03:18 AM';
  isAddUserModalOpen = false;
  users: AdminUser[] = [];
  loading$ = this.usersService.loading$;
  error$ = this.usersService.error$;
  newUserForm: NewUserForm = this.getDefaultNewUserForm();

  private destroy$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usersService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
      });

    this.usersService.loadUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (error) => {
          this.snackBar.open(error.message || 'Failed to load users', 'Close', { duration: 3500 });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredUsers(): AdminUser[] {
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

    const request: CreateAdminUserRequest = {
      name: this.newUserForm.name.trim(),
      email: this.newUserForm.email.trim(),
      role: this.newUserForm.role,
      status: this.newUserForm.status,
      planLabel: this.newUserForm.planLabel.trim() || this.getPlanLabel(this.newUserForm.role),
      portfolioValue: Number(this.newUserForm.portfolioValue) || 0,
      availableBalance: Number(this.newUserForm.availableBalance) || 0,
      todayPnL: Number(this.newUserForm.todayPnL) || 0,
    };

    this.usersService.createUser(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.lastSync = this.formatSyncTime(new Date());
          this.closeAddUserModal();
          this.snackBar.open(`Mock user created for ${user.name}.`, 'Close', { duration: 3500 });
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Failed to create mock user', 'Close', { duration: 3500 });
        },
      });
  }

  exportUsers(): void {
    const csv = this.usersService.exportUsersCsv(this.filteredUsers);
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

  private getPlanLabel(role: UserRole): string {
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

  private formatSyncTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}
