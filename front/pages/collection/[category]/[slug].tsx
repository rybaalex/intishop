import { GetStaticPaths, GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";
import { Collection } from "features/collection";
import { ISSRData } from "features/collection/Collection.d";
import { Products } from "features/products";
import { ISSRProducts } from "types/Product";


export const getStaticPaths: GetStaticPaths = async () => {
  /*  const category = await getList("categories", {
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: { $exists: true } }
    });*/

  return {
    paths: [],
    fallback: "blocking" // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {

    const category = await getList("categories", {
      sort: { field: "sort", order: "ASC" },
      filter: { alias: context.params.slug, published: true }
    });

    const categories = await getList("categories", {
      sort: { field: "sort", order: "ASC" },
      filter: { published: true }
    });

    const products = await getList("products", {
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: category.response[0].id, published: true }
    });

    store.dispatch(fetchStaticPage({
      staticPageState: await getList("staticpages", {
        sort: {
          field: "sort",
          order: "ASC"
        }, filter: { isHeader: true }
      })
    }));

    return {
      props: { products: products, category: category, categories: categories },
      revalidate: 10
    };
  }
);

const CollectionSSR = (props: ISSRProducts) => <Products {...props} />;

CollectionSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default CollectionSSR;
