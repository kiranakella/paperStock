import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="settings-container">
      <!-- Profile Settings -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Profile Settings</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSaveProfile()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter your full name" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Enter your email" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone Number</mat-label>
              <input matInput formControlName="phone" placeholder="Enter your phone number" />
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!profileForm.valid">
              <mat-icon>save</mat-icon>
              Save Profile
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Trading Preferences -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Trading Preferences</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="preferencesForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Default Order Type</mat-label>
              <mat-select formControlName="defaultOrderType">
                <mat-option value="MARKET">Market Order</mat-option>
                <mat-option value="LIMIT">Limit Order</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Notification Level</mat-label>
              <mat-select formControlName="notificationLevel">
                <mat-option value="ALL">All Notifications</mat-option>
                <mat-option value="IMPORTANT">Important Only</mat-option>
                <mat-option value="NONE">Disabled</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="toggle-section">
              <span class="toggle-label">Email Notifications</span>
              <mat-slide-toggle formControlName="emailNotifications"></mat-slide-toggle>
            </div>

            <div class="toggle-section">
              <span class="toggle-label">SMS Alerts</span>
              <mat-slide-toggle formControlName="smsAlerts"></mat-slide-toggle>
            </div>

            <button mat-raised-button color="primary" (click)="onSavePreferences()">
              <mat-icon>save</mat-icon>
              Save Preferences
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Account Settings -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Account Security</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="account-section">
            <div class="account-info">
              <span class="label">Last Login:</span>
              <span class="value">2026-03-20 14:30:45</span>
            </div>

            <div class="account-info">
              <span class="label">Account Created:</span>
              <span class="value">2026-01-15</span>
            </div>

            <mat-divider></mat-divider>

            <form [formGroup]="passwordForm" (ngSubmit)="onChangePassword()">
              <h3 class="section-title">Change Password</h3>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Current Password</mat-label>
                <input matInput formControlName="currentPassword" type="password" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>New Password</mat-label>
                <input matInput formControlName="newPassword" type="password" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Confirm Password</mat-label>
                <input matInput formControlName="confirmPassword" type="password" />
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" [disabled]="!passwordForm.valid">
                <mat-icon>security</mat-icon>
                Change Password
              </button>
            </form>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Danger Zone -->
      <mat-card class="settings-card danger">
        <mat-card-header>
          <mat-card-title>Danger Zone</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="danger-section">
            <div>
              <h3>Delete Account</h3>
              <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button mat-raised-button color="warn">
              <mat-icon>delete_forever</mat-icon>
              Delete Account
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 600px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .settings-card {
      background: white;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &.danger {
        border: 2px solid #f44336;
      }
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

    .full-width {
      width: 100%;
    }

    .toggle-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .toggle-label {
      font-size: 14px;
      color: #424242;
      font-weight: 500;
    }

    .account-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .account-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .label {
      font-size: 13px;
      color: #666;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 14px;
      color: #212121;
      font-weight: 600;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #212121;
      margin: 0 0 16px;
    }

    .danger-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #ffebee;
      border-radius: 4px;

      h3 {
        margin: 0 0 4px;
        font-size: 16px;
        font-weight: 600;
        color: #c62828;
      }

      p {
        margin: 0;
        font-size: 13px;
        color: #d32f2f;
      }
    }

    button {
      align-self: flex-start;
    }

    @media (max-width: 768px) {
      .settings-container {
        padding: 12px;
      }

      .danger-section {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
    }
  `]
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  preferencesForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['John Doe', Validators.required],
      email: ['user@example.com', [Validators.required, Validators.email]],
      phone: ['+91 98765 43210', Validators.required],
    });

    this.preferencesForm = this.fb.group({
      defaultOrderType: ['MARKET'],
      notificationLevel: ['IMPORTANT'],
      emailNotifications: [true],
      smsAlerts: [false],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Settings Component loaded');
  }

  onSaveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Saving profile:', this.profileForm.value);
      this.snackBar.open('Profile saved successfully!', 'Close', { duration: 3000 });
    }
  }

  onSavePreferences(): void {
    console.log('Saving preferences:', this.preferencesForm.value);
    this.snackBar.open('Preferences saved successfully!', 'Close', { duration: 3000 });
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      if (this.passwordForm.get('newPassword')?.value !== this.passwordForm.get('confirmPassword')?.value) {
        this.snackBar.open('Passwords do not match!', 'Close', { duration: 3000 });
        return;
      }
      console.log('Changing password...');
      this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
      this.passwordForm.reset();
    }
  }
}

