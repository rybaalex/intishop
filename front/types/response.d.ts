interface IResponse {
  errorMessage: string;
  hasError: boolean;
  page?: IPage;
  response: null | [] | {};
}
interface IPage {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}


export { IResponse, IPage };
