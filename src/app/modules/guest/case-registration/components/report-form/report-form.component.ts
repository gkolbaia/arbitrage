import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  ValidationErrors,
  AbstractControl,
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
  reportControl?: FormGroup | null;
  @Input() case: any;
  @Input() fromAdmin?: boolean;
  @Output() caseCreated = new EventEmitter<any>();
  fileAmout: number[] = [];
  caseIdControl: FormControl;
  reportFiles: FormArray;
  foundCase: any;
  constructor(
    private _fb: FormBuilder,
    private _caseService: CaseService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _loadingService: LoadingService
  ) {
    this.reportFiles = _fb.array([]);
    this.caseIdControl = _fb.control('0000000002', Validators.required);
  }
  get reporterControl(): FormGroup {
    return this.reportControl?.controls.reporter as FormGroup;
  }
  get defendantControl(): FormGroup {
    return this.reportControl?.controls.defendant as FormGroup;
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
    return this.reportControl?.controls.title as FormControl;
  }
  get descriptionControl(): FormControl {
    return this.reportControl?.controls.description as FormControl;
  }
  ngOnInit(): void {
    // console.log('case', this.case);
  }
  fileUploaded(file: any, i: number) {
    if (file?.filename) {
      // this.filesControl.push(new FormControl(file));
      file.createdAt = new Date();
      if (this?.filesControl?.controls) {
        this.filesControl.controls[i].setValue(file);
      }
      if (this.reportFiles.controls) {
        this.reportFiles.controls[i].setValue(file);
      }
    } else {
      this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ok', {
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
    if (this.reportControl?.valid) {
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
          if (!this.fromAdmin) {
            this._router.navigate([`guest/answer/${res.caseId}`]);
          } else if (this.fromAdmin) {
            this.caseCreated.emit(true);
          }
        },
        (err) => {
          this._snackBar.open('საქმის ატვირთვისას დაფიქსირდა შეცდომა', 'ok', {
            duration: 2000,
            panelClass: 'err-message',
          });
          this._loadingService.loadingOff();
        }
      );
    } else {
      this._snackBar.open('გთხოვთ სრულად შეავსოთ ფორმა', 'ok', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  addFileUploader(): void {
    this.filesControl.push(new FormControl({}));
  }
  validatePersons(control: AbstractControl): ValidationErrors | null {
    if (control.parent?.value.type === 'person' && !control.value) {
      return { require: true };
    }
    return null;
  }
  validateOrganisations(control: AbstractControl): ValidationErrors | null {
    if (control.parent?.value.type === 'company' && !control.value) {
      return { require: true };
    }
    return null;
  }
  findCase(e: MouseEvent) {
    e.preventDefault();
    if (this.caseIdControl.valid) {
      this._caseService.getCase(this.caseIdControl.value).subscribe((res) => {
        if (res?.result) {
          this.foundCase = res.result;
          this.reportControl = null;
          if (this.foundCase?.reportFiles?.length) {
            this.foundCase?.reportFiles.forEach((file: any) => {
              this.reportFiles.push(new FormControl(file));
            });
          }
        } else {
          this._snackBar.open('მითითებული ნომრით საქმე არ მოიძებნა', 'ok', {
            duration: 2000,
            panelClass: 'err-message',
          });
        }
        this.foundCase = res.result;
      });
    }
  }
  addcaseForm() {
    if (this.reportControl) return;
    this.foundCase = null;
    this.reportControl = this._fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      reporter: this._fb.group({
        type: 'person',
        firstName: new FormControl(null, [this.validatePersons]),
        lastName: new FormControl(null, [this.validatePersons]),
        pid: new FormControl(null, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
        email: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        organisationName: new FormControl(null, [this.validateOrganisations]),
        organisationId: new FormControl(null, [this.validateOrganisations]),
        officialAddress: new FormControl(null, Validators.required),
        actualAddress: new FormControl(null, Validators.required),
      }),
      defendant: this._fb.group({
        type: 'person',
        firstName: new FormControl(null, [this.validatePersons]),
        lastName: new FormControl(null, [this.validatePersons]),
        pid: new FormControl(null, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
        email: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        organisationName: new FormControl(null, [this.validateOrganisations]),
        organisationId: new FormControl(null, [this.validateOrganisations]),
        officialAddress: new FormControl(null, Validators.required),
        actualAddress: new FormControl(null),
      }),
      reportFiles: this._fb.array([]),
    });
  }
  attachReportFiles() {
    if (this.reportFiles.value.length) {
      this._loadingService.loadingOn();
      const data = {
        _id: this.foundCase._id,
        reportFiles: this.reportFiles.value,
      };
      this._caseService.addReportFiles(data).subscribe(
        (res) => {
          this._caseService.setCase(res);
          this._loadingService.loadingOff();
          this._snackBar.open(
            'ატვირთული ფაილები საქმეს წარმატებით დაემატა',
            'ok',
            {
              duration: 2000,
              panelClass: 'success-message',
            }
          );
        },
        (err) => {
          this._loadingService.loadingOff();
          this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ok', {
            duration: 2000,
            panelClass: 'err-message',
          });
        }
      );
    } else {
      this._snackBar.open('გთხოვთ ატვირთოთ ფაილი', 'ok', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  addReporterFileUploader() {
    this.reportFiles.push(new FormControl({}));
  }
}
