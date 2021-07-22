import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from './dialogs/add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-um',
  templateUrl: './um.component.html',
  styleUrls: ['./um.component.scss'],
})
export class UmComponent implements OnInit {
  employeeForm?: FormGroup | null;

  employees: any = [
    {
      id: 1,
      firstName: 'გიორგი',
      lastName: 'ყოლბაია',
      pid: 62006064772,
      employeeRole: { chancelleryMan: false, arbitr: true, president: false },
    },
    {
      id: 2,
      firstName: 'გიორგი',
      lastName: 'წულუკიძე',
      pid: 62006064772,
      employeeRole: { chancelleryMan: true, arbitr: false, president: false },
    },
    {
      id: 3,
      firstName: 'მარშალ',
      lastName: 'გელოვანი',
      pid: 62006064772,
      employeeRole: { chancelleryMan: false, arbitr: false, president: true },
    },
  ];
  constructor(private _dialog: MatDialog, private _fb: FormBuilder) {}
  ngOnInit(): void {}
  selectEmployee(employee: any) {
    this.generatEemployeeForm(employee);
  }
  isProfileActive(employee: any) {
    return employee.id === this.employeeForm?.value.id;
  }
  deleteEmployee(e: any, employee: any) {
    e.stopPropagation();
  }
  addEmployee() {
    if (!this.employeeForm) this.generatEemployeeForm();
    // const dialog = this._dialog.open(AddEmployeeDialogComponent, {
    //   width: '100%',
    //   autoFocus: false,
    //   disableClose: true,
    // });
  }
  close() {
    this.employeeForm = null;
  }
  save() {
    console.log(this.employeeForm?.value);
  }
  get employeeRoleControl(): FormGroup {
    return this.employeeForm?.controls.employeeRole as FormGroup;
  }
  generatEemployeeForm(employee?: any) {
    this.employeeForm = this._fb.group({
      id: [employee?.id || null],
      firstName: [employee?.firstName || '', Validators.required],
      lastName: [employee?.lastName || '', Validators.required],
      pid: [employee?.pid || null, Validators.required],
      employeeRole: this._fb.group({
        president: employee?.employeeRole?.president || false,
        arbitr: employee?.employeeRole?.arbitr || false,
        chancelleryMan: employee?.employeeRole?.chancelleryMan || false,
      }),
    });
  }
}
