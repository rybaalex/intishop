import { Container } from "components/common/container";
import { FC } from "react";
import { ISSRData } from "types/response";


const HomeContainer: FC<ISSRData> = ({data}) => {
  console.log("ll", data);
  return (<Container className={"wrapper"}>Главная страница</Container>
  );
};
export { HomeContainer };
