import { useState } from "react";
import { dataProvider } from "service/dataProvider";
import { IParams } from "types/Request";


const useGetList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(undefined);

  const getList = (resource: string, params?: IParams, auth = false) => {

    const { pagination, sort, filter }: IParams = params !== undefined ? {
      pagination: params.pagination,
      sort: params.sort,
      filter: params.filter
    } : {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "sort", order: "DESC" },
      filter: {}
    };

    setIsLoading(true);
    return dataProvider.getList(resource, { pagination, sort, filter, auth })
      .then(data => {
        setIsLoading(false);
        return data;
      }).catch(e => {
        setIsError(e);
      });
  };

  return { isLoading, getList, isError };
};

export { useGetList };