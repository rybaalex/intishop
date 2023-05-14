import { useState } from "react";
import { authProvider } from "service/authProvider";

const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(undefined);

  const getCheckAuth = () => {
    setIsLoading(true);
    return authProvider.checkAuth()
      .then(data => {
        setIsLoading(false);
        return data;
      }).catch(e => {
        setIsError(e);
      });
  };

  return { isLoading, getCheckAuth, isError };
};

export { useCheckAuth };