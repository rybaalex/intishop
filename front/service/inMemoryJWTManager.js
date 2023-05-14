const inMemoryJWTManager = () => {
  let inMemoryJWT = null;
  let isRefreshing = null;
  let logoutEventName = "ra-logout";
  let refreshEndpoint = process.env.NEXT_PUBLIC_APP_FETCH + "/api/v1/refresh";
  let refreshTimeOutId;
  const setLogoutEventName = name => logoutEventName = name;

  const refreshToken = (delay) => {
    abortRefreshToken();
    refreshTimeOutId = window.setTimeout(
      getRefreshedToken,
      delay * 1000 - 5000
    );
  };

  const abortRefreshToken = () => {
    if (refreshTimeOutId) {
      window.clearTimeout(refreshTimeOutId);
    }
  };

  const waitForTokenRefresh = () => {
    if (!isRefreshing) {
      return Promise.resolve();
    }
    return isRefreshing.then(() => {
      isRefreshing = null;
      return true;
    });
  };

  const getRefreshedToken = () => {
    const request = new Request(refreshEndpoint, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include"
    });

    isRefreshing = fetch(request)
      .then((response) => {
        if (response.status !== 200) {
          eraseToken();
          return { token: null };
        }
        return response.json();
      })
      .then(({ accessToken, accessTokenLife }) => {

        if (accessToken) {
          setToken(accessToken, accessTokenLife);
          return true;
        }
        eraseToken();
        return false;
      });
    return isRefreshing;
  };

  const getToken = () => inMemoryJWT;

  const setToken = (token, delay) => {
    inMemoryJWT = token;
    refreshToken(delay);
    return true;
  };

  const eraseToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();
    localStorage.setItem(logoutEventName, Date.now());
    return true;
  };

  if (typeof window === "object") {
    window.addEventListener("storage", (event) => {
      if (event.key === logoutEventName) {
        inMemoryJWT = null;
      }
    });
  }

  return {
    eraseToken,
    getRefreshedToken,
    getToken,
    setLogoutEventName,
    setToken,
    waitForTokenRefresh
  };
};

export default inMemoryJWTManager();