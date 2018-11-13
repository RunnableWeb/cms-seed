import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { CurrentUserService } from "src/rw-ng-common/services";
import { IRWUser, IRWNgCommonModuleConfig } from "src/rw-ng-common/interfaces";

@Component({
  selector: "app-dashboard-default-selector",
  templateUrl: "./dashboard-default-selector.component.html",
  styleUrls: ["./dashboard-default-selector.component.scss"]
})
export class DashboardDefaultSelectorComponent implements OnInit {
  constructor(
    private _router: Router,
    private _currentUser: CurrentUserService,
  ) { }

  ngOnInit() {
    const { _currentUser } = this;
    _currentUser.userDetails$.subscribe((userDetials:IRWUser) => {
      if (userDetials) {
        /**
         * 
         * TODO BUSINESS SPECIFIC HANDLING 
         * 
         */
        this._router.navigate(["dashboard/shopsList"])

      } else {
          this._router.navigate(['/login']);
        }
    });
  }
}
