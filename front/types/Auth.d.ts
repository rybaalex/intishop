type IAuthProvider = {
  login: (
    params: any
  ) => Promise<{ redirectTo?: string | boolean } | void | any>;
  logout?: (params: any) => Promise<void | false | string>;
  checkAuth?: () => Promise<boolean>;
  setIdentity?: () => boolean;
  getPermissions?: (params: any) => Promise<any>;
  [key: string]: any;
};

interface IAuthUser {
  email?: string;
  id?: string;
  isActivated?: boolean;
  name?: string;
  roles?: string[];
}

interface IAuth {
  identity?: boolean;
  data?: IAuthUser;
}

export { IAuthProvider, IAuthUser, IAuth };