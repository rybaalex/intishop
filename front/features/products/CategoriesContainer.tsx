import { FC, useEffect, useState } from "react";
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
  const [isActiveCategory, setIsActiveCategory] = useState<ICategoryItem[]>([]);
  const [mouseHover, setMouseHover] = useState<ICategoryItem>(undefined);
  const [stateMenu, setStateMenu] = useState<string>("menu_block_hide");
  console.log("RENDER");
  const handleArrowOnClick = (e: ICategoryItem) => {
    if (isActiveCategory.includes(e)) {
      setIsActiveCategory(isActiveCategory.filter(item => item.id !== e.id));
    } else {
      setIsActiveCategory([e]);
    }
  };

  /*  useEffect(() => {
      setIsActiveCategory([current_category]);
    }, [current_category]);*/

  useEffect(() => {
    categories.filter(e => !e.parent_id).map(item => {
      categories.filter(data => data.parent_id == item.id).map(cat => {
        if (cat.id === current_category.id) {
          setIsActiveCategory(prevState => [...prevState, item]);
        }
      });
      return item;
    });
  }, []);
  const handleMouseHover = (e: ICategoryItem) => {
    setMouseHover(e);
  };
  const handleMouseLeave = () => {
    setMouseHover(undefined);
  };

  setTimeout(() => {
    setStateMenu("menu_block_visible");
  }, 10);

  return (<>{categories.filter(e => !e.parent_id).map((category, i) => {
    return <li key={i}
               className={`${isActiveCategory.filter(e => e.id === category.id).length > 0 ? Styles.isActive : ""}${mouseHover?.id === category?.id ? Styles.isHover : ""} ${Styles[stateMenu]}`}>
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