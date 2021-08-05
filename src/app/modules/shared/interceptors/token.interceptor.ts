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

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
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
          if (event.headers.get('access-token')) {
            localStorage.setItem(
              'access-token',
              event.headers.get('access-token') || ''
            );
          }
          if (event.status === 401) {
            localStorage.removeItem('session-token');
          }
        }
        return event;
      })
    );
  }
}
