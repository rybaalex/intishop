import { useState } from "react";
import { dataProvider } from "service/dataProvider";
import { IParams } from "types/Request";


const useGetOne = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(undefined);

  const getOne = (resource: string, params?: IParams, auth = false) => {

    setIsLoading(true);
    return dataProvider.getOne(resource, { id:params.id, auth })
      .then(data => {
        setIsLoading(false);
        return data;
      }).catch(e => {
        setIsError(e);
      });
  };

  return { isLoading, getOne, isError };
};

export { useGetOne };