const inMemoryJWTManager = () => {
  let inMemoryJWT = null;
  let isRefreshing = null;
  let logoutEventName = "ra-logout";
  let refreshEndpoint = process.env.REACT_APP_APP_FETCH + "/api/v1/admin/refresh";
  let refreshTimeOutId;

  const setLogoutEventName = name => logoutEventName = name;

  const refreshToken = (delay) => {
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
          global.console.log(
            "Token renewal failure"
          );
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

  // This listener will allow to disconnect a session of ra started in another tab
  window.addEventListener("storage", (event) => {
    if (event.key === logoutEventName) {
      inMemoryJWT = null;
    }
  });
  useEffect(()=>{

  }, [])

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