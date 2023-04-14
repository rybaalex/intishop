import React from "react";
import { Datagrid, List, TextField } from "react-admin";
import { ListActions } from "../../../components/action/ListAction";
import { PublishedBooleanField } from "../../../components/fields/PublishedBooleanField";
import { TagEdit } from "./TagEdit";

const TagList = () => {
  return <List actions={<ListActions />} title={"Список тегов"} sort={{ field: "sort", order: "ASC" }}>
    <Datagrid expand={<TagEdit />} expandSingle rowClick="edit">
      <TextField source="name" label={"Наименование размера"} />
      <TextField source="code" label={"Код размера"} sortable={false} textAlign={"center"} />
      <TextField source="sort" label={"Сортировка"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"tags"} label={"Показан"} sortable={false}
                             textAlign={"center"} />
    </Datagrid>
  </List>;
};

export { TagList };