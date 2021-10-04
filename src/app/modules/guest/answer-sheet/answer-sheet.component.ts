import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-answer-sheet',
  templateUrl: './answer-sheet.component.html',
  styleUrls: ['./answer-sheet.component.scss'],
})
export class AnswerSheetComponent implements OnInit {
  constructor(
    private _caseService: CaseService,
    private _activatedRoute: ActivatedRoute
  ) {}
  case: any;
  caseUser: any;
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((res) => {
      if (res?.caseId) {
        this._caseService.getCase(res.caseId).subscribe((res) => {
          this.case = res.result;
          this.caseUser = res.user;
        });
      }
    });
  }
}
