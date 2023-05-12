import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Box } from '@mui/material';

const StockTypeCreate = () => (
  <Create>
    <SimpleForm >
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="title" label={"Название"} required fullWidth />
        </Box>
        <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="background" label={"Цвет фона"} fullWidth />
        </Box>
        <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="color" label={"Цвет текста"} fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="code" label={"Код"} required fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export {StockTypeCreate};