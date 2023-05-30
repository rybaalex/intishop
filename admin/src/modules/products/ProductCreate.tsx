import * as React from "react";
import {
  Create,
  TextInput,
  NumberInput,
  ImageInput,
  ImageField,
  SelectInput,
  useDataProvider,
  SelectArrayInput,
  TabbedForm,
  required
} from "react-admin";
import { Box } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { useEffect, useState } from "react";

const ProductCreate = () => {
  const dataProvider = useDataProvider();
  const [brands, setBrands] = useState<[]>([]);
  const [categories, setCategories] = useState<[]>([]);
  const [sizes, setSizes] = useState<[]>([]);
  const [structures, setStructures] = useState<[]>([]);
  const [tags, setTags] = useState<[]>([]);
  const [colors, setColors] = useState<[]>([]);
  const [stocks, setStocks] = useState<[]>([]);


  useEffect(() => {
    dataProvider.getList("brands", {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "sort", order: "ASC" },
      filter: {}
    }).then((data) => {
      setBrands(data.data as []);
    }).then(async () => {
      await dataProvider.getList("categories", {
        pagination: { page: 0, perPage: 0 },
        sort: { field: "sort", order: "ASC" },
        filter: { parent_id: { $exists: true } }
      })
        .then((data) => {
          setCategories(data.data as []);
        });
    }).then(async () => {
      await dataProvider.getList("sizes", {
        pagination: { page: 0, perPage: 0 },
        sort: { field: "sort", order: "ASC" },
        filter: {}
      }).then((data) => {
        setSizes(data.data as []);
      });
    }).then(async () => {
      await dataProvider.getList("structures", {
        pagination: { page: 0, perPage: 0 },
        sort: { field: "sort", order: "ASC" },
        filter: {}
      }).then((data) => {
        setStructures(data.data as []);
      });
    }).then(async () => {
      await dataProvider.getList("tags", {
        pagination: { page: 0, perPage: 0 },
        sort: { field: "sort", order: "ASC" },
        filter: {}
      }).then((data) => {
        setTags(data.data as []);
      });
    }).then(async () => {
      await dataProvider.getList("colors", {
        pagination: { page: 0, perPage: 0 },
        sort: { field: "sort", order: "ASC" },
        filter: {}
      }).then((data) => {
        setColors(data.data as []);
      });
    }).then(async () => {
      await dataProvider.getList("stock_types", {
        pagination: { page: 0, perPage: 0 },
        sort: { field: "sort", order: "ASC" },
        filter: {}
      }).then((data) => {
        setStocks(data.data as []);
      });
    });
  }, [dataProvider]);

  return <Create>
    <TabbedForm>
      <TabbedForm.Tab label="Описание товара">
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="name" label={"Название товара"} validate={required()} fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="alias" label={"Алиас"} required fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <SelectInput source="brands" label={"Бренд"}
                         choices={brands.map((e: { id: string, name: string }) => {
                           return { id: e.id, name: e.name, key: e.id };
                         })} required fullWidth />
          </Box>
        </Box>
        <RichTextInput source="description" label={"Описание товара"} fullWidth />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Фотографии">
        <ImageInput source="image" label={"Галлерея фотографий"} name={"image"}
                    fullWidth sx={{ mt: 3 }} multiple={true}>
          <ImageField source="src" title={"title"} />
        </ImageInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="SEO">
        <TextInput source="seo_description" label={"Сео описание товара"} fullWidth />
        <TextInput source="seo_keyword" label={"Ключевые слова"} fullWidth />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Принадлежность">
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectArrayInput source="categories" label={"Категории"}
                              choices={categories.map((e: { id: string, name: string }) => {
                                return { id: e.id, name: e.name, key: e.id };
                              })} validate={required()} fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectArrayInput source="sizes" label={"Размеры"}
                              choices={sizes.map((e: { id: string, name: string }) => {
                                return { id: e.id, name: e.name, key: e.id };
                              })} validate={required()} fullWidth /> </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <SelectArrayInput source="structures" label={"Материал"}
                              choices={structures.map((e: { id: string, name: string }) => {
                                return { id: e.id, name: e.name, key: e.id };
                              })} validate={required()} fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectArrayInput source="tags" label={"Метки для быстро-фильтров"}
                              choices={tags.map((e: { id: string, name: string }) => {
                                return { id: e.id, name: e.name, key: e.id };
                              })} validate={required()} fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectArrayInput source="colors" label={"Цвета"}
                              choices={colors.map((e: { id: string, name: string }) => {
                                return { id: e.id, name: e.name, key: e.id };
                              })} validate={required()} fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <SelectArrayInput source="stocks" label={"Акции"}
                              choices={stocks.map((e: {
                                title: string;
                                id: string
                              }) => {
                                return { id: e.id, name: e.title, key: e.id };
                              })} fullWidth />
          </Box>
        </Box>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Склад">
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="count" label={"Колличество"} validate={required()} fullWidth />
          </Box>
          <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="price" label={"Цена"} validate={required()} fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="price_sale" label={"Цена со скидкой"} fullWidth />
          </Box>
        </Box>
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>;
};

export { ProductCreate };