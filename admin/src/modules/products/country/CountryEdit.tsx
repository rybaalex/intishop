import {
  Edit,
  ImageInput,
  NumberInput,
  SimpleForm,
  TextInput,
  useRecordContext,
  useResourceContext
} from "react-admin";
import { Box } from "@mui/material";
import * as React from "react";
import { PreviewImage } from "../../../components/fields/PreviewImage";
import { PreviewImageFree } from "../../../components/fields/PreviewImageFree";

const CountryEdit = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  return (
    <Edit
      resource={resource}
      id={record.id}
      title=" "
    >
      <SimpleForm>
        <ImageInput source="image" label={"Фото"} fullWidth>
          <PreviewImageFree uploads_name={"country"} />
        </ImageInput>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="name" label={"Название страны"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="code" label={"Код"} disabled fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export { CountryEdit };