import {CreateButton, TopToolbar} from "react-admin";
import * as React from "react";

const ListActions = () => {
    return <TopToolbar>
        <CreateButton label={"Создать"}/>
    </TopToolbar>
};

export {ListActions}