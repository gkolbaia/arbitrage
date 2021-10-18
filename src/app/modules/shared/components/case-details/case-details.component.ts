import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
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
import { LoadingService } from '../../services/loading.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CaseDetailsComponent implements OnInit {
  @Input() case: any;
  CaseStatus: any = CaseStatus;
  constructor(
    private _router: Router,
    private _caseService: CaseService,
    private _loadingService: LoadingService,
    @Optional() public dialogRef: MatDialogRef<CaseDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    if (!this.case) {
      this.case = this.data;
    }
  }
  close() {
    this.dialogRef.close();
  }
  rejectCase() {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._caseService.rejectCase(this.case._id).subscribe(
          (res) => {
            this._snackBar.open('საჩივარი უარყოფილია', 'ok', {
              duration: 10000,
              panelClass: 'message-warn',
            });
          },
          (err) => {
            this._snackBar.open(err.message, 'ok', {
              duration: 10000,
              panelClass: 'err-message',
            });
          }
        );
      }
    });
  }
  approveCase() {
    const dialogRef = this._matDialog.open(ApproveCaseDialogComponent, {
      width: '500px',
      autoFocus: false,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res?._id) {
        this._loadingService.loadingOn();
        this._caseService.bindUserToCase(res._id, this.case._id).subscribe(
          (res) => {
            this._loadingService.loadingOff();
            this.dialogRef.close({
              firstName: res?.firstName,
              lastName: res?.lastName,
              success: true,
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
