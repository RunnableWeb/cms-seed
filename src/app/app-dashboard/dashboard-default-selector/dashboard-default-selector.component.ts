import { Component, OnInit } from "@angular/core";
import { CurrentUserService } from "../../services";
import { IAppUser } from "../../interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-default-selector",
  templateUrl: "./dashboard-default-selector.component.html",
  styleUrls: ["./dashboard-default-selector.component.scss"]
})
export class DashboardDefaultSelectorComponent implements OnInit {
  constructor(
    private _router: Router,
    private _currentUser: CurrentUserService
  ) { }

  ngOnInit() {
    const { _currentUser } = this;
    _currentUser.userDetails$.subscribe((userDetials: IAppUser) => {
      if (userDetials) {
        this._router.navigate(["dashboard/shopsList"])
        // if (_currentUser.isAdmin) {
        //   this._router.navigate(["dashboard/businesses"]);
        // } else {
        //   this._router.navigate([
        //     `/dashboard/businesses/${userDetials.businessId}/orders`
        //   ]);
        // }
      }
    });
  }
}
