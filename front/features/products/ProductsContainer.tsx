import { FC } from "react";
import { ISSRProducts } from "types/Product";
import { Container } from "components/common";
import Styles from "./Products.module.scss";
import { CategoriesItem } from "features/products/CategoriesItem";

const ProductsContainer: FC<ISSRProducts> = ({ products, category, categories }) => {
  return (<Container className={"wrapper no_margin"}>
    <div className={Styles.products_wrapper}>
      <div>
        <div className={Styles.catalog_title}>Каталог</div>
        <div className={Styles.catalog_body}>
          <ul>
            {
              categories && categories.response.filter(e => !e.parent_id).map(e => {
                return <CategoriesItem
                  category={e}
                  categories={categories.response}
                  current_category={category.response[0]}
                />;
              })
            }
          </ul>
        </div>
      </div>
      <div>content</div>
    </div>
  </Container>);
};
export { ProductsContainer };