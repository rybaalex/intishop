import {
  Datagrid,
  List, TextField
} from "react-admin";


import { PublishedBooleanField } from "../../components/fields/PublishedBooleanField";
import * as React from "react";
import { ProductEdit } from "./ProductEdit";
import { ListActions } from "../../components/action/ListAction";

const ProductList = () => {
  return (<List actions={<ListActions />} title={"Список материалов"} sort={{ field: "sort", order: "ASC" }}>
    <Datagrid expand={<ProductEdit />} expandSingle rowClick="edit">
      <TextField source="name" label={"Наименование размера"} />
      <TextField source="code" label={"Код размера"} sortable={false} textAlign={"center"} />
      <TextField source="sort" label={"Сортировка"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"structures"} label={"Показан"} sortable={false}
                             textAlign={"center"} />
    </Datagrid>
  </List>);
};
export { ProductList };