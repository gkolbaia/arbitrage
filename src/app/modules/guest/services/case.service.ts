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
}