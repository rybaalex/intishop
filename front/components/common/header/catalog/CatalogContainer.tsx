import { FC, useEffect, useState } from "react";
import { useGetList } from "store/hooks/useGetList";
import { ConnectError } from "components/connect_error";
import Styles from "./Catalog.module.scss";
import { IResponse } from "types/response";
import { CatalogItems } from "components/common/header/catalog/CatalogItems";

interface ICatalogMenu {
  isShowMenu: boolean;
}

export interface ICategoryItem {
  id?: string
  name: string,
  image_menu_background: {
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
    getList("categories", { filter: { published: true }, sort: { field: "sort", order: "ASC" } })
      .then((data) => {
          const dataRes = data as IResponse;
          setCategoryList(dataRes?.response as []);
        }
      );
  }, []);
  return (
    <div className={`${Styles.catalogBlock} ${isShowMenu ? Styles.activeMenu : ""}`}>{
      isError !== undefined ?
        <ul>
          <li key={"error"}><ConnectError type={"text"} /></li>
        </ul> : <ul>
          {categoryList && categoryList.filter(e => !e.parent_id).map((item) => {
            return <CatalogItems
              item={item}
              data={categoryList}
              key={item.id} />;
          })}
        </ul>
    }

    </div>
  );
};

export { CatalogContainer };