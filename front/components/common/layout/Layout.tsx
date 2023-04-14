import React, { FC } from "react";
import Head from "next/head";
import { Header } from "components/common";

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
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
      <footer>
      </footer>
    </>
  );
};

export { Layout };
