import {
  Datagrid,
  List,
  TextField

} from "react-admin";

import { ListActions } from "../../../components/action/ListAction";
import { LabelEdit } from "./LabelEdit";


const LabelList = () => {
  return (<List title={"Список лейблов на товарах"} sort={{ field: "sort", order: "ASC" }} actions={<ListActions />}>
    <Datagrid expand={<LabelEdit />} expandSingle rowClick="edit">
      <TextField source="name" label={"Наименование этикетки"} />
      <TextField source="code_background" label={"Цвет заливки"} sortable={false} />
      <TextField source="code_color" label={"Цвет текста"} sortable={false} />
    </Datagrid>
  </List>);
};
export { LabelList };