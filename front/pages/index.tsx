import { GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { Home } from "features/index";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { staticPageList } from "service/list/staticPageList";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(fetchStaticPage({ staticPageState: await staticPageList()}));
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
