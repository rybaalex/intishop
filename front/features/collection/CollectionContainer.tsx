import { FC } from "react";
import { ISSRData } from "features/collection/Collection";
import { Container } from "components/common";
import Styles from "./Collection.module.scss";
import { CollectionItem } from "features/collection/CollectionItem";
import { Link } from "components/link";
import { catalogPath } from "utils/bootstrap";
import { useRouter } from "next/dist/client/router";

const CollectionContainer: FC<ISSRData> = ({ categories, category }) => {
  const route = useRouter();
  return (<Container className={"wrapper no_margin"}>
    <h1 className={Styles.h1}>{category ? category.response[0].name : <>Каталог</>}</h1>
    <div className={Styles.collectionItem_container}>
      {
        categories && categories.response.map((data, i) => {
          return <Link url={catalogPath + (route.query?.category ? "/" + route.query?.category : "") + "/" + data.alias}
                       key={i}><CollectionItem data={data}
                                               key={i} /></Link>;
        })
      }
    </div>
  </Container>);
};
export { CollectionContainer };

