import { Link } from "components/link";
import Styles from "features/products/Products.module.scss";
import { FC, useEffect, useState } from "react";
import { catalogPath } from "utils/bootstrap";
import { ICategoryItem } from "types/Categories";


interface ICategories {
  categories: ICategoryItem[];
  category: ICategoryItem;
  category_url: ICategoryItem;
}

const CategoryItem: FC<ICategories> = ({ categories, category, category_url }) => {
  return (<ul>{
    categories.map((item, i) => {
      return <li key={i}>
        <Link
          classLink={`${item.id === category_url.id ? Styles.isActiveSub : ""}`}
          url={catalogPath + "/" + category.alias + "/" + item.alias}>
          {item.name}
        </Link>
      </li>;
    })
  }
    {/*    {categories.filter(item => item.parent_id && item.parent_id === category.id).map(
      (data, i) => {
        return <li key={i}>
          <Link
            classLink={`${category.id === data.id ? Styles.isActiveSub : ""}`}
            url={catalogPath + "/" + category.alias + "/" + data.alias}>
            {data.name}
          </Link>
        </li>;
      }
    )}*/}
  </ul>);
};
export { CategoryItem };