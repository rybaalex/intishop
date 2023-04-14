import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";
import { Box } from "@mui/material";

const LabelCreate = () => (
  <Create>
    <SimpleForm>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="name" label={"Название"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="code_background" label={"Цвет заливки"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="code_color" label={"Цвет текста"} required fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export { LabelCreate };