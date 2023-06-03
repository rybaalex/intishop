import React from "react";
import { Datagrid, List, TextField } from "react-admin";
import { ListActions } from "../../../components/action/ListAction";
import { CountryEdit } from "./CountryEdit";
import { CustomImageFree } from "../../../components/fields/CustomImageFree";

const CountryList = () => {
  return <List actions={<ListActions />} title={"Список тегов"} sort={{ field: "sort", order: "ASC" }}>
    <Datagrid expand={<CountryEdit />} expandSingle rowClick="edit">
      <CustomImageFree source="image" label={"Фото"} sortable={false} uploads_name={"country"} />
      <TextField source="name" label={"Наименование Страны"} />
      <TextField source="code" label={"Код"} />
    </Datagrid>
  </List>;
};

export { CountryList };