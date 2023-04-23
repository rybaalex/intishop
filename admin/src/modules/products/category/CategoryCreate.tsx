import { RichTextInput } from "ra-input-rich-text";
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  NumberInput,
  useDataProvider,
  SelectInput
} from "react-admin";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const CategoryCreate = () => {
  const dataProvider = useDataProvider();
  const [category, setCategory] = useState<[]>([]);

  useEffect(() => {
    dataProvider.getList("categories", {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: { $exists: false } }
    }).then((data) => {
      setCategory(data.data as []);
    });
  }, [dataProvider]);

  return <Create>
    <SimpleForm>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="name" label={"Название"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="sort" label={"Сортировка"} required fullWidth />
        </Box>
        <Box flex={2} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="alias" label={"Alias"} required fullWidth />
        </Box>
        <Box flex={2} ml={{ xs: 0, sm: "0.5em" }}>
          <SelectInput source="parent_id" label={"Категория"}
                       choices={category.map((e: { id: string, name: string }) => {
                         return { id: e.id, name: e.name };
                       })} fullWidth />
        </Box>
      </Box>
      <RichTextInput source="description" label={"СЕО Описание категории"} fullWidth />
      <ImageInput source="image_menu_background" label={"Картинка для фона меню"} name={"image_menu_background"}
                  fullWidth sx={{ mt: 3 }}>
        <ImageField source="src" title={"title"} />
      </ImageInput>
    </SimpleForm>
  </Create>;
};

export { CategoryCreate };