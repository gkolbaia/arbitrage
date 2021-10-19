import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { CasesService } from '../../services/cases.service';
import { AddCaseDialogComponent } from './components/add-case-dialog/add-case-dialog.component';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss'],
})
export class WorkSpaceComponent implements OnInit {
  tableProgressBar: boolean = false;
  term?: string;
  dataSource = [];
  searchControl: FormControl = new FormControl();
  constructor(
    private _dialog: MatDialog,
    private _casesService: CasesService,
    private _loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  addCase() {
    const dialog = this._dialog.open(AddCaseDialogComponent, {
      width: '100%',
      autoFocus: false,
      disableClose: true,
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
