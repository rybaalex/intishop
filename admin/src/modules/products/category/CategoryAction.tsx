import {CreateButton, TopToolbar} from "react-admin";
import * as React from "react";

const CategoryActions = () => {
    return <TopToolbar>
        <CreateButton label={"Создать"}/>
    </TopToolbar>
};

export {CategoryActions}