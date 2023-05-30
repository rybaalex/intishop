import {
  Datagrid,
  List,
  TextField,
  useRecordContext
} from "react-admin";

import { PublishedBooleanField } from "../../../components/fields/PublishedBooleanField";
import { DescriptionField } from "../../../components/fields/DescriptionField";
import { BrandEdit } from "./BrandEdit";
import { ListActions } from "../../../components/action/ListAction";
import { CustomImageFree } from "../../../components/fields/CustomImageFree";


const BrandList = () => {

  return (<List title={"Список брендов"} sort={{ field: "sort", order: "ASC" }} actions={<ListActions />}>
    <Datagrid expand={<BrandEdit />} expandSingle rowClick="edit">
      <CustomImageFree source="image" label={"Логотип"} sortable={false} />
      <TextField source="name" label={"Наименование бренда"} />
      <TextField source="alias" label={"Alias"} sortable={false} />
      <DescriptionField source="description" label={"Описание бренда"} textAlign={"center"} sortable={false} />
      <TextField source="countryId.name" label={"Страна"} textAlign={"center"} />
      <TextField source="sort" label={"Сортировка"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"brands"} label={"Показан"} textAlign={"center"}
                             sortable={false} />
    </Datagrid>
  </List>);
};
export { BrandList };