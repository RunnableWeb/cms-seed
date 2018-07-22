import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { tap } from "rxjs/operators";
import { CurrentUserService } from "../services";

@Injectable()
export class UnAuthenticatedInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    private _currentUser: CurrentUserService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._currentUser.setIsAuthorizedValue(false);
              this._router.navigate(["login"]);
            }
          }
        }
      )
    );
  }
}
