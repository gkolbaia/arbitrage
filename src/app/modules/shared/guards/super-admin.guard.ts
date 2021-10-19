import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkSuperAdmin(url);
  }
  checkSuperAdmin(url: string): Observable<any> {
    return this._authService.isSuperAdmin.pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          return;
        }
        // should navigate to forbidden route
        this._router.navigate(['/guest/auth']);
      })
    );
  }
}
