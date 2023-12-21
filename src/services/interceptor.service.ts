import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  user:any = localStorage.getItem('user')
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${ JSON.parse(this.user) !== null && JSON.parse(this.user).accessToken}`,
      },
    });

    return next.handle(modifiedRequest);
  }
}