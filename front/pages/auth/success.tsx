import { GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";
import {  ISSRData } from "types/response";
import { SuccessContainer } from "features/auth/SuccessContainer";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(fetchStaticPage({
      staticPageState: await getList("staticpages", {
        sort: {
          field: "sort",
          order: "ASC"
        }, filter: { isHeader: true }
      })
    }));
    return {
      props: {},
      revalidate: 10
    };
  }
);

const SuccessSSR = (props: ISSRData) => <SuccessContainer {...props} />;

SuccessSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default SuccessSSR;
