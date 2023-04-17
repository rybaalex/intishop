import {
  Edit,
  ImageInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useRecordContext,
  useResourceContext
} from "react-admin";
import { Box } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { PreviewImage } from "../../../components/fields/PreviewImage";
import { FC, useEffect, useState } from "react";
import { SelectInput } from "react-admin";

const CategoryEdit: FC = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const dataProvider = useDataProvider();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dataProvider.getList("categories", {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: { $exists: false } }
    }).then((data) => {
      setCategories(data.data as []);
    });
  }, [dataProvider]);

  return (
    <Edit
      resource={resource}
      id={record.id}
      title=" "
    >
      <SimpleForm>
        <Box display={{ xs: "blыв3ock", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="name" label={"Название"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="sort" label={"Сортировка"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="alias" label={"Псевдоним"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            {categories.length > 0 && <SelectInput
              label="Категория"
              source={"parent_id"}
              choices={categories}
            />}
          </Box>
        </Box>
        <RichTextInput source="description" label={"Описание категории"} fullWidth />
        <ImageInput source="logo" label={"Логотип категории"} fullWidth>
          <PreviewImage uploads_name={"categories"} />
        </ImageInput>
        <ImageInput source="image_menu_background" label={"Картинка для фона меню"} fullWidth sx={{ mt: 3 }}>
          <PreviewImage uploads_name={"categories"} />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export { CategoryEdit };