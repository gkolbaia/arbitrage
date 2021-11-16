import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access-token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (event.url?.includes('auth/user')) {
            this._authService.setLoggedUser(event.body);
          }
          if (event.headers.get('access-token')) {
            localStorage.setItem(
              'access-token',
              event.headers.get('access-token') || ''
            );
          }
          if (event.status === 401) {
            this._router.navigate(['/guest/auth']);
            localStorage.removeItem('access-token');
          }
        }
        return event;
      })
    );
  }
}
