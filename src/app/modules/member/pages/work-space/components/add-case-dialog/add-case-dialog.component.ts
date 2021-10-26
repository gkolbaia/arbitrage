import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-case-dialog',
  templateUrl: './add-case-dialog.component.html',
  styleUrls: ['./add-case-dialog.component.scss'],
})
export class AddCaseDialogComponent implements OnInit {
  caseForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddCaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.caseForm = _fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  save() {}
  close() {
    this.dialogRef.close();
  }
  caseCreated(e: boolean) {
    console.log(e);
    this.dialogRef.close(e);
  }
}
