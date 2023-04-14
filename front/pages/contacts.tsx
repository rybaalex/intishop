import { GetStaticProps } from "next";
import { wrapper } from "store/store";
import { ReactNode } from "react";
import { Layout } from "components/common";
import { Contacts } from "features/index";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () => async () => {
    return {
      props: {},
      revalidate: 10
    };
  }
);

const ContactsSSR = () => <Contacts />;

ContactsSSR.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ContactsSSR;
