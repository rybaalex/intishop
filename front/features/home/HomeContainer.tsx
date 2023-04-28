import { Container } from "components/common/container";
import { FC } from "react";
import Styles from "./Home.module.scss";
import { IResponse, ISSRData } from "types/response";
import { Banners } from "features/home/banners";
import { Gifts } from "features/home/gift";
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

const HomeContainer: FC<ISSRData> = ({ banners, gifts }) => {
  return (<Container className={"wrapper"}>
      <div>
        <Banners banners={banners} gifts={gifts} />
      </div>
    </Container>
  );
};
export { HomeContainer };
