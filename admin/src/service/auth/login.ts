import { clientReq } from "../clientReq";

interface IReqLogin {
  email: string;
  password: string;
  forgot?: boolean;
}

const Login = (value: IReqLogin) => {
  return clientReq.post("/admin/signin", value);
};
export { Login };