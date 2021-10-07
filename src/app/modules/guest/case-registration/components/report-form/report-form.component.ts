import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  reportControl: FormGroup;
  @Input() case: any;
  fileAmout: number[] = [];
  constructor(
    private _fb: FormBuilder,
    private _caseService: CaseService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _loadingService: LoadingService
  ) {
    this.reportControl = _fb.group({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      reporter: _fb.group({
        type: 'person',
        firstName: null,
        lastName: null,
        pid: null,
        email: null,
        phone: null,
        organisationName: null,
        organisationId: null,
      }),
      defendant: _fb.group({
        type: 'person',
        firstName: null,
        lastName: null,
        pid: null,
        email: null,
        phone: null,
        organisationName: null,
        organisationId: null,
      }),
      reportFiles: _fb.array([]),
    });
  }
  get reporterControl(): FormGroup {
    return this.reportControl.controls.reporter as FormGroup;
  }
  get defendantControl(): FormGroup {
    return this.reportControl.controls.defendant as FormGroup;
  }
  get reporterTypeControl(): FormControl {
    return this.reporterControl.controls.type as FormControl;
  }
  get defendantTypeControl(): FormControl {
    return this.defendantControl.controls.type as FormControl;
  }
  get filesControl(): FormArray {
    return this.reportControl?.controls?.reportFiles as FormArray;
  }
  get titleControl(): FormControl {
    return this.reportControl.controls.title as FormControl;
  }
  get descriptionControl(): FormControl {
    return this.reportControl.controls.description as FormControl;
  }
  ngOnInit(): void {
    // console.log('case', this.case);
  }
  fileUploaded(file: any, i: number) {
    if (file?.filename) {
      // this.filesControl.push(new FormControl(file));
      file.createdAt = new Date();
      this.filesControl.controls[i].setValue(file);
    } else {
      this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ოკ', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  deletedFile(e: any, i: number) {
    this.filesControl.removeAt(i);
  }
  getFile() {}
  saveCase() {
    if (this.reportControl.valid) {
      this._loadingService.loadingOn();
      if (this.filesControl.value.length) {
        this.filesControl.value.forEach((file: any, i: number) => {
          if (!file.filename) {
            this.filesControl.removeAt(i);
          }
        });
      }
      this._caseService.createCase(this.reportControl.value).subscribe(
        (res) => {
          this._caseService.setCase(res);
          this._loadingService.loadingOff();
          this._router.navigate([`guest/answer/${res.caseId}`]);
        },
        (err) => {
          this._snackBar.open('საქმის ატვირთვისას დაფიქსირდა შეცდომა', 'ოკ', {
            duration: 2000,
            panelClass: 'err-message',
          });
          this._loadingService.loadingOff();
        }
      );
    } else {
      this._snackBar.open('გთხოვთ სრულად შეავსოთ ფორმა', 'ოკ', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  addFileUploader() {
    this.filesControl.push(new FormControl({}));
  }
}
