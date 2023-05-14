import { Container } from "components/common/container";
import { FC } from "react";
import { Banners } from "features/home/banners";
import { ISSRData } from "./Home.d";
import { Advantages } from "features/home/advantages";
import { Stocks } from "features/home/stocks";


const HomeContainer: FC<ISSRData> = ({ banners, stocks }) => {
  return (<Container className={"wrapper"}>
      <div>
        <Banners banners={banners} />
        <Stocks stocks={stocks} />
        <Advantages />
      </div>
    </Container>
  );
};
export { HomeContainer };
