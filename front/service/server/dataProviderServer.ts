import { clientReq } from "service/clientReq";
import { ErrorResponse } from "service/ErrorResponse";
import { IParams } from "types/Request";
import { apiPath } from "utils/bootstrap";
import * as queryString from "querystring";

const getList = (resource: string, params?: IParams) => {
  const { pagination, sort, filter }: IParams = params !== undefined ? {
    pagination: params.pagination,
    sort: params.sort,
    filter: params.filter
  } : {
    pagination: { page: 0, perPage: 0 },
    sort: { field: "sort", order: "DESC" },
    filter: {}
  };
  const query = {
    sort: JSON.stringify(sort),
    range: JSON.stringify(pagination),
    filter: JSON.stringify(filter)
  };
  const url = `${apiPath}/${resource}?${queryString.stringify(query)}`;
  return clientReq.get(url)
    .then(data => data.data)
    .catch(() => {
      return ErrorResponse(503, "Connect refused", [], true);
    });
};

export { getList };