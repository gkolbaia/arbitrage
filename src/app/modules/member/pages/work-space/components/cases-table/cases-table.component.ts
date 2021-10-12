import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  CaseStatus: any = CaseStatus;
  @Input() page?: {
    number: number;
    total: number;
    size: number;
  };
  constructor(private _matDialog: MatDialog) {}

  ngOnInit(): void {}
  openEditDialog(element: any) {
    this._matDialog.open(CaseDetailsComponent, {
      data: element,
      autoFocus: false,
    });
  }
  deleteItem(element: any) {}
  pageEvent(e: any) {}
}
