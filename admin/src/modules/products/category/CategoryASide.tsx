import { FilterList, FilterListItem, useDataProvider } from "react-admin";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Card, CardContent } from "@mui/material";
import { FC, useEffect, useState } from "react";

const CategoriesASide: FC = () => {
  const [category, setCategory] = useState([]);
  const dataProvider = useDataProvider();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataProvider.getList("categories", {
      pagination: { page: 0, perPage: 0 },
      sort: { field: "sort", order: "ASC" },
      filter: { parent_id: { $exists: false } }
    }).then(data => {
      setLoading(false);
      (data.data)?.length > 0 && setCategory(data.data as []);
    }).catch(e => {
      setLoading(false);
      console.log("log dataProvider ASide", e);
    });
  }, [dataProvider]);

  return (
    <Card sx={{ order: -1, mr: 2, mt: 8, mb: "50px", width: 250 }}>
      <CardContent>
        <FilterList label="Категории" icon={<CategoryOutlinedIcon />}>
          {!loading && category && category.map((e: { id: string, name: string }) => {
            return <FilterListItem
              key={e.id}
              label={e.name}
              value={{ parent_id: e.id }}
            />;
          })}
        </FilterList>
      </CardContent>
    </Card>);
};

export { CategoriesASide };