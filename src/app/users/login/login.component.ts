import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ILogin } from "../../interfaces";
import { CurrentUserService } from "../../services/current-user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hidePassword: boolean;
  constructor(
    private _router: Router,
    private _currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.hidePassword = true;
  }

  login(userLoginDetails: ILogin) {
    this._currentUserService.login(userLoginDetails).subscribe(data => {
      this._router.navigate(["dashboard"]);
    });
  }
}
