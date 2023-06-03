import { Edit, ImageInput, SimpleForm, TextInput, useRecordContext, useResourceContext } from "react-admin";
import { Box } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { PreviewImageFree } from "../../../components/fields/PreviewImageFree";

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
            <TextInput source="alias" label={"Алиас"} disabled fullWidth />
          </Box>
        </Box>
        <RichTextInput source="description" label={"СЕО Описание бренда"} fullWidth />
        <ImageInput source="image" label={"Логотип"} fullWidth>
          <PreviewImageFree source={"image"} />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export { BrandEdit };
