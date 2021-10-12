import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-defendant-form',
  templateUrl: './defendant-form.component.html',
  styleUrls: ['./defendant-form.component.scss'],
})
export class DefendantFormComponent implements OnInit {
  case: any;
  caseIdControl: FormControl;
  defendantFiles: FormArray;
  constructor(
    private _fb: FormBuilder,
    private _caseService: CaseService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _snackBar: MatSnackBar
  ) {
    this.defendantFiles = _fb.array([]);
    this.caseIdControl = _fb.control('0000000002', Validators.required);
  }

  ngOnInit(): void {}

  getFile() {}

  findCase(e: MouseEvent) {
    e.preventDefault();
    if (this.caseIdControl.valid) {
      this._caseService.getCase(this.caseIdControl.value).subscribe((res) => {
        if (res?.result) {
          this.case = res.result;
          console.log(this.case);
        } else {
          this._snackBar.open('მითითებული ნომრით საქმე არ მოიძებნა', 'ოკ', {
            duration: 2000,
            panelClass: 'err-message',
          });
        }
        this.case = res.result;
      });
    }
  }
  addDefendantFiles() {
    console.log(this.defendantFiles.value);
    if (this.defendantFiles.value.length) {
      this._loadingService.loadingOn();
      const data = {
        _id: this.case._id,
        defendantFiles: this.defendantFiles.value,
      };
      this._caseService.addDefendantFiles(data).subscribe(
        (res) => {
          this._caseService.setCase(res);
          this._loadingService.loadingOff();
          this._router.navigate([`guest/answer/${res.caseId}`]);
        },
        (err) => {
          this._loadingService.loadingOff();
          this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ოკ', {
            duration: 2000,
            panelClass: 'err-message',
          });
        }
      );
    } else {
      this._snackBar.open('გთხოვთ ატვირთოთ ფაილი', 'ოკ', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  fileUploaded(file: any, i: number) {
    if (file?.filename) {
      file.createdAt = new Date();
      this.defendantFiles.controls[i].setValue(file);
    } else {
      this._snackBar.open('ფაილის ატვირთვისას დაფიქსირდა შეცდომა', 'ოკ', {
        duration: 2000,
        panelClass: 'err-message',
      });
    }
  }
  deletedFile(e: any, i: number) {
    this.defendantFiles.removeAt(i);
  }
  addFileUploader() {
    this.defendantFiles.push(new FormControl({}));
  }
}