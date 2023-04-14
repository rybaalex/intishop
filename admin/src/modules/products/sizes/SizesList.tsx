import {
    Datagrid,
    List,
    TextField,

} from "react-admin";

import {PublishedBooleanField} from "../../../components/fields/PublishedBooleanField";
import * as React from "react";
import { SizeEdit } from "./SizeEdit";

const SizeList = () => {
    return (<List title={"Список размеров"} sort={{field: "sort", order: "ASC"}}>
        <Datagrid expand={<SizeEdit/>} expandSingle rowClick="edit">
            <TextField source="name" label={"Наименование размера"}/>
            <TextField source="rosSize" label={"Русский размер"} textAlign={"center"}/>
            <TextField source="waistCircumference" label={"Обхват талии (см)"} sortable={false} textAlign={"center"}/>
            <TextField source="hipGirth" label={"Обхват бедер (см)"} sortable={false} textAlign={"center"}/>
            <TextField source="code" label={"Код размера"} sortable={false} textAlign={"center"}/>
            <TextField source="sort" label={"Сортировка"} textAlign={"center"}/>
            <PublishedBooleanField source={"published"} resource={"sizes"} label={"Показан"} sortable={false}
                                   textAlign={"center"}/>
        </Datagrid>
    </List>);
};
export {SizeList};