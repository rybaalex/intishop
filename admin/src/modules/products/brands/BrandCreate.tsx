import { RichTextInput } from 'ra-input-rich-text';
import * as React from 'react';
import { Create, SimpleForm, TextInput, ImageInput, ImageField, NumberInput } from 'react-admin';
import { Box } from '@mui/material';

const BrandCreate = () => (
  <Create>
    <SimpleForm >
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" label={"Название"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="sort" label={"Сортировка"} required fullWidth />
        </Box>
        <Box flex={2} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="alias" label={"Alias"} required fullWidth />
        </Box>
      </Box>
      <RichTextInput source="description" label={"СЕО Описание бренда"} fullWidth />
      <ImageInput source="logo" label={"Логотип"} name={"logo"} fullWidth>
        <ImageField source="src" title={"title"} />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export {BrandCreate}