import { Edit, NumberInput, SimpleForm, TextInput, useRecordContext, useResourceContext } from "react-admin";
import { Box } from "@mui/material";
import * as React from "react";

const ProductEdit = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  return (
    <Edit
      resource={resource}
      id={record.id}
      title=" "
    >
      <SimpleForm>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="name" label={"Название"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="sort" label={"Сортировка"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="code" label={"Код цвета"} required fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export { ProductEdit };