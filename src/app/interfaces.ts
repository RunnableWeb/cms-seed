export interface Interfaces { }

export interface ILogin {
  username: string;
  password: string;
}


export interface IAppUser {
  id: string;
  username: string;
  email: string;
  // relation
  roles?: ILBUserRole[];
}

export interface ILBUserRole {
  id: string;
  name: string;
}

export interface ILBUserLoginResponse {
  created: string;
  id: string;
  ttl: number;
  userId: string;
}

export interface IAppUserCreateOrUpdateRequest {
  appUser: IAppUser,
  rolesRemovedIds: string[],
  rolesAddedIds: string[]
}