import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Case } from '../../shared/interfaces/case.interface';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  case: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _http: HttpClient) {}
  createCase(data: Case) {
    return this._http
      .post('api/case', { data })
      .pipe(map((res: any) => res.result.data));
  }
  setCase(data: any) {
    this.case.next(data);
  }
  getCase(caseNumber: string) {
    return this._http
      .get(`api/case/${caseNumber}`)
      .pipe(map((res: any) => res.result.data));
  }
  addDefendantFiles(data: { _id: string; defendantFiles: any[] }) {
    return this._http
      .post(`api/case/defendant/files`, { data })
      .pipe(map((res: any) => res.result.data));
  }
  addReportFiles(data: { _id: string; reportFiles: any[] }) {
    return this._http
      .post(`api/case/report/files`, { data })
      .pipe(map((res: any) => res.result.data));
  }
  getCaseForCaseUser() {
    return this._http.get(`api/case/`).pipe(map((res: any) => res.result.data));
  }
  rejectCase(id: string) {
    return this._http
      .patch(`api/case/reject/${id}`, {})
      .pipe(map((res: any) => res.result.data));
  }
  bindUserToCase(data: { position: string; _id: string }[], caseId: string) {
    return this._http
      .patch(`api/case/bind/user/case/${caseId}`, { data })
      .pipe(map((res: any) => res.result.data));
  }
  addArbitrageFiles(data: any) {
    return this._http
      .post(`api/case/arbitrage/files`, { data })
      .pipe(map((res: any) => res.result.data));
  }
  changeCaseStatus(data: any) {
    return this._http
      .patch(`api/case/status`, { data })
      .pipe(map((res: any) => res.result.data));
  }
  editCase(data: any, _id: string) {
    return this._http
      .put(`api/case/${_id}`, { data })
      .pipe(map((res: any) => res.result.data));
  }
}
