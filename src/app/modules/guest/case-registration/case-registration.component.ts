import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-case-registration',
  templateUrl: './case-registration.component.html',
  styleUrls: ['./case-registration.component.scss'],
})
export class CaseRegistrationComponent implements OnInit {
  reportControl: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.reportControl = _fb.group({
      reporter: _fb.group({}),
      defendant: _fb.group({}),
      files: _fb.group({}),
    });
  }

  ngOnInit(): void {}
  fileUploaded(e: any) {
    console.log('ფაილი სმნ', e);
  }
  deletedFile(e: any) {}
  getFile() {}
}
