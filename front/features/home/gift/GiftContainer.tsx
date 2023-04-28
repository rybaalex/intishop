import { IResponse } from "types/response";
import { FC } from "react";
import Styles from "./Gift.module.scss"

interface IGiftsData {
  gifts: IResponse;
}

const GiftContainer: FC<IGiftsData> = ({ gifts }) => {
  return (<div className={Styles.gift_container}>

  </div>);
};
export { GiftContainer };