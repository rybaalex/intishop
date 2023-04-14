import { clientReq } from "service/clientReq";
import { ErrorResponse } from "service/ErrorResponse";

const staticPageList = () => {
  return clientReq.get("/staticpage").then(data => data.data).catch(() => {
    return ErrorResponse(503, "Connect resused", [], true);
  });
};
export { staticPageList };