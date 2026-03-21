import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
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

  onSaveProfile(): void {
    if (this.profileForm.valid) {
      this.snackBar.open('Profile saved successfully!', 'Close', { duration: 3000 });
    }
  }

  onSavePreferences(): void {
    this.snackBar.open('Preferences saved successfully!', 'Close', { duration: 3000 });
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      if (this.passwordForm.get('newPassword')?.value !== this.passwordForm.get('confirmPassword')?.value) {
        this.snackBar.open('Passwords do not match!', 'Close', { duration: 3000 });
        return;
      }
      this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
      this.passwordForm.reset();
    }
  }
}
