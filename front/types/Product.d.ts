import { IResponse } from "types/response";
import { ICategoriesResponse, ICategoryItem } from "types/Categories";

interface IProductsResponse extends Omit<IResponse, "response"> {
  response?: IProductItem[];
}

interface ISSRProducts {
  products: IProductsResponse;
  category: ICategoriesResponse;
  categories: ICategoriesResponse;
}

interface IProductItem {
  id: string,
  name: string,
  description: string,
  sort: number,
  image: string,
  published: boolean,
  image_menu_background: object,
  alias: string,
  parent_id: string
}

export { ISSRProducts };