import * as React from "react";
import {
  SimpleForm,
  TextInput,
  Edit,
  useRecordContext,
  useResourceContext,
  SelectInput,
  ImageInput
} from "react-admin";
import { Box } from "@mui/material";
import { PreviewImage } from "../../../components/fields/PreviewImage";
import { IDataType } from "./StockCreate";
import { useEffect, useState } from "react";
import { dataProvider } from "../../dataProvider";

const StockEdit = () => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const [stocks, setStocks] = useState<IDataType[]>([]);
  useEffect(() => {
    dataProvider.getList("stock_types", {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "title", order: "ASC" },
      filter: {}
    }).then((data) => {
      setStocks((data.data as []).map((e: IDataType) => {
        return { id: e.id, name: e.title };
      }));
    });
  }, []);

  return (
    <Edit
      resource={resource}
      id={record.id}
      title=" "
    >
      <SimpleForm>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            {stocks.length > 0 && <SelectInput
              source="type"
              choices={stocks}
              label={"Тип акции"}
              required
              fullWidth />}
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="description" label={"Описание"} required fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="url" label={"Ссылка"} fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="sort" label={"Сортировка"} required fullWidth />
          </Box>
        </Box>
        <ImageInput source="image" label={"Фото"} fullWidth>
          <PreviewImage uploads_name={"stocks"} />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export { StockEdit };