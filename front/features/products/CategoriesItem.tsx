import { FC } from "react";
import { ICategoryItem } from "types/Categories";
import { Link } from "components/link";
import { catalogPath } from "utils/bootstrap";

interface ICategory {
  category: ICategoryItem;
  categories: ICategoryItem[];
  current_category: ICategoryItem;
}

const CategoriesItem: FC<ICategory> = ({ category, categories }) => {
  return <li><Link url={catalogPath + "/" + category.alias}>{category.name}</Link>
    <ul>
      {categories.filter(item => item.parent_id === category.id).map(
        data => {
          return <li><Link url={data.alias}>{data.name}</Link></li>;
        }
      )}
    </ul>
  </li>;
};

export { CategoriesItem };