import { GetStaticPaths, GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { fetchStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { getList } from "service/server/dataProviderServer";
import { ResetContainer } from "features/auth/forgot/ResetContainer";
import { dataProvider } from "service/dataProvider";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async ({ params }) => {
    const user = await dataProvider.getOne("users", { id: params.id }).catch(() => {
      console.log("redirect");
    });

    if (!user || user.data?.email !== params.email) {
      return {
        redirect: {
          destination: `/auth/error?message=${encodeURIComponent("Ошибка в параметрах")}`,
          permanent: true
        }
      };
    }

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

const ResetSSR = () => <ResetContainer />;

ResetSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
export default ResetSSR;
