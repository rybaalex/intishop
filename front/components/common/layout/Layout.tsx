import React, { FC } from "react";
import Head from "next/head";
import { Footer, Header } from "components/common";
import Styles from "./Layout.module.scss";
import { HeaderContext } from "components/common/header";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION}
        />
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta name="keyword" content={process.env.NEXT_PUBLIC_KEYWORD} />
      </Head>
      <div className={Styles.wrapper}>
        <header>
          <Header />
        </header>
        <HeaderContext/>
        <main className={Styles.content}>
          {children}
        </main>
        <footer className={Styles.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export { Layout };
