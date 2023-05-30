import { GetStaticPaths, GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";
import { Collection } from "features/collection";
import { ISSRData } from "features/collection/Collection.d";


export const getStaticPaths: GetStaticPaths = async () => {
  const category = await getList("categories", {
    sort: { field: "sort", order: "ASC" },
    filter: { parent_id: { $exists: false } }
  });

  return {
    paths: category.response.map((e: { alias: string; }) => {
      return { params: { category: e.alias } };
    }),
    fallback: "blocking" // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const category = await getList("categories", {
      sort: { field: "sort", order: "ASC" },
      filter: { alias: context.params.category, published: true }
    });

    const subCategory = await getList("categories", {
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: category.response[0].id, published: true }
    });
    //  const products = await getList("products", { sort: { field: "sort", order: "ASC" }, filter: { published: true } });
    store.dispatch(fetchStaticPage({
      staticPageState: await getList("staticpages", {
        sort: {
          field: "sort",
          order: "ASC"
        }, filter: { isHeader: true }
      })
    }));

    return {
      props: { category: category, categories: subCategory },
      revalidate: 10
    };
  }
);

const CollectionSSR = (props: ISSRData) => <Collection {...props} />;

CollectionSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default CollectionSSR;
