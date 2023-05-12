import { AuthProvider } from "react-admin";
import { Login } from "../service/auth/login";
import { GetMe } from "../service/auth/getMe";
import inMemoryJWTManager from "./inMemoryJWTManager";
import { AxiosResponse } from "axios";

const authProvider: AuthProvider = {

  login: ({ username, password }) => {
    return Login({ email: username, password: password }).then(response => {
      const userRoles = response.data.user.roles;
      let hasRole = false;
      userRoles.forEach((userRoles: string[]) => {
        if (userRoles.includes("ADMIN")) {
          hasRole = true;
        }
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      if (!hasRole) {
        throw new Error("Нет доступа");
      }
      return response;
    })
      .then(({ data }) => {
        console.log("access token", data.accessToken);
        inMemoryJWTManager.setToken(data.accessToken, data.accessTokenLife);
      })
      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : String(err).split(":")[1]);
      });
  },
  checkError: error => {
    const status = error.status;
    if (status === 401 || status === 403) {
      inMemoryJWTManager.eraseToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return inMemoryJWTManager.getRefreshedToken().then(() => {
      return inMemoryJWTManager.getToken() ? Promise.resolve() : Promise.reject({ message: false });
    });
  },
  logout: () => {
    inMemoryJWTManager.eraseToken();
    return Promise.resolve();
  },
  getIdentity: async () => {
    try {
      const data = await inMemoryJWTManager.waitForTokenRefresh().then(() => {
        const token = inMemoryJWTManager.getToken();
        if (token) {
          return GetMe({ token: token }).then(data => {
            if (Object.entries(data.data).length !== 0) {
              return data;
            } else {
              return data;
            }
          }).catch(e => {
            console.log("error getIdentity", e);
          });
        }
      });
      const resData = (data as AxiosResponse).data;
      return Promise.resolve({ id: resData.id, fullName: resData.name, avatar: "" });

    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    return inMemoryJWTManager.waitForTokenRefresh().then(() => {
      return inMemoryJWTManager.getToken() ? Promise.resolve() : Promise.reject();
    });
  }
};
export { authProvider };