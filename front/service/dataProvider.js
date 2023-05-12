import queryString from "query-string";
import inMemoryJWTManager from "./inMemoryJWTManager";
import * as fetchUtils from "./Fetch";

const apiUrl = process.env.NEXT_PUBLIC_APP_FETCH + "/api/v1";
const httpClient = (url, options = {}, auth = false) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
    options.credentials = "include";
  }
  if (auth) {
    const token = inMemoryJWTManager.getToken();
    if (token) {
      options.headers.set("Authorization", `Bearer ${token}`);
      return fetchUtils.fetchJson(url, options);
    } else {
      return inMemoryJWTManager.getRefreshedToken().then((gotFreshToken) => {
        if (gotFreshToken) {
          options.headers.set("Authorization", `Bearer ${inMemoryJWTManager.getToken()}`);
        }
        return fetchUtils.fetchJson(url, options);
      });
    }
  } else return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getOne: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
    return { data: json.response };
  }),
  getIdentity: (resource) => httpClient(`${apiUrl}/${resource}`, {}, true).then(({ json }) => {
    return { data: json.response };
  }),
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination ? params.pagination : { page: 0, perPage: 0 };
    const { field, order } = params.sort ? params.sort : { field: "sort", order: "DESC" };
    const { auth } = params.auth || false;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage]),
      filter: JSON.stringify(params.filter ? params.filter : {})
    };
    const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
    return await httpClient(url, auth).then(({ json }) => {
      return {
        response: json ? json.response.id === undefined ? json.response : [json.response] : [],
        hasError: json.hasError,
        errorMessage: json.errorMessage,
        page: json.page
      };
    });
  },
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids })
    };
    const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },
  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id
      })
    };
    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10)
    }));
  },
  create: async (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params)
    }).then(({ json }) => ({
      data: { json }
    }));
  },
  update: async (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "PUT",
      body: JSON.stringify(params.data)
    }).then(({ json }) => {
      return { data: json.response };
    });
  },

};
export { dataProvider };