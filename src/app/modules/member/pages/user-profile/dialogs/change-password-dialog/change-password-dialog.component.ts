import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/modules/member/services/user.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
  passwordInputType: string = 'password';
  newPasswordInputType: string = 'password';
  newPaswordConfirmationInputType: string = 'password';
  passwordForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackbar: MatSnackBar,
    private _loadingService: LoadingService
  ) {
    this.passwordForm = fb.group({
      password: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      newPaswordConfirmation: [
        null,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  changePassword() {
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.value.newPassword ===
        this.passwordForm.value.newPaswordConfirmation
      ) {
        const { password, newPassword } = this.passwordForm.value;
        this._loadingService.loadingOn();
        this._userService.changePassword({ password, newPassword }).subscribe(
          (res) => {
            this._loadingService.loadingOff();
            this.dialogRef.close('success');
          },
          (err) => {
            this._loadingService.loadingOff();
            this._snackbar.open(err.error.message, 'ok', {
              duration: 10000,
              panelClass: 'err-message',
            });
          }
        );
      }
    }
  }
  changeInputType(e: any) {
    e.stopPropagation();
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }
}
