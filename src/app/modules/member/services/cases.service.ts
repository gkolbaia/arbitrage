import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private _http: HttpClient) {}
  getDraftCases() {
    return this._http.get(`api/case/find/draft`);
  }
}
