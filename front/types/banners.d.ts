import { IImages } from "types/images";

interface IBanners {
  id?: string,
  image?: IImages,
  name?: string,
  published?: boolean,
  sort?: number,
  url?: string,
  recurse?: string
}

export { IBanners };