import { GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { Home } from "features/index";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(fetchStaticPage({ staticPageState: await getList("staticpages", { filter: { isHeader: true } }) }));
    return {
      props: {},
      revalidate: 10
    };
  }
);

const HomeSSR = () => <Home />;

HomeSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default HomeSSR;
