import { clientReq } from "../clientReq";

const GetMe = (token: { token: string }) => {
  clientReq.defaults.headers.post["Authorization"] = "Bearer " + token.token;
  return clientReq.post(process.env.REACT_APP_APP_FETCH + "/api/v1/admin/getMe");
};
export { GetMe };