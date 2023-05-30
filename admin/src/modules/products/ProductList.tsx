import {
  ArrayField,
  ChipField,
  Datagrid,
  List, SingleFieldList, TextField
} from "react-admin";

import { PublishedBooleanField } from "../../components/fields/PublishedBooleanField";
import * as React from "react";
import { ListActions } from "../../components/action/ListAction";
import { DescriptionField } from "../../components/fields/DescriptionField";

const ProductList = () => {
  return (<List actions={<ListActions />} title={"Список материалов"} sort={{ field: "sort", order: "ASC" }}>
    <Datagrid rowClick="edit">
      <TextField source="name" label={"Наименование товара"} />
      <TextField source="alias" label={"Алиас товара"} sortable={false} textAlign={"center"} />
      <TextField source="brands.name" label={"Бренд"} textAlign={"center"} />
      <DescriptionField source="description" label={"Описание"} textAlign={"center"} sortable={false} />
      <ArrayField source="categories" label={"Категории"}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="tags" label={"Теги"}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="stocks" label={"Метки"}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="count" label={"Склад"} textAlign={"center"} />
      <TextField source="price" label={"Цена"} textAlign={"center"} />

      <PublishedBooleanField source={"published"} resource={"products"} label={"Показан"} sortable={false}
                             textAlign={"center"} />
    </Datagrid>
  </List>);
};
export { ProductList };