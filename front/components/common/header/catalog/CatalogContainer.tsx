import { FC, useEffect, useState } from "react";
import { useGetList } from "store/hooks/useGetList";
import { ConnectError } from "components/connect_error";
import Styles from "./Catalog.module.scss";
import { IResponse } from "types/response";

interface ICatalogMenu {
  isShowMenu: boolean;
}

interface ICategoryItem {
  id?: string
  name: string,
  logo: {
    img: string,
    title: string,
    mimeType: string,
  },
  alias: string,
  description: string,
  sort: number,
  published: boolean,
  parent_id: string
}

const CatalogContainer: FC<ICatalogMenu> = ({ isShowMenu }) => {
  const { getList, isError } = useGetList();
  const [categoryList, setCategoryList] = useState<ICategoryItem[]>();
  useEffect(() => {
    getList("categories", { filter: { published: true }, sort: { field: "sort", order: "ASC" } }).then((data) => {
        const dataRes = data as IResponse;
        setCategoryList(dataRes.response as []);
      }
    );
  }, []);
  return (
    <div className={`${Styles.catalogBlock} ${isShowMenu ? Styles.activeMenu : ""}`}>{
      isError !== undefined ?
        <ul>
          <li><ConnectError type={"text"} /></li>
        </ul> : <ul>
          {categoryList && categoryList.filter(e => !e.parent_id).map(item => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
    }

    </div>
  );
};

export { CatalogContainer };