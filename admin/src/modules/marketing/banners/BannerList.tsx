import {
  Datagrid, List,
  TextField
} from "react-admin";


import { CustomImage } from "../../../components/fields/CustomImage";
import { PublishedBooleanField } from "../../../components/fields/PublishedBooleanField";
import { ListActions } from "../../../components/action/ListAction";
import { BannerEdit } from "./BannerEdit";

const BannerList = () => {
  return (<List title={"Баннеры"} sort={{ field: "sort", order: "ASC" }} actions={<ListActions />}>
    <Datagrid expand={<BannerEdit />} expandSingle rowClick="edit">
      <CustomImage source="image" label={"Фото"} sortable={false} uploads_name={"banners"} />
      <TextField source="name" label={"Наименование баннера"} />
      <TextField source="url" label={"URL"} sortable={false} />
      <TextField source="sort" label={"Сортировка"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"banners"} label={"Показан"} textAlign={"center"}
                             sortable={false} />
    </Datagrid>
  </List>);
};
export { BannerList };
