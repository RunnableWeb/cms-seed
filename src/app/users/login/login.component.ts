import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ILogin } from "../../interfaces";
import { CurrentUserService } from "../../services/current-user.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hidePassword: boolean;
  constructor(
    private _router: Router,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.hidePassword = true;
  }

  async login(userLoginDetails: ILogin) {
    const userLoginReponse = await this._usersService.login(userLoginDetails);
    if (userLoginReponse) {
      await this._usersService.getUserDetails(userLoginReponse.userId);
      this._router.navigate(["dashboard"]);
    }
  }
}
