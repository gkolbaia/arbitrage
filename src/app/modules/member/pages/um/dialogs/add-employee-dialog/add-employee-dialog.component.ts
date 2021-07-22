import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss'],
})
export class AddEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pid: [null, Validators.required],
      employeeRole: this.fb.group({
        president: false,
        arbitr: false,
        chancelleryMan: false,
      }),
    });
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  save() {
    console.log(this.employeeForm.value);
  }
  get employeeRoleControl(): FormGroup {
    return this.employeeForm.controls.employeeRole as FormGroup;
  }
}
