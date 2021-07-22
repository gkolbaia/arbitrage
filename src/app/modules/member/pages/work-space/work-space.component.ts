import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCaseDialogComponent } from './components/add-case-dialog/add-case-dialog.component';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss'],
})
export class WorkSpaceComponent implements OnInit {
  dataSource = [
    {
      title: 'სასამართლო დავა',
      status: 'მიმდინარე',
    },
  ];
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}
  addCase() {
    const dialog = this._dialog.open(AddCaseDialogComponent, {
      width: '100%',
      autoFocus: false,
      disableClose: true,
    });
  }
}
