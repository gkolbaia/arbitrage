import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { ChangePasswordDialogComponent } from './dialogs/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _loadingService: LoadingService
  ) {
    this.getUser();
  }
  user: any;
  ngOnInit(): void {}
  getUser() {
    this._loadingService.loadingOn();
    this._authService.session.subscribe(
      (res) => {
        this.user = res;
        this._loadingService.loadingOff();
      },
      (err) => {
        this._loadingService.loadingOff();
      }
    );
  }
  changePassword() {
    const dialogRef = this._dialog.open(ChangePasswordDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'success') {
        this._snackBar.open('მომხმარებლის პაროლი შეცვლილია', 'ok', {
          duration: 10000,
          panelClass: 'success-message',
        });
      }
    });
  }
}
