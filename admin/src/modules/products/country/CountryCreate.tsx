import * as React from "react";
import { Create, ImageField, ImageInput, SimpleForm, TextInput } from "react-admin";
import { Box } from "@mui/material";

const CountryCreate = () => (
  <Create>
    <SimpleForm>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="name" label={"Название"} required fullWidth />
        </Box>
      </Box>
      <ImageInput source="image" label={"Фото флага"} name={"image"} fullWidth>
        <ImageField source="src" title={"title"} />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export { CountryCreate };