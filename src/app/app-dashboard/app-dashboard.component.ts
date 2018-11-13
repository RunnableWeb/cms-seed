import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

import { IAppUser } from '../interfaces';
import { DashboardService } from './dashboard.service';
import { CurrentUserService } from 'src/rw-ng-common/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  pageTitle: string = '';
  hidePageTitle: boolean = false;
  sideNavMenu: ISideNavMenu[];
  userDetials: IAppUser;
  showDashboardLoader$: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _currentUser: CurrentUserService,
    private _dashboardService:DashboardService,
    private _router: Router
  ) {
    this._activatedRoute.url.subscribe(() => {
      if (
        _activatedRoute.snapshot.firstChild.data &&
        _activatedRoute.snapshot.firstChild.data.title
      ) {
        _translateService
          .get(_activatedRoute.snapshot.firstChild.data.title)
          .subscribe(translatedTitle => {
            this.pageTitle = translatedTitle;
          });
      } else {
        if (_activatedRoute.snapshot.firstChild.data.hideTitle) {
          this.hidePageTitle = true;
          return;
        }
        this.pageTitle = `CHECK CONSOLE IN ORDER TO CHANGE OR REMOVE THIS MESSAGE`;
        this._postMessageToConsole();
      }
    });
  }

  ngOnInit(): void {
    const { _currentUser, _dashboardService } = this;

    this.showDashboardLoader$ = _dashboardService.loaderIsShown$;

    _currentUser.userDetails$.subscribe((userDetials: IAppUser) => {
      this.userDetials = userDetials;

      //moved to here to make sure all user details have been initilaized.
      this.sideNavMenu = [
        {
          name: 'SHOPS',
          url: `/dashboard/shopsList`,
          icon: 'business',
          isShown: true // for admins do this _currentUser.isAdmin
        },
        {
          name: 'Link 2',
          url: `/dashboard/shopsList1`,
          icon: 'link',
          isShown: true // for admins do this _currentUser.isAdmin
        },
        {
          name: 'Link 3',
          url: `/dashboard/shopsList2`,
          icon: 'link',
          isShown: true // for admins do this _currentUser.isAdmin
        }
      ]
      
    });
  }

  logout() {
    this._currentUser.logout();
    this._router.navigate(['login']);
  }

  private _postMessageToConsole() {
    //#region header title message
    console.log(
      `--------------------------------------------------------------------------------------`
    );
    console.log(
      `to change or remove title, please add title property to your router data`
    );
    console.log(`for adding:`);
    console.log({
      path: "orders-details",
      component: "OrderDetailsFormComponent",
      data: {
        title: "ORDER.ADD_NEW"
      }
    });
    console.log("for removing:");
    console.log({
      path: "orders-details",
      component: "OrderDetailsFormComponent",
      data: {
        hideTitle: true
      }
    });
    console.log(
      `--------------------------------------------------------------------------------------`
    )
    //#endregion
  }

}

interface ISideNavMenu {
  name: string;
  url: string;
  icon: string;
  isShown: boolean;
}