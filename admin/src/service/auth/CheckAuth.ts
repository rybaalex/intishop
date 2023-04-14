import { clientReq } from "../clientReq";

const CheckAuth = (token: { token: string }) => {
  clientReq.defaults.headers.post["Authorization"] = "Bearer " + token.token;
  return clientReq.post("/admin/checkauth");
};
export { CheckAuth };