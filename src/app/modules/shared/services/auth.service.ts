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
  get isSuperAdmin(): Observable<boolean> {
    return this.session.pipe(
      map(this.checkSuperAdmin),
      catchError(() => of(false))
    );
  }
  get isPresident(): Observable<boolean> {
    return this.session.pipe(
      map(this.checkPresident),
      catchError(() => of(false))
    );
  }
  get isArbitr(): Observable<boolean> {
    return this.session.pipe(
      map(this.checkArbitr),
      catchError(() => of(false))
    );
  }
  get session() {
    return this._http.get('/api/auth/user');
  }
  private checkLogin(body: any): boolean {
    if (body && body._id) {
      return true;
    } else {
      return false;
    }
  }
  private checkSuperAdmin(body: any): boolean {
    if (body?.roles?.length) {
      const superAdmin = body.roles.find(
        (role: string) => role === 'SUPERADMIN'
      );
      return superAdmin ? true : false;
    } else {
      return false;
    }
  }
  private checkPresident(body: any) {
    if (body?.roles?.length) {
      const superAdmin = body.roles.find(
        (role: string) => role === 'PRESIDENT'
      );
      return superAdmin ? true : false;
    } else {
      return false;
    }
  }
  private checkArbitr(body: any) {
    if (body?.roles?.length) {
      const superAdmin = body.roles.find((role: string) => role === 'ARBITR');
      return superAdmin ? true : false;
    } else {
      return false;
    }
  }
  get arbitr() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.roles?.length) {
      const arbitr = user.roles.find((role: string) => role === 'ARBITR');
      return arbitr;
    }
    return false;
  }
  get president() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.roles?.length) {
      const president = user.roles.find((role: string) => role === 'PRESIDENT');
      return president;
    }
    return false;
  }
  get superAdmin() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.roles?.length) {
      const superAdmin = user.roles.find(
        (role: string) => role === 'SUPERADMIN'
      );
      return superAdmin;
    }
    return false;
  }
}
