import * as React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);

export {PostCreate}