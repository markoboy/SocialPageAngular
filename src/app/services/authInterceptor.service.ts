import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the AuthService
    const auth = this.injector.get(AuthService);
    // Update request params to include the token
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${auth.token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(req);
  }

}
