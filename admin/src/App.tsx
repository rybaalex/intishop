import * as React from "react";
import { Admin, Resource } from "react-admin";
import { Dashboard } from "./modules/dashboard";
import { NotFound } from "./modules/notFound";
import { MyLayout } from "./modules/Layout";
import { authProvider } from "./modules/authProvider";
import Configuration from "./components/configuration/Configuration";
import { dataProvider } from "./modules/dataProvider";
import { UserList } from "./modules/users/UserList";
import { RoleList } from "./modules/users/roles/RoleList";
import { PostCreate } from "./modules/users/roles/RoleCreate";
import { TagCreate, TagList } from "./modules/products/tags";
import { StructureCreate, StructureList } from "./modules/products/structures";
import { SizeCreate, SizeList } from "./modules/products/sizes";
import { ColorCreate, ColorList } from "./modules/products/colors";
import { BrandCreate, BrandList } from "./modules/products/brands";
import { CategoryCreate, CategoryList } from "./modules/products/category";
import { ProductList } from "./modules/products/ProductList";
import { ProductCreate } from "./modules/products/ProductCreate";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { russianMessages } from "./russian-translate";
import { BannerList } from "./modules/marketing/banners/BannerList";
import { BannerCreate } from "./modules/marketing/banners/BannerCreate";
import { StockTypeList } from "./modules/marketing/stock_types/StockTypeList";
import { StockTypeCreate } from "./modules/marketing/stock_types/StockTypeCreate";
import { StockList } from "./modules/marketing/stocks/StockList";
import { StockCreate } from "./modules/marketing/stocks/StockCreate";
import { CountryCreate, CountryList } from "./modules/products/country";

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");
const AppAdmin = () => (
  <Admin dataProvider={dataProvider}
         dashboard={Dashboard}
         catchAll={NotFound}
         layout={MyLayout}
         authProvider={authProvider}
         i18nProvider={i18nProvider}

  >
    <Resource name="configuration" list={Configuration} />
    <Resource name="brands" list={BrandList} create={BrandCreate} />
    <Resource name="categories" list={CategoryList} create={CategoryCreate} />
    <Resource name="colors" list={ColorList} create={ColorCreate} />
    <Resource name="sizes" list={SizeList} create={SizeCreate} />
    <Resource name="structures" list={StructureList} create={StructureCreate} />
    <Resource name="products" list={ProductList} create={ProductCreate} />
    <Resource name="users" list={UserList} />
    <Resource name="roles" list={RoleList} create={PostCreate} />
    <Resource name="tags" list={TagList} create={TagCreate} />
    <Resource name="banners" list={BannerList} create={BannerCreate} />
    <Resource name="stock_types" list={StockTypeList} create={StockTypeCreate} />
    <Resource name="stocks" list={StockList} create={StockCreate} />
    <Resource name="countries" list={CountryList} create={CountryCreate} />
  </Admin>
);

export default AppAdmin;