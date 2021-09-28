import { Component, OnInit } from '@angular/core';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-answer-sheet',
  templateUrl: './answer-sheet.component.html',
  styleUrls: ['./answer-sheet.component.scss'],
})
export class AnswerSheetComponent implements OnInit {
  constructor(private _caseService: CaseService) {}
  case: any;
  ngOnInit(): void {
    this._caseService.case.subscribe((res) => {
      this.case = res;
    });
  }
}
