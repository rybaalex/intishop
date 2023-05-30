import { IResponse } from "types/response";
import { ICategoryItem } from "types/Categories";

interface ICollections extends Omit<IResponse, "response"> {
  response: ICategoryItem[];
}

interface ISSRData {
  categories?: ICollections;
  category?: ICollections;
  products?: [];
}

export { ISSRData, ICollections };