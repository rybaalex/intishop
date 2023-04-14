import { clientReq } from "../clientReq";

const GetMe = (token: { token: string }) => {
  clientReq.defaults.headers.post["Authorization"] = "Bearer " + token.token;
  return clientReq.post("/getMe");
};
export { GetMe };