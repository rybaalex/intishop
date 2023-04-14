import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';
import { Box } from '@mui/material';

const SizeCreate = () => (
  <Create>
    <SimpleForm >
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" label={"Название размера"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="sort" label={"Сортировка"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="code" label={"Код размера"} required fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="rosSize" label={"Российский размер"} required fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="waistCircumference" label={"Обхват талии (см)"} fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="hipGirth" label={"Обхват бедер (см)"}  fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export {SizeCreate}