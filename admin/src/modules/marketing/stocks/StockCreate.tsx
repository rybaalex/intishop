import * as React from "react";
import {
  Create,
  ImageField,
  ImageInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList
} from "react-admin";
import { Box } from "@mui/material";

export interface IDataType {
  id?: string,
  name?: string,
  title?: string,
}

const StockCreate = () => {
  const { data, isLoading, error } = useGetList(
    "stock_types",
    {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "title", order: "ASC" }
    }
  );

  if (error) {
    return <p>ERROR</p>;
  }
  return <Create>
    <SimpleForm>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <SelectInput source="type" choices={!isLoading ? (data as []).map((e: IDataType) => {
            return { id: e.id, name: e.title };
          }) : []} label={"Тип акции"} required fullWidth />
        </Box>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="description" label={"Описание"} required fullWidth />
        </Box>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="url" label={"Ссылка"} fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="sort" label={"Сортировка"} required fullWidth />
        </Box>
      </Box>
      <ImageInput source="image" label={"Фото"} name={"image"} fullWidth>
        <ImageField source="src" title={"title"} />
      </ImageInput>
    </SimpleForm>
  </Create>;
};

export { StockCreate };