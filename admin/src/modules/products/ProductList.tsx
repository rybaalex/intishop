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
import { CustomImageFree } from "../../components/fields/CustomImageFree";
import { CustomImage } from "../../components/fields/CustomImage";
import { CustomImageArray } from "../../components/fields/CustomImageArray";

const ProductList = () => {
  return (<List actions={<ListActions />} title={"Список материалов"} sort={{ field: "sort", order: "ASC" }}>
    <Datagrid rowClick="edit">
      <CustomImageArray source="images" label={"Логотип"} sortable={false} uploads_name={"products"} />
      <TextField source="name" label={"Наименование товара"} />
      <TextField source="brands.name" label={"Бренд"} textAlign={"center"} />
      <DescriptionField source="description" label={"Описание"} textAlign={"center"} sortable={false} />
      <ArrayField source="categories" label={"Категории"}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="sizes" label={"Размеры"}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="stocks" label={"Метки"}>
        <SingleFieldList>
          <ChipField source="title" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="count" label={"Склад"} textAlign={"center"} />
      <TextField source="price" label={"Цена"} textAlign={"center"} />
      <TextField source="sale" label={"Скидка,%"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"products"} label={"Показан"} sortable={false}
                             textAlign={"center"} />
    </Datagrid>
  </List>);
};
export { ProductList };