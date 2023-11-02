import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth:AuthService) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    
    return this.auth.getAccessTokenSilently()
    .pipe(
        switchMap((token) => {
            if (token !== null && token.length > 0) {

                let authRequest = request;

                const newHeader = request.headers
                    .set("Authorization", "Bearer " + token);

                authRequest = request.clone({
                    headers: newHeader
                });

                return next.handle(authRequest).pipe(tap(evt => {
                    if (evt instanceof HttpResponse) {
                        if (evt.ok == true) {
                            // do something
                        }
                    }
                }),
                catchError((err: HttpErrorResponse, caught) => {
                    if (err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === "application/json") {
                      this.handleBlobErrorObservable(err);
                    }
                    else {
                      this.handleErrorObservable(err);
                    }

                    return throwError(err)
                }));
            }
            else {
                return next.handle(request);
            }
        })
    );
    
  }

  private handleErrorObservable(error: HttpErrorResponse): void {
    let errMsg: string = '';

    if (error.status == 0) {
        errMsg = 'Unable to connect to Api.';
    }
    else {
        let apiError: any = error.error;
        if (apiError.message != null) {
            errMsg += apiError.message;
        }

        for (let key in apiError.errors) {
            errMsg += ` '${key}': ${apiError.errors[key].join(',')}`
        }
    }

    if (error.status === 401 || error.status === 403) {
    }
  }

  private handleBlobErrorObservable(error: HttpErrorResponse): void {
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
          const errObject = JSON.parse((<any>e.srcElement).result);
          let errMessgage: string = errObject && errObject.error ? errObject.error.message : (<any>e.srcElement).result;
      });
      reader.readAsText(error.error);
  }

}
