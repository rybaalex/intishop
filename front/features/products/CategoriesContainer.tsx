import { FC, useState } from "react";
import { ICategoryItem } from "types/Categories";
import { Link } from "components/link";
import { catalogPath } from "utils/bootstrap";
import { ArrowIcon } from "components/icons";
import Styles from "./Products.module.scss";
import { CategoryItem } from "features/products/CategoryItem";

interface ICategory {
  categories: ICategoryItem[];
  current_category: ICategoryItem;
}

const CategoriesContainer: FC<ICategory> = ({ categories, current_category }) => {
  const [isActiveCategory, setIsActiveCategory] = useState<ICategoryItem[]>(categories.filter(data=>data.id===current_category.parent_id));
  const [mouseHover, setMouseHover] = useState<ICategoryItem>(undefined);
  const handleArrowOnClick = (e: ICategoryItem) => {
    if (isActiveCategory.includes(e)) {
      setIsActiveCategory(isActiveCategory.filter(item => item.id !== e.id));
    } else {
      setIsActiveCategory([e]);
    }
  };

  const handleMouseHover = (e: ICategoryItem) => {
    setMouseHover(e);
  };
  const handleMouseLeave = () => {
    setMouseHover(undefined);
  };

  return (<>{categories.filter(e => !e.parent_id).map((category, i) => {
    return <li key={i}
               className={`${isActiveCategory.filter(e => e.id === category.id).length > 0 ? Styles.isActive : ""}${mouseHover?.id === category?.id ? Styles.isHover : ""} ${Styles.menu_block_visible}`}>
      <div className={Styles.item_category}>
        <Link url={catalogPath + "/" + category.alias}>{category.name}</Link>
        <div onClick={() => handleArrowOnClick(category)}
             onMouseEnter={() => handleMouseHover(category)}
             onMouseLeave={() => handleMouseLeave()}
        ><ArrowIcon /></div>
      </div>
      {isActiveCategory.filter(e => e.id === category.id).length > 0 && <CategoryItem
        categories={categories.filter(data => data.parent_id === category.id)}
        category={category}
        category_url={current_category}
      />}
    </li>;
  })
  }</>);
};

export { CategoriesContainer };