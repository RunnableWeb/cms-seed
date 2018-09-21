import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CRUDService } from './generic-services/crud.service';
import { IAppUser, ILogin, ILBUserLoginResponse, ILBUserRole, IAppUserCreateOrUpdateRequest } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CRUDService<IAppUser> {
  apiUrl = `${environment.api.baseUrl}/appUsers`;
  private _apiUrlRoles = `${environment.api.baseUrl}/roles`;

  constructor(
    protected http: HttpClient,
    private _toasterService: ToasterService,
    private _translateSvc: TranslateService,
    private _utilsSvc: UtilsService
  ) {
    super(http);

    this._initTranslation();
  }

  // #region properties
  _onLogin$ = new BehaviorSubject<ILBUserLoginResponse>(null)
  get onLogin$() {
      return this._onLogin$;
  }

  // #endregion properties

  /****************************/

  private async _initTranslation() {
      try{ 
          await this._translateSvc.get([
            'USERS.MSG_LOGIN_FAIL',
            'USERS.MSG_LOGOUT_FAIL',
            "USER.MSG_FAIL_TO_GET_DETAILS"
          ]).toPromise();
      }      
      catch(e) {
        // TODO Logging
      }
  }

  login(loginData: ILogin): Promise<ILBUserLoginResponse> {
    return this.http
      .post(`${this.apiUrl}/login`, loginData)
      .toPromise()
      .then((model: ILBUserLoginResponse) => {
        this.onLogin$.next(model);
        
        return model;
      })
      .catch(e => {
        this._toasterService.showError(this._utilsSvc.syncTranslate('USERS.MSG_LOGIN_FAIL'));
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
        this._toasterService.showError(this._utilsSvc.syncTranslate('USER.MSG_FAIL_TO_GET_DETAILS'));
        return null;
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
