import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaseService } from 'src/app/modules/guest/services/case.service';
import { CasesService } from 'src/app/modules/member/services/cases.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';

@Component({
  selector: 'app-edit-case-dialog',
  templateUrl: './edit-case-dialog.component.html',
  styleUrls: ['./edit-case-dialog.component.scss'],
})
export class EditCaseDialogComponent implements OnInit {
  caseControl: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditCaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _caseService: CasesService,
    private _loadingService: LoadingService
  ) {
    this.caseControl = _fb.group({
      defendant: _fb.group(data.defendant),
      reporter: _fb.group(data.reporter),
      title: data.title,
      description: data.description,
    });
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  get reporterControl(): FormGroup {
    return this.caseControl.controls.reporter as FormGroup;
  }
  get defendantControl(): FormGroup {
    return this.caseControl.controls.defendant as FormGroup;
  }
  editCase() {
    this._loadingService.loadingOn();
    this._caseService
      .editCase(this.caseControl.value, this?.data?._id)
      .subscribe(
        (res) => {
          this.data = res;
          this._loadingService.loadingOff();
          this.dialogRef.close({ success: true });
        },
        (err) => {
          this._loadingService.loadingOff();
        }
      );
  }
}
