import {
  Datagrid,
  List,
  TextField,

} from "react-admin";

import { PublishedBooleanField } from "../../../components/fields/PublishedBooleanField";
import { ListActions } from "../../../components/action/ListAction";
import { ColorEdit } from "./ColorEdit";


const ColorList = () => {
  return (<List title={"Список цветов"} sort={{ field: "sort", order: "ASC" }} actions={<ListActions/>}>
    <Datagrid expand={<ColorEdit />} expandSingle rowClick="edit">
      <TextField source="name" label={"Наименование цвета"} />
      <TextField source="code" label={"Код цвета"} sortable={false} />
      <TextField source="sort" label={"Сортировка"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"colors"} label={"Показан"} sortable={false}  textAlign={"center"} />
    </Datagrid>
  </List>);
};
export { ColorList };