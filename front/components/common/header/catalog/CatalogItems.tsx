import { FC } from "react";
import { ICategoryItem } from "components/common/header/catalog/CatalogContainer";
import { Link } from "components/link";
import Styles from "./Catalog.module.scss";
import { useAppDispatch } from "store/hooks";
import { setMenuShow } from "components/common/header/catalog/MenuShowSlice";

interface ICatalogItem {
  item: ICategoryItem,
  data: ICategoryItem[]
}

const CatalogItems: FC<ICatalogItem> = ({ item, data }) => {
  const dispatch = useAppDispatch();
  const filter: ICategoryItem[] = data.filter(e => e.parent_id === item.id) || [];
  return <li key={item.id} onClick={() => {
    dispatch(setMenuShow({ isShow: false }));
  }}>
    <Link url={"/collection/" + item.alias}>
      {item.name}
    </Link>
    {filter.length > 0 &&
      <div className={Styles.subCategory}>
        <img
          src={process.env.NEXT_PUBLIC_APP_FETCH + "/uploads/categories/" + item.image_menu_background.img
          } alt="" />
        <div>
          <ul>
            {filter.map(data => {
              return <li key={data.id}><Link url={"/collection/" + item.alias + "/" + data.alias}>{data.name}</Link>
              </li>;
            })}
          </ul>
        </div>
      </div>}
  </li>;
};

export { CatalogItems };