import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
  errorMessage: string = 'თქვენს მიერ მოთხოვნილი გვერდი ვერ მოიძებნა"';
  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['/guest/case-registration']);
  }
}
