import { Layout, LayoutProps } from "react-admin";
import { CustomAppBar } from './AppBar';
import { Menu } from "./Menu";

const MyLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => <Layout {...props} appBar={CustomAppBar} menu={Menu} />;
export {MyLayout}