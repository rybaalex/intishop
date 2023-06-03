import { RichTextInput } from "ra-input-rich-text";
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  NumberInput,
  SelectInput,
  useDataProvider
} from "react-admin";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const BrandCreate = () => {
  const dataProvider = useDataProvider();
  const [countries, setCountries] = useState<[]>([]);

  useEffect(() => {
    dataProvider.getList("countries", {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "sort", order: "ASC" },
      filter: {}
    }).then((data) => {
      setCountries(data.data as []);
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
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <SelectInput source="countryId" label={"Страна"}
                       choices={countries.map((e: { id: string, name: string }) => {
                         return { id: e.id, name: e.name };
                       })} fullWidth /> </Box>
      </Box>
      <RichTextInput source="description" label={"СЕО Описание бренда"} fullWidth />
      <ImageInput source="image" label={"Логотип"} name={"image"} fullWidth>
        <ImageField source="src" title={"title"} />
      </ImageInput>
    </SimpleForm>
  </Create>;
};

export { BrandCreate };