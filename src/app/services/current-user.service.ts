import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ILogin, IAppUser, ILBUserLoginResponse } from "../interfaces";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserRoles } from "../constants/UserRole";

@Injectable({
  providedIn: "root"
})
export class CurrentUserService {
  private _isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _userDetails$: BehaviorSubject<IAppUser> = new BehaviorSubject<IAppUser>(null);

  roles: Map<string, boolean> = new Map();

  isAdmin: boolean = false;
  businessId: string;

  public accessToken: string;
  public userId: string;

  private _localStorageKey = "USER";
  private _localStorageValue = {};

  constructor(private _http: HttpClient) { }

  get isAuthorized(): Observable<boolean> {
    return this._isAuthorized$;
  }

  public setIsAuthorizedValue(value: boolean) {
    this._isAuthorized$.next(value);
  }

  get userDetails$() {
    return this._userDetails$;
  }

  init() {
    const stUser = <ILBUserLoginResponse>(
      JSON.parse(localStorage.getItem(this._localStorageKey))
    );

    if (!stUser) {
      // init it
      localStorage.setItem(
        this._localStorageKey,
        JSON.stringify(this._localStorageValue)
      );

      this._isAuthorized$.next(false);
    } else {
      if (stUser.id && stUser.userId) {
        this._populatePropertiesFromStorageModel(stUser);

        this._initUserDetails(stUser);

      } else {
        this._isAuthorized$.next(false);
      }
    }
  }

  private _initUserDetails(stUser: ILBUserLoginResponse) {
    // interceptor will catch 401 response and set the _isAuthorized value to false if needed.
    return this._http
      .get(
        `${environment.api.baseUrl}/appUsers/${
        stUser.userId
        }?filter[include]=roles`
      )
      .toPromise()
      .then((userDetails: IAppUser) => {

        this._setUserRoles(userDetails);
        this._userDetails$.next(userDetails);
        this._isAuthorized$.next(true);
      });
  }

  private _setUserRoles(userDetails: IAppUser) {
    userDetails.roles &&
      userDetails.roles.forEach(role => this.roles.set(role.name, true));

    this.isAdmin = this.roles.get(UserRoles.admin) === true;
  }
  private _populatePropertiesFromStorageModel(stUser: ILBUserLoginResponse) {
    this.accessToken = stUser.id;
    this.userId = stUser.userId;
  }

  public onUserJustLoggedIn(model: ILBUserLoginResponse): void {
    //save data to storage
    const { _localStorageKey } = this;
    let stUser = JSON.parse(localStorage.getItem(_localStorageKey));
    stUser = { ...stUser, ...model };
    localStorage.setItem(_localStorageKey, JSON.stringify(stUser));
    this.accessToken = model.id;
    this._initUserDetails(stUser);
  }

  logout() {
    localStorage.setItem(
      this._localStorageKey,
      JSON.stringify({})
    );

    this.roles = new Map([]);
    this._userDetails$.next(null);
    this._isAuthorized$.next(false);
  }
}
