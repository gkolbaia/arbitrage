import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('');
  }
  logOut() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    this._router.navigate(['/guest/auth']);
  }
}
