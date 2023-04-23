import React, { FC, useState } from "react";
import { Container } from "components/common";
import Styles from "./Search.module.scss";
import { SearchIcon } from "components/icons";
import { Input } from "components/input";

const SearchContainer: FC = () => {
  const [searchExampleShow, setSearchExampleShow] = useState<boolean>(true);
  const [dataSearch, setDataSearch] = useState<string>(undefined);


  return (
    <Container el={"div"} className={Styles.search_in_site}>
      <Input
        name={"search"}
        theme={"search"}
        placeholder={" "}
        label={"Поиск"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDataSearch(event.target.value);
          event.target.value ? setSearchExampleShow(false) : setSearchExampleShow(true);
        }}
        value={dataSearch}
      />
      <div className={Styles.search_for_example}>
        <span className={`${!searchExampleShow && Styles.active}`}>
          Например,
          <span className={Styles.search_span}>
            <label htmlFor="search_in_site" onClick={() => setDataSearch("нижнее белье")}>нижнее белье</label>
          </span>
        </span>
        <picture className={Styles.picture_component_heart}>
          <SearchIcon />
        </picture>
      </div>

    </Container>
  );
};

export default SearchContainer;
