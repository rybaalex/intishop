import {
  Datagrid, List,
  TextField
} from "react-admin";


import { ListActions } from "../../../components/action/ListAction";
import { StockTypeEdit } from "./StockTypeEdit";

const StockTypeList = () => {
  return (<List title={"Типы акций"} sort={{ field: "title", order: "ASC" }} actions={<ListActions />}>
    <Datagrid expand={<StockTypeEdit />} expandSingle rowClick="edit">
      <TextField source="title" label={"Наименование"} />
      <TextField source="background" label={"Цвет фона"} />
      <TextField source="color" label={"Цвет текста"} />
      <TextField source="code" label={"Код"} sortable={false} />
    </Datagrid>
  </List>);
};
export { StockTypeList };
