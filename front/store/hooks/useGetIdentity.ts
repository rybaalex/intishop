import { useState } from "react";
import { dataProvider } from "service/dataProvider";
import { IParams } from "types/Request";


const useGetIdentity = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(undefined);

  const getIdentity = (resource: string) => {

    setIsLoading(true);
    return dataProvider.getIdentity(resource)
      .then(data => {
        setIsLoading(false);
        return data;
      }).catch(e => {
        setIsError(e);
      });
  };

  return { isLoading, getIdentity, isError };
};

export { useGetIdentity };