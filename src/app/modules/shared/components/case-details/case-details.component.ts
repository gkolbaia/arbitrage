import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/modules/guest/services/case.service';
import { ApproveCaseDialogComponent } from 'src/app/modules/member/pages/work-space/components/approve-case-dialog/approve-case-dialog.component';
import { CaseStatus } from '../../enums/case-status.enum';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CaseDetailsComponent implements OnInit {
  statusControl: FormControl = new FormControl('ACTIVE');
  @Input() case: any;
  arbitrageFiles: FormArray;

  CaseStatus: any = CaseStatus;
  constructor(
    private _router: Router,
    private _caseService: CaseService,
    private _loadingService: LoadingService,
    @Optional() public dialogRef: MatDialogRef<CaseDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _authService: AuthService,
    private _fb: FormBuilder
  ) {
    this.arbitrageFiles = _fb.array([]);
  }
  ngOnInit(): void {
    if (!this.case) {
      this.case = this.data;
      this.initArbitrageFiles();
    }
  }
  close() {
    this.dialogRef.close();
  }

  approveCase() {
    const dialogRef = this._matDialog.open(ApproveCaseDialogComponent, {
      width: '500px',
      autoFocus: false,
      disableClose: true,
      data: this.case,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res?.length) {
        this._loadingService.loadingOn();
        this._caseService.bindUserToCase(res, this.case._id).subscribe(
          (res1) => {
            this._loadingService.loadingOff();
            this.dialogRef.close({
              firstName: res1?.arbitr?.firstName,
              lastName: res1?.arbitr.lastName,
              success: true,
              message: `საქმე დაეწერა ${res1?.arbitr?.firstName} ${res1?.arbitr?.lastName}`,
            });
          },
          (err) => {
            this._loadingService.loadingOff();
          }
        );
      }
    });
  }
  fileUploaded(file: any, i: number) {
    if (file?.filename) {
      file.createdAt = new Date();
      this.arbitrageFiles.controls[i].setValue(file);
    } else {
      this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ok', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  deletedFile(e: any, i: number) {
    this.arbitrageFiles.removeAt(i);
  }
  addFileUploader() {
    this.arbitrageFiles.push(new FormControl({}));
  }
  addArbitrageFiles() {
    this._loadingService.loadingOn();
    const data = {
      _id: this.case?._id,
      arbitrageFiles: this.arbitrageFiles?.value,
    };
    this._caseService.addArbitrageFiles(data).subscribe(
      (res) => {
        this._snackBar.open('ფაილი აიტვირთა', 'ok', {
          duration: 2000,
          panelClass: 'success-message',
        });
        this.case = res;
        this._loadingService.loadingOff();
      },
      (err) => {
        this._loadingService.loadingOff();
        this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ok', {
          duration: 2000,
          panelClass: 'err-message',
        });
      }
    );
  }
  changeStatus() {
    const data = {
      _id: this.case._id,
      status: this.statusControl.value,
    };
    this._loadingService.loadingOn();
    this._caseService.changeCaseStatus(data).subscribe(
      (res) => {
        this._loadingService.loadingOff();
      },
      (err) => {
        this._loadingService.loadingOff();
        this._snackBar.open(err.error.message, 'ok', {
          duration: 2000,
          panelClass: 'err-message',
        });
      }
    );
  }
  initArbitrageFiles() {
    if (this.case?.arbitrageFiles?.length) {
      this.case.arbitrageFiles.forEach((file: any) => {
        this.arbitrageFiles.push(new FormControl(file));
      });
    }
  }

  rejectCase() {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._caseService.rejectCase(this.case._id).subscribe(
          (res) => {
            this._loadingService.loadingOff();
            this.dialogRef.close({
              firstName: res?.firstName,
              lastName: res?.lastName,
              success: true,
              message: 'საქმე უარყოფილია',
            });
          },
          (err) => {
            this._loadingService.loadingOff();
          }
        );
      }
    });
  }
}
