import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-case-registration',
  templateUrl: './case-registration.component.html',
  styleUrls: ['./case-registration.component.scss'],
})
export class CaseRegistrationComponent implements OnInit {
  reportControl: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _caseService: CaseService,
    private _router: Router
  ) {
    this.reportControl = _fb.group({
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
    return this.reportControl.controls.reportFiles as FormArray;
  }
  ngOnInit(): void {}
  fileUploaded(file: any) {
    if (file?.filename) {
      this.filesControl.push(new FormControl(file));
    }
  }
  deletedFile(e: any) {
    console.log(e);
  }
  getFile() {}
  saveCase() {
    if (this.reportControl.valid) {
      this._caseService
        .createCase(this.reportControl.value)
        .subscribe((res) => {
          console.log(res);
          this._caseService.setCase(res);
          this._router.navigate(['guest/answer']);
        });
    }
  }
}
