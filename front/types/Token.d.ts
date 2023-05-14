import { IAuthUser } from "types/Auth";

interface IToken {
  accessToken: string;
  accessTokenLife: string;
  refreshToken: string;
  user: IAuthUser;
}

export { IToken };