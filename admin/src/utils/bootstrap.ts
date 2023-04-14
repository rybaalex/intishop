const apiPath = process.env.REACT_APP_APP_FETCH + "/api/v1";
const uploadPath = process.env.REACT_APP_APP_UPLOADS;
const headers = {
  accept: "text/plain'",
  "Content-Type": "application/json"
};

export {
  headers,
  apiPath,
  uploadPath
};
