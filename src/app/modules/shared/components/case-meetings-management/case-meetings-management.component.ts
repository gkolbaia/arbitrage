import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-case-meetings-management',
  templateUrl: './case-meetings-management.component.html',
  styleUrls: ['./case-meetings-management.component.scss'],
})
export class CaseMeetingsManagementComponent implements OnInit {
  arbitrageMeeting: FormGroup;
  meetingTypes = [
    {
      en: 'main',
      ge: 'მთავარი',
    },
    {
      en: 'regular',
      ge: 'მორიგი',
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<CaseMeetingsManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.arbitrageMeeting = _fb.group({
      date: [null, Validators.required],
      type: [null, Validators.required],
    });
  }
  get arbitrageMeetingTypeControl(): FormControl {
    return this.arbitrageMeeting.controls.type as FormControl;
  }
  get arbitrageMeetingDateControl(): FormControl {
    return this.arbitrageMeeting.controls.date as FormControl;
  }
  ngOnInit(): void {
    console.log(this.data);
  }
  close() {
    this.dialogRef.close();
  }
  saveMeeting() {
    console.log(this.arbitrageMeeting.value);
  }
}
