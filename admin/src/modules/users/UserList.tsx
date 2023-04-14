import {
  Datagrid, EditButton, EmailField, List,
  TextField,
} from "react-admin";


import { IsActiveBooleanField } from "../../components/fields/IsActiveBooleanField";

const UserList = () => {

  return (<List>
    <Datagrid rowClick="edit">
      <TextField source="id" label={"id"} />
      <EmailField source="email" />
      <TextField source="name" label={"Имя"} />
      <IsActiveBooleanField source={"isActivated"} label={"Активирован"} textAlign={"center"} />
      <EditButton />
    </Datagrid>
  </List>);
};
export { UserList };
