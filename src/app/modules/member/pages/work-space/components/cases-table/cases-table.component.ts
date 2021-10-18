import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseUserComponent } from 'src/app/modules/case-user/case-user.component';
import { CaseDetailsComponent } from 'src/app/modules/shared/components/case-details/case-details.component';
import { CaseStatus } from 'src/app/modules/shared/enums/case-status.enum';

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  styleUrls: ['./cases-table.component.scss'],
})
export class CasesTableComponent implements OnInit {
  displayedColumns: string[] = ['caseId', 'title', 'status', 'actions'];
  @Input() dataSource?: any[];
  @Input() tableName?: string;
  @Output() bindCaseToArbitr = new EventEmitter<any>();
  CaseStatus: any = CaseStatus;
  @Input() page?: {
    number: number;
    total: number;
    size: number;
  };
  constructor(private _matDialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  openEditDialog(element: any) {
    const dialogRef = this._matDialog.open(CaseDetailsComponent, {
      data: element,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res?.success) {
        this.bindCaseToArbitr.emit(res);
        this._snackBar.open(
          `საქმე დაეწერა ${res.firstName} ${res.lastName}`,
          'ok',
          {
            duration: 2000,
            panelClass: 'success-message',
          }
        );
      }
    });
  }
  deleteItem(element: any) {}
  pageEvent(e: any) {}
}
