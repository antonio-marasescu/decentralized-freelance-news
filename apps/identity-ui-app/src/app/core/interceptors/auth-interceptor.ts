import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLogout = req.url.includes('logout');

    if (isLogout) {
      localStorage.removeItem('authorization');
      return of(new HttpResponse({ status: 200 }));
    }
    let updatedRequest: HttpRequest<unknown>;
    const jwtToken = localStorage.getItem('authorization');
    if (jwtToken) {
      updatedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
      });
    } else {
      updatedRequest = req.clone();
    }
    return next.handle(updatedRequest).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          if (response.status === 401) {
            localStorage.removeItem('authorization');
          }
        }
      })
    );
  }
}
