import { Injectable } from "@angular/core";
import { EUserRole } from "../enums.enum";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ILogin } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class CurrentUserService {
  private _isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  Roels: EUserRole[] = [];
  constructor() {}

  get isAuthorized(): Observable<boolean> {
    return this._isAuthorized;
  }

  login(data: ILogin): Observable<any> {
    //this should be done after user success login
    this._isAuthorized.next(true);

    //returns mock observalbe
    return of({ success: true });
  }
}
