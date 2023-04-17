import { fetchUtils } from "ra-core";
import queryString from "query-string";
import inMemoryJWTManager from "./inMemoryJWTManager";

const apiUrl = process.env.REACT_APP_APP_FETCH + "/api/v1/admin";
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
    options.credentials = "include";
  }
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
};
//const httpClient = fetchUtils.fetchJson;
const dataProvider = {

  getOne: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
    return { data: json.response };
  }),
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage]),
      filter: JSON.stringify(params.filter)
    };
    const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
    return await httpClient(url).then(({ json }) => {
      return {
        data: json ? json.response.id === undefined ? json.response : [json.response] : [],
        total: json.page.totalRecords
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
    let result = params.data;
    if (typeof params.data.logo == "object") {
      await convertFileToBase64(params.data.logo).then(base64 => {
        result.logo = {
          img: base64.toString(),
          title: `${params.data.logo.title}`,
          mimeType: `${params.data.logo.rawFile.type}`
        };
      });

    } else {

    }

    if (typeof params.data.image_menu_background == "object") {
      await convertFileToBase64(params.data.image_menu_background).then(base64 => {
        result.image_menu_background = {
          img: base64.toString(),
          title: `${params.data.image_menu_background.title}`,
          mimeType: `${params.data.image_menu_background.rawFile.type}`
        };
      });

    } else {

    }

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(result)
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id }
    }));
  },

  update: async (resource, params) => {
    let result = params.data;
    if (params.data.logo && typeof params.data.logo === "object") {
      if (params.data?.logo?.title !== params.previousData?.logo?.title) {
        await convertFileToBase64(params.data.logo).then(base64 => {
          result.logo = {
            img: base64.toString(),
            title: `${params.data.logo.title}`,
            mimeType: `${params.data.logo.rawFile.type}`
          };
        });
      }
    } else {

    }
    if (params.data.image_menu_background && typeof params.data.image_menu_background == "object") {
      if (params.data?.image_menu_background?.title !== params.previousData?.image_menu_background?.title) {
        await convertFileToBase64(params.data.image_menu_background).then(base64 => {
          result.image_menu_background = {
            img: base64.toString(),
            title: `${params.data.image_menu_background.title}`,
            mimeType: `${params.data.image_menu_background.rawFile.type}`
          };
        });
      }
    } else {
    }

    return httpClient(`${apiUrl}/${resource}`, {
      method: "PUT",
      body: JSON.stringify(params.data)
    }).then(({ json }) => {
      return { data: json.response };
    });
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    return httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "PUT",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({ data: json }));
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE"
    }).then(({ json }) => ({ data: json.response })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    return httpClient(`${apiUrl}/${resource}?${queryString.stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({ data: json.response }));
  }
};
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if ((encoded.length % 4) > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
};

export { dataProvider };