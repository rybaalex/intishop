import * as React from "react";
import {
  SimpleForm,
  TextInput,
  Edit,
  useRecordContext,
  useResourceContext
} from "react-admin";
import { Box } from "@mui/material";

const StockEdit = () => {
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
            <TextInput source="title" label={"Название"} required fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="background" label={"Цвет фона"} fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="color" label={"Цвет текста"} fullWidth />
          </Box>
          <Box flex={2} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="code" label={"Код"} required fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export { StockEdit };