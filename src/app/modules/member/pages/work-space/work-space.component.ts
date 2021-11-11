import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { CasesService } from '../../services/cases.service';
import { AddCaseDialogComponent } from './components/add-case-dialog/add-case-dialog.component';
import { CasesTableComponent } from './components/cases-table/cases-table.component';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss'],
})
export class WorkSpaceComponent implements OnInit {
  tableProgressBar: boolean = false;
  term?: string;
  dataSource = [];
  @ViewChild(CasesTableComponent) caseTabe?: CasesTableComponent;
  searchControl: FormControl = new FormControl();
  constructor(
    private _dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _loadingService: LoadingService,
    public _authService: AuthService
  ) {}

  ngOnInit(): void {}
  addCase() {
    const dialog = this._dialog.open(AddCaseDialogComponent, {
      width: '100%',
      autoFocus: false,
      disableClose: true,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.caseTabe?.loadData();
        this._snackBar.open('საქმე დამატებულია', 'ok', {
          duration: 2000,
          panelClass: 'success-message',
        });
      }
    });
  }
  search(e: MouseEvent) {
    e.preventDefault();
    if (this.searchControl?.value?.length >= 3) {
      this.term = this.searchControl.value;
    } else {
      //TODO snackbar
    }
  }
  clearSearch() {
    this.searchControl.setValue(null);
    this.term = this.searchControl.value;
  }
  setLoading(e: boolean) {
    this.tableProgressBar = e;
    this.cdRef.detectChanges();
  }
}
