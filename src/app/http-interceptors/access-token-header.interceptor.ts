import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CurrentUserService } from "../services";
import { Injectable } from "@angular/core";

@Injectable()
export class AccessTokenHeaderInterceptor implements HttpInterceptor {
  constructor(private _currentUser: CurrentUserService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const _currentUser = this.inj.get(CurrentUserService);
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      headers: req.headers.set(
        "X-Access-Token",
        this._currentUser.accessToken || "" // passing undefined as value isn't supported and its problematic, this may happen on login request
      )
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
