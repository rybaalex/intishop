import { IResponse } from "./response";

interface INavItem {
  id: string,
  sort?: number,
  visible?: boolean,
  children?: INavItem[]
  title?: string,
  url?: string
  published?: true,
  description?: "",
  meta_description?: "",
  meta_title?: "",
  meta_keyword?: "",
  meta_h1?: "",
  isHeader?: true
}

interface INavResponse extends Omit<IResponse, "response"> {
  response: INavItem[];
}

interface INavSlice {
  navState?: INavResponse;
  staticPageState?: INavResponse;
}

export type { INavItem, INavResponse, INavSlice };
