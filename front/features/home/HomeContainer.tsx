import { Container } from "components/common/container";
import { FC } from "react";
import { Banners } from "features/home/banners";
import { ISSRData } from "./Home.d";
import { Advantages } from "features/home/advantages";


const HomeContainer: FC<ISSRData> = ({ banners, gifts }) => {
  return (<Container className={"wrapper"}>
      <div>
        <Banners banners={banners} gifts={gifts} />
        <Advantages />
      </div>
    </Container>
  );
};
export { HomeContainer };
