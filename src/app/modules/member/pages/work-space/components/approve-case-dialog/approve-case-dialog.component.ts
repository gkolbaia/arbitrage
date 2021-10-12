import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  arbitrControl: FormControl = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<ApproveCaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService,
    private _loadingService: LoadingService
  ) {
    this.loadArbitrs();
  }

  ngOnInit(): void {}
  loadArbitrs() {
    this._loadingService.loadingOn();
    this._userService.getUsers('ARBITR').subscribe(
      (res: any) => {
        this._loadingService.loadingOff();
        this.arbitrs = res.result.data;
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
    console.log(this.arbitrControl.value);
  }
}
