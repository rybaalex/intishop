import {
  Datagrid,
  List,
  SearchInput,
  TextField,
} from "react-admin";

import { PublishedBooleanField } from "../../../components/fields/PublishedBooleanField";
import { CustomImage } from "../../../components/fields/CustomImage";
import { DescriptionField } from "../../../components/fields/DescriptionField";
import { CategoryActions } from "./CategoryAction";
import { CategoryEdit } from "./CategoryEdit";
import { CategoriesASide } from "./CategoryASide";

const CategorySearch = [
  <SearchInput source="q" alwaysOn />
];

const CategoryList = () => {
  return (<List
    title={"Список категорий"}
    actions={<CategoryActions />}
    aside={<CategoriesASide  />}
    filters={CategorySearch}
    perPage={50}
    sort={{ field: "sort", order: "ASC" }}>
    <Datagrid expand={<CategoryEdit />} expandSingle rowClick="edit">
      <CustomImage source="logo" uploads_name={"categories"} label={"Логотип"} sortable={false} />
      <CustomImage source="image_menu_background" uploads_name={"categories"} label={"Фон меню"} sortable={false} />
      <TextField source="name" label={"Наименование категории"} />
      <TextField source="alias" label={"Псевдоним"} sortable={false} />
      <DescriptionField source="description" label={"Описание"} textAlign={"center"} sortable={false} />
      <TextField source="sort" label={"Сортировка"} textAlign={"center"} />
      <PublishedBooleanField source={"published"} resource={"categories"} label={"Показан"} textAlign={"center"}
                             sortable={false} />
    </Datagrid>
  </List>);
};
export { CategoryList };