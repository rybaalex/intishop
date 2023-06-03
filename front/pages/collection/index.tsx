import { GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";
import { Collection } from "features/collection";
import { ISSRData } from "features/collection/Collection.d";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const categories = await getList("categories", {
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: { $exists: false }, published: true }
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
      props: { categories: categories },
      revalidate: 10
    };
  }
);

const CollectionSSR = (props: ISSRData) => <Collection {...props} />;

CollectionSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default CollectionSSR;
