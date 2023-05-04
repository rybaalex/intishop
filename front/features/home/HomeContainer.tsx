import { Container } from "components/common/container";
import { FC } from "react";
import { Banners } from "features/home/banners";
import { ISSRData } from "./Home.d";



const HomeContainer: FC<ISSRData> = ({ banners, gifts }) => {
  return (<Container className={"wrapper"}>
      <div>
        <Banners banners={banners} gifts={gifts} />
      </div>
    </Container>
  );
};
export { HomeContainer };
