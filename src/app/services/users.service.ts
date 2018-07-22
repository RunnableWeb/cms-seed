import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CRUDService } from './generic-services/crud.service';
import { IAppUser, ILogin, ILBUserLoginResponse, ILBUserRole, IAppUserCreateOrUpdateRequest } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CRUDService<IAppUser> {
  apiUrl = `${environment.api.baseUrl}/appUsers`;
  private _apiUrlRoles = `${environment.api.baseUrl}/roles`;

  constructor(
    protected http: HttpClient,
    private _toasterService: ToasterService,
    private _currentUserService: CurrentUserService
  ) {
    super(http);
  }

  login(loginData: ILogin): Promise<ILBUserLoginResponse> {
    return this.http
      .post(`${this.apiUrl}/login`, loginData)
      .toPromise()
      .then((model: ILBUserLoginResponse) => {
        this._currentUserService.onUserJustLoggedIn(model);
        return model;
      })
      .catch(e => {
        this._toasterService.showError('MSG_LOGIN_FAIL');
        return Promise.reject(null);
      });
  }

  getUserDetails(userId: string): Promise<IAppUser> {
    return this.http
      .get(`${this.apiUrl}/${userId}?filter[include]=roles`)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(e => {
        this._toasterService.showError('USER.MSG_USER_GET_ERROR');
        return null;
      });
  }

  getUsersDetails(): Promise<IAppUser[]> {
    return this.http
      .get(`${this.apiUrl}?filter[include]=roles`)
      .toPromise()
      .then(res => {
        return <IAppUser[]>res;
      })
      .catch(e => {
        this._toasterService.showError('USER.MSG_USERS_GET_ERROR');
        return [];
      });
  }

  getRoles(): Promise<ILBUserRole[]> {
    return this.http
      .get(`${this._apiUrlRoles}`)
      .toPromise()
      .then(res => {
        return <ILBUserRole[]>res;
      })
      .catch(e => {
        this._toasterService.showError('ROLE.MSG_ROLES_GET_ERROR');
        return [];
      });
  }

  async createOrUpdate(appUser: IAppUserCreateOrUpdateRequest): Promise<IAppUser> {
    return this.http
      .post(`${this.apiUrl}/createOrUpdate`, appUser)
      .toPromise()
      .then((model: IAppUser) => {
        return model;
      })
      .catch(e => {
        this._toasterService.showError('USER.MSG_CREATRE_NEW_FAIL');
        return Promise.reject(null);
      });
  }

  async deleteUser(id: string): Promise<void> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`)
      .toPromise()
      .then(() => { })
      .catch(e => {
        this._toasterService.showError('USER.MSG_CREATRE_NEW_FAIL');
        throw e;
      });
  }
}
