import { IRWUser } from "src/rw-ng-common/interfaces";

export interface Interfaces { }

export interface ILogin {
  username: string;
  password: string;
}

export interface IAppUser extends IRWUser {
}
