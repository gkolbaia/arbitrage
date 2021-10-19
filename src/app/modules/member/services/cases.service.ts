import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
}
