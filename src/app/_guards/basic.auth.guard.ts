import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { CurrentUserService } from "../services/current-user.service";

@Injectable()
export class BasicAuthGuard implements CanActivate {
  private _isAuthorized = false;
  constructor(
    private router: Router,
    private _currentUserService: CurrentUserService
  ) {
    _currentUserService.isAuthorized.subscribe(data => {
      this._isAuthorized = data;
    });
  }

  canActivate() {
    if (!this._isAuthorized) this.router.navigate(["login"]);
    return this._isAuthorized;
  }
}
