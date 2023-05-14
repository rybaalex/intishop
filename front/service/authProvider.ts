import { IAuthProvider } from "types/Auth";
import { dataProvider } from "service/dataProvider";
import inMemoryJWTManager from "service/inMemoryJWTManager";

const authProvider: IAuthProvider = {
  login: ({ email, password, forgot }) => {
    return dataProvider.create("/signin", { email: email, password: password, forgot: forgot })
      .then(({ data }) => {
        inMemoryJWTManager.setToken(data.json.accessToken, data.json.accessTokenLife);
        return data.json;
      })
      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : String(err).split(":")[1]);
      });
  },
  checkAuth: () => {
    return inMemoryJWTManager.getRefreshedToken().then(() => {
      return !!inMemoryJWTManager.getToken();
    });
  },
};
export { authProvider };