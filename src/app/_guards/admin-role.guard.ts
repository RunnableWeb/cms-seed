import { CanActivate } from "@angular/router";
import { CurrentUserService } from "../services";
import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private _currentUser: CurrentUserService) { }

  canActivate() {
    const { _currentUser } = this;
    return Observable.create((observer: Observer<boolean>) => {
      _currentUser.userDetails$.subscribe(function (res) {
        if (res) {  // resolve after user details populated
          if (_currentUser.isAdmin) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
          this.unsubscribe(); // this is the subscription object, this is by: https://github.com/ReactiveX/rxjs/issues/3689
        }
      });
    });
  }
}
