import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from '../guest/services/case.service';
import { AuthService } from '../shared/services/auth.service';
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
    private _loadingService: LoadingService,
    private _authService: AuthService
  ) {
    this.loadData();
  }
  case: any;
  ngOnInit(): void {
    console.log(this._authService.loggedUser.getValue());
    if (this._authService.loggedUser.getValue().type !== 'CASE') {
      this._router.navigate(['admin']);
    }
  }
  logOut() {
    localStorage.removeItem('access-token');
    // localStorage.removeItem('user');
    this._router.navigate(['/guest/auth']);
    this._authService.setLoggedUser(null);
  }
  loadData() {
    this._loadingService.loadingOn();
    this.caseService.getCaseForCaseUser().subscribe(
      (res) => {
        this.case = res;
        this._loadingService.loadingOff();
      },
      (err) => {
        this._loadingService.loadingOff();
      }
    );
  }
}
