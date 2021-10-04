import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('');
  }
  logOut() {
    localStorage.removeItem('access-token');
    this._router.navigate(['/guest/auth'])
  }
}
