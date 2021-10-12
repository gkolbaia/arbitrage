import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from '../guest/services/case.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-case-user',
  templateUrl: './case-user.component.html',
  styleUrls: ['./case-user.component.scss'],
})
export class CaseUserComponent implements OnInit {
  constructor(
    private _router: Router,
    private caseService: CaseService,
    private _loadingService: LoadingService
  ) {
    this.loadData();
  }
  case: any;
  ngOnInit(): void {}
  logOut() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    this._router.navigate(['/guest/auth']);
  }
  loadData() {
    this._loadingService.loadingOn();
    this.caseService.getCaseForCaseUser().subscribe(
      (res) => {
        this.case = res;
        this._loadingService.loadingOff();
        console.log(this.case)
      },
      (err) => {
        this._loadingService.loadingOff();
      }
    );
  }
}
