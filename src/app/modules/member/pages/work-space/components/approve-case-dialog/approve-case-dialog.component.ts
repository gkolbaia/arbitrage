import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseService } from 'src/app/modules/guest/services/case.service';
import { UserService } from 'src/app/modules/member/services/user.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';

@Component({
  selector: 'app-approve-case-dialog',
  templateUrl: './approve-case-dialog.component.html',
  styleUrls: ['./approve-case-dialog.component.scss'],
})
export class ApproveCaseDialogComponent implements OnInit {
  arbitrs: any;
  arbitrControl: FormControl = new FormControl(null, Validators.required);
  constructor(
    public dialogRef: MatDialogRef<ApproveCaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService,
    private _loadingService: LoadingService,
    private _caseService: CaseService,
    private _snackBar: MatSnackBar
  ) {
    this.loadArbitrs();
  }

  ngOnInit(): void {}
  loadArbitrs() {
    this._loadingService.loadingOn();
    this._userService.getArbitrs().subscribe(
      (res: any) => {
        this._loadingService.loadingOff();
        this.arbitrs = res.result.data;
        console.log(this.arbitrs)
      },
      (err) => {
        this._loadingService.loadingOff();
      }
    );
  }
  close() {
    this.dialogRef.close();
  }
  selectArbitr() {
    if (this.arbitrControl.valid) {
      this.dialogRef.close(this.arbitrControl.value);
    } else {
      this._snackBar.open('გთხოვთ აირჩიოთ არბიტრი', 'ok', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
}
