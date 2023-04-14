import { clientReq } from "service/clientReq";
import { ErrorResponse } from "service/ErrorResponse";

interface IReqLogin {
  email: string;
  password: string;
  forgot?: boolean;
}

const Login = (value: IReqLogin) => {
  return clientReq.post("/signin", value).catch(()=>{
    return ErrorResponse(503, "Connect refused", [], true);
  });
};
export { Login };