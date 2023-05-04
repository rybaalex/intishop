import { IResponse } from "types/response";
import { IProduct } from "features/home/Moke";

interface IGifts extends Omit<IResponse, "response"> {
  response: IProduct[];
}

interface IBanners extends Omit<IResponse, "response"> {
  response: IBanners[];
}

interface ISSRData {
  banners?: IBanners;
  gifts?: IGifts;
}

export { ISSRData, IGifts, IBanners };