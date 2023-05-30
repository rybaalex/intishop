import { IResponse } from "types/response";

interface IStocks extends Omit<IResponse, "response"> {
  response: IStockItem[];
}

interface IStockItem {
  description: string,
  id: string,
  image?: {
    mobile?: string,
    tablet?: string,
    desktop?: string
  }
  published: boolean,
  sort: number,
  type: IStockType
  url: string
}

interface IStockType {
  background: string,
  color: string,
  _id: string,
  title: string,
  code: string,
}
interface IBanners extends Omit<IResponse, "response"> {
  response: IBanners[];
}

interface ISSRData {
  banners?: IBanners;
  stocks?: IStocks;
}

export { ISSRData, IStocks, IBanners, IStockItem };