import { clientReq } from "service/clientReq";

interface IReqSingUp {
  email: string;
  password: string;
  name: string;
}

const Register = (value: IReqSingUp) => {
  return clientReq.post("/signup", value);
};
export { Register };