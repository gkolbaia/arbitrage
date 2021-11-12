import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  arbitersControl: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ApproveCaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService,
    private _loadingService: LoadingService,
    private _caseService: CaseService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.arbitersControl = this._fb.group(
      {
        mainArbitr: new FormControl(),
        firstArbitr: new FormControl(),
        secondArbitr: new FormControl(),
      },
      Validators.required
    );
    this.loadArbitrs();
  }
  get mainArbitrControl(): FormControl {
    return this.arbitersControl.controls.mainArbitr as FormControl;
  }
  get firstArbitrControl(): FormControl {
    return this.arbitersControl.controls.firstArbitr as FormControl;
  }
  get secondArbitrControl(): FormControl {
    return this.arbitersControl.controls.secondArbitr as FormControl;
  }
  ngOnInit(): void {}
  loadArbitrs() {
    this._loadingService.loadingOn();
    this._userService.getArbitrs().subscribe(
      (res: any) => {
        this._loadingService.loadingOff();
        this.arbitrs = res.result.data;
        this.setArbitrs();
      },
      (err) => {
        this._loadingService.loadingOff();
      }
    );
  }
  close() {
    this.dialogRef.close();
  }
  selectArbiter() {
    const data = [];
    for (const key in this.arbitersControl.value) {
      if (this.arbitersControl.value[key]) {
        data.push({ position: key, _id: this.arbitersControl.value[key]._id });
      }
    }
    if (this.arbitersControl.valid) {
      this.dialogRef.close(data);
    } else {
      this._snackBar.open('გთხოვთ აირჩიოთ არბიტრი', 'ok', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  setArbitrs() {
    if (this.data?.arbitr?.length) {
      this.data.arbitr.forEach((element: any, i: number) => {
        const arbitr = this.arbitrs?.find(
          (res: any) => res._id === element._id
        );
        if (element.position === 'main') {
          this.mainArbitrControl.setValue(arbitr);
        } else {
          if (this.firstArbitrControl?.value) {
            this.secondArbitrControl.setValue(arbitr);
          } else {
            this.firstArbitrControl.setValue(arbitr);
          }
        }
      });
    }
  }
}
