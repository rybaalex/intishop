import { IResponse } from "types/response";
import { INavItem } from "types/nav";

interface ICategoriesResponse extends Omit<IResponse, "response"> {
  response: ICategoryItem[];
}
interface ICategoryItem {
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

export { ICategoryItem, ICategoriesResponse };