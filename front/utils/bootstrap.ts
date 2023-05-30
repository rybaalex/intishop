import * as process from "process";

const adminPath = "/admin/";
const apiPath = process.env.NEXT_PUBLIC_APP_FETCH + "/api/v1";
const catalogPath = process.env.NEXT_PUBLIC_APP_URL+"/collection";
const uploadsPath = process.env.NEXT_PUBLIC_APP_FETCH + "/uploads";
const headers = {
  accept: "text/plain'",
  "Content-Type": "application/json"
};

export {
  headers,
  adminPath,
  apiPath,
  uploadsPath,
  catalogPath
};
