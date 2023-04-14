import "/styles/reset.scss";
import "/styles/variables.scss";
import "/styles/media.scss";

import type { AppProps } from "next/app";
import { wrapper } from "store/store";
import { FC, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const oxFordApp: FC<AppProps> = ({ Component, ...rest }:AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
        {getLayout(<Component {...props.pageProps}/>)}
    </Provider>
  );
};

export default oxFordApp;
