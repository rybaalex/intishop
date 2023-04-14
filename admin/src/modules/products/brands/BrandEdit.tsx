import { Edit, ImageInput, SimpleForm, TextInput, useRecordContext, useResourceContext } from "react-admin";
import { PreviewImage } from "../../../components/fields/PreviewImage";
import { Box } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";

const BrandEdit = () => {
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
            <TextInput source="sort" label={"Сортировка"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="alias" label={"Алиас"} required fullWidth />
          </Box>
        </Box>
        <RichTextInput source="description" label={"СЕО Описание бренда"} fullWidth />
        <ImageInput source="logo" label={"Логотип"} fullWidth>
          <PreviewImage />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export { BrandEdit };
