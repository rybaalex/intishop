import * as React from "react";
import {
  SimpleForm,
  TextInput,
  ImageInput,
  NumberInput,
  Edit,
  useRecordContext,
  useResourceContext
} from "react-admin";
import { Box } from "@mui/material";
import { PreviewImage } from "../../../components/fields/PreviewImage";

const BannerEdit = () => {
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
          <Box flex={2} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="url" label={"URL"} fullWidth />
          </Box>
        </Box>
        <ImageInput source="image" label={"Фото"} fullWidth>
          <PreviewImage uploads_name={"banners"} />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export { BannerEdit };