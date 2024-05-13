import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( private toastService: NotificationService,  private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: any) => {

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.router.navigate(['/login']);
            }
            if (err.status === 403) {
                this.toastService.error("Session terminada vuelva a iniciar session")
                window.sessionStorage.clear
            }
            return throwError(err.error);
        }));
    }
}
