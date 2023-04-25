import { GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { Home } from "features/index";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";
import { ISSRData } from "types/response";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const banners = await getList("banners", { sort: { field: "sort", order: "ASC" }, filter: { published: true } });
    store.dispatch(fetchStaticPage({
      staticPageState: await getList("staticpages", {
        sort: {
          field: "sort",
          order: "ASC"
        }, filter: { isHeader: true }
      })
    }));
    return {
      props: { data: { banners: banners } },
      revalidate: 10
    };
  }
);

const HomeSSR = (props: ISSRData) => <Home {...props} />;

HomeSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default HomeSSR;
