import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { CasesService } from '../../services/cases.service';
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
  constructor(
    private _dialog: MatDialog,
    private _casesService: CasesService,
    private _loadingService: LoadingService
  ) {
    this.loadDraftCases();
  }

  ngOnInit(): void {}
  addCase() {
    const dialog = this._dialog.open(AddCaseDialogComponent, {
      width: '100%',
      autoFocus: false,
      disableClose: true,
    });
  }
  loadDraftCases() {
    this._loadingService.loadingOn();
    this._casesService.getDraftCases().subscribe(
      (res: any) => {
        this.dataSource = res.result.data;
        console.log(this.dataSource);
        this._loadingService.loadingOff();
      },
      (err) => {
        this._loadingService.loadingOff();
      }
    );
  }
  bindCaseToArbitr(e: any) {
    console.log(e);
    if (e.success) {
      this.loadDraftCases();
    }
  }
}
