import { clientReq } from "service/clientReq";
import { ErrorResponse } from "service/ErrorResponse";
import { IParams } from "types/Request";
import { apiPath } from "utils/bootstrap";
import * as queryString from "querystring";

const getList = (resource: string, params?: IParams) => {
  const { page, perPage } = params.pagination || { page: 1, perPage: 0 };
  const { field, order } = params.sort || { field: "sort", order: "DESC" };

  const query = {
    sort: JSON.stringify([field, order]),
    range: JSON.stringify([(page - 1) * perPage, page * perPage]),
    filter: JSON.stringify(params.filter || {})
  };
  const url = `${apiPath}/${resource}?${queryString.stringify(query)}`;
  return clientReq.get(url)
    .then(data => data.data)
    .catch(() => {
      return ErrorResponse(503, "Connect refused", [], true);
    });
};

export { getList };