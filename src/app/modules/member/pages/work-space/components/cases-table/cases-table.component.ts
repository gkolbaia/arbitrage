import {
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseUserComponent } from 'src/app/modules/case-user/case-user.component';
import { CasesService } from '../../../../services/cases.service';
import { CaseDetailsComponent } from 'src/app/modules/shared/components/case-details/case-details.component';
import { CaseStatus } from 'src/app/modules/shared/enums/case-status.enum';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { DefendantFormComponent } from 'src/app/modules/guest/case-registration/components/defendant-form/defendant-form.component';
import { EditCaseDialogComponent } from '../edit-case-dialog/edit-case-dialog.component';

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  styleUrls: ['./cases-table.component.scss'],
})
export class CasesTableComponent implements OnInit, OnChanges {
  tableProgressBar: boolean = false;
  // displayedColumns: string[] = ['caseId', 'title', 'status', 'actions'];
  dataSource?: any[];
  @Input() status?: string;
  @Input() term?: string;
  @Output() setLoading = new EventEmitter<boolean>();
  CaseStatus: any = CaseStatus;
  page: {
    page: number;
    total?: number;
    size: number;
  } = {
    page: 0,
    size: 10,
  };
  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _caseService: CasesService,
    public _authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  openDetailsDialog(element: any) {
    const dialogRef = this._matDialog.open(CaseDetailsComponent, {
      data: element,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.loadData();
      if (res?.success && res?.message) {
        this._snackBar.open(res.message, 'ok', {
          duration: 2000,
          panelClass: 'success-message',
        });
      }
    });
  }
  deleteItem(element: any) {}
  pageEvent(e: PageEvent) {
    this.page.size = e.pageSize;
    this.page.page = e.pageIndex;
    this.loadData();
  }
  loadData() {
    if (this.status) {
      this.setLoading.emit(true);
      this._caseService.findCases(this.status, this.page, this.term).subscribe(
        (res: any) => {
          this.dataSource = res.result.data;
          this.page = res.result.page;
          this.setLoading.emit(false);
        },
        (err) => {
          this.setLoading.emit(false);
        }
      );
    }
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.term && !change.status) {
      this.loadData();
    }
  }
  get displayedColumns(): string[] {
    if (this.status === 'DRAFT') {
      return ['caseId', 'title', 'actions'];
    }
    if (this.status === 'ACTIVE') {
      return ['caseId', 'title', 'arbitr', 'actions'];
    }
    if (this.status === 'REJECTED') {
      return ['caseId', 'title', 'actions'];
    }
    if (this.status === 'FINISHED') {
      return ['caseId', 'title', 'arbitr', 'actions'];
    }
    return ['caseId', 'title', 'actions'];
  }
  openEditDialog(element: any) {
    const dialogRef = this._matDialog.open(EditCaseDialogComponent, {
      width: '800px',
      autoFocus: false,
      data: element,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res?.success) {
        this.loadData();
        this._snackBar.open('საქმე წარმატებით დარედაქტირდა', 'ok', {
          duration: 2000,
          panelClass: 'success-message',
        });
      }
    });
  }
}
