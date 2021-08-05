import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  login(user: { username: string; password: string }) {
    return this._http.post('api/auth/login', {
      data: { user },
    });
  }
  get isLoggedIn(): Observable<boolean> {
    return this.session.pipe(
      map(this.checkLogin),
      catchError(() => of(false))
    );
  }
  get session() {
    return this._http.get('/api/auth/user');
  }
  private checkLogin(body: any): boolean {
    console.log(body);
    if (body && body._id) {
      return true;
    } else {
      return false;
    }
  }
}
