import {
  Datagrid, Edit, List,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
  useResourceContext
} from "react-admin";


const RoleEdit = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  return (
    <Edit
      resource={resource}
      id={record.id}
      /* disable the app title change when shown */
      title=" "
    >
      <SimpleForm>
        <TextInput source="value" label={"Название"} />
      </SimpleForm>
    </Edit>
  );
};
const RoleList = () => {
  return (<List pagination={false} title={"Список ролей пользователей"}>
      <Datagrid expand={<RoleEdit />} expandSingle>
        <TextField source="id" label={"id"} sortable={false} />
        <TextField source="value" label={"Название"} />
      </Datagrid>
    </List>);
};
export { RoleList };
