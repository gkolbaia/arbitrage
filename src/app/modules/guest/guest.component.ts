import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService
  ) {
    this.checkUser();
  }

  ngOnInit(): void {}
  checkUser() {
    this._loadingService.loadingOn();
    this._authService.session.subscribe(
      (res: any) => {
        if (res?.type === 'USER') {
          this._router.navigate(['admin']);
        } else if (res?.type === 'CASE') {
          this._router.navigate(['user']);
        }
        this._loadingService.loadingOff();
      },
      (res) => {
        this._loadingService.loadingOff();
      }
    );
  }
}
