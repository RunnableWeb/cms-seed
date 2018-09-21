import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ILogin } from "../../interfaces";
import { CurrentUserService } from "../../services/current-user.service";
import { UsersService } from "../../services/users.service";
import { ToasterService } from "../../services";
import { ComponentBase } from "../../component.base";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent extends ComponentBase implements OnInit {
  hidePassword: boolean;
  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _toastrService: ToasterService,
  ) {
    super([
      'MSG_LOGIN_FAIL'
    ]);
  }

  async ngOnInit() {
    this.hidePassword = true;
    await this.translateKeys();
  }

  async login(userLoginDetails: ILogin) {
    const userLoginReponse = await this._usersService.login(userLoginDetails);
    if (userLoginReponse) {
      await this._usersService.getUserDetails(userLoginReponse.userId);
      this._router.navigate(["dashboard"]);
    }
  }
}
