import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // this.navigation();
  }
  logOut() {
    localStorage.removeItem('access-token');
    // localStorage.removeItem('user');
    this._router.navigate(['/guest/auth']);
  }
  private navigation(): void {
    if (this._authService.arbitr || this._authService.president) {
      this._router.navigate(['admin/work']);
    } else if (this._authService.superAdmin) {
      this._router.navigate(['admin/um']);
    }
  }
  get superAdmin() {
    return this._authService.superAdmin;
  }
}
