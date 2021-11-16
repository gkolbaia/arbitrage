import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CaseMeeting } from '../interfaces/case-meeting.interface';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private _http: HttpClient) {}
  findCases(
    status: string,
    paging: { page: number; size: number; total?: number },
    term: string | undefined
  ) {
    const data = { status, term };
    return this._http.post(`api/case/find`, { data, paging });
  }
  search(term: string, status?: string) {
    const data = { term, status };
    return this._http
      .post(`api/case/search`, { data })
      .pipe(map((res: any) => res.result.data));
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
  addCaseMeeting(_caseId: string, data: { arbitrageMeetings: CaseMeeting[] }) {
    return this._http
      .post(`api/case/${_caseId}/meeting`, { data })
      .pipe(map((res: any) => res.result.data));
  }
}
