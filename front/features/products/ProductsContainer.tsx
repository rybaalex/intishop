import { FC, useEffect, useMemo, useState } from "react";
import { ISSRProducts } from "types/Product";
import { Container } from "components/common";
import Styles from "./Products.module.scss";
import { CategoriesContainer } from "features/products/CategoriesContainer";
import { BreadCrumbs, IBreadCrumbs } from "components/breadcrumbs";
import { dataBread } from "components/breadcrumbs/Data";
import { ICategoryItem } from "types/Categories";
import { catalogPath } from "utils/bootstrap";

const ProductsContainer: FC<ISSRProducts> = ({ products, category, categories }) => {
  const [breadData, setBreadData] = useState<IBreadCrumbs[]>();
  useEffect(() => {
    const filterCategory: ICategoryItem[] = categories.response.filter(item => item.id === category.response[0].parent_id);
    setBreadData([
      ...dataBread,
      { title: "Каталог", alias: "/collection" },
      { title: filterCategory[0].name, alias: catalogPath + "/" + filterCategory[0].alias },
      { title: category.response[0].name, alias: "/" + category.response[0].alias }
    ]);
  }, [category]);
  const memoCategory = useMemo(() => <CategoriesContainer
    categories={categories.response}
    current_category={category.response[0]}
  />, [category]);

  const memoBreadCrumbs = useMemo(() => <BreadCrumbs data={breadData || []} />, [category]);

  return (<Container className={"wrapper no_margin"}>
    <div className={Styles.products_wrapper}>
      <div className={Styles.category_container}>
        <div className={Styles.catalog_title}>Каталог</div>
        <div className={Styles.catalog_body}>
          <ul>
            {categories&&memoCategory}
          </ul>
        </div>
      </div>
      <div className={Styles.product_container}>
        <div>{breadData&&memoBreadCrumbs}</div>
        <h1>{category.response[0].name}</h1>
      </div>
    </div>
  </Container>);
};
export { ProductsContainer };