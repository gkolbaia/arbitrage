import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-case-registration',
  templateUrl: './case-registration.component.html',
  styleUrls: ['./case-registration.component.scss'],
})
export class CaseRegistrationComponent implements OnInit {
  case: any;
  caseIdControl: FormControl;
  constructor(
    private _fb: FormBuilder,
    private _caseService: CaseService,
    private _router: Router
  ) {
    this.caseIdControl = _fb.control(null, Validators.required);
  }

  ngOnInit(): void {}

  getFile() {}

  findCase() {
    if (this.caseIdControl.valid) {
      this._caseService.getCase(this.caseIdControl.value).subscribe((res) => {
        this.case = res;
      });
    }
  }
}
