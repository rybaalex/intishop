import {
  Datagrid, List,
  ReferenceField,
  TextField
} from "react-admin";


import { ListActions } from "../../../components/action/ListAction";
import { StockEdit } from "./StockEdit";
import { CustomImage } from "../../../components/fields/CustomImage";
import { PublishedBooleanField } from "../../../components/fields/PublishedBooleanField";

const StockList = () => {
  return (<List title={"Акции"} sort={{ field: "title", order: "ASC" }} actions={<ListActions />}>
    <Datagrid expand={<StockEdit />} expandSingle rowClick="edit">
      <CustomImage source="image" label={"Фото"} sortable={false} uploads_name={"stocks"} />
      <TextField source="type.title" label={"Название"}/>
      <TextField source="description" label={"Описание"} />
      <TextField source="url" label={"Ссылка"} sortable={false} />
      <TextField source="sort" label={"Сортировка"} />
      <PublishedBooleanField source={"published"} resource={"stocks"} label={"Показан"} textAlign={"center"}
                             sortable={false} />
    </Datagrid>
  </List>);
};
export { StockList };
