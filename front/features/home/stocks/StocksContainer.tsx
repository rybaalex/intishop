import { IResponse } from "types/response";
import { FC } from "react";
import Styles from "./Stocks.module.scss";
import { IStockItem, IStocks } from "features/home/Home";
import * as process from "process";

interface IStocksData {
  stocks: IStocks;
}

const StocksContainer: FC<IStocksData> = ({ stocks }) => {
  return (<div className={Styles.stock_container}>
    {(stocks.response as []).length > 0 && (stocks.response as []).map((data: IStockItem) => {
      return <div className={Styles.items} key={data.id}>
        <div>
          <img src={process.env.NEXT_PUBLIC_APP_FETCH + "/uploads/stocks/" + data.image.desktop}
               alt={data.description} /></div>
        <div className={Styles.title}>{data.type.title}</div>
        <div className={Styles.description}>{data.description}</div>
      </div>;
    })}
  </div>);
};
export { StocksContainer };