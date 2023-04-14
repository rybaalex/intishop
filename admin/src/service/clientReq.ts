import axios from "axios";
import { apiPath, headers } from "../utils/bootstrap";

const clientReq = axios.create({
  withCredentials: true,
  baseURL: apiPath,
  headers: headers
});
export { clientReq };