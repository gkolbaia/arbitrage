import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-case-meetings-management',
  templateUrl: './case-meetings-management.component.html',
  styleUrls: ['./case-meetings-management.component.scss'],
})
export class CaseMeetingsManagementComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CaseMeetingsManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
}
