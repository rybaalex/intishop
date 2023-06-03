import Styles from "features/collection/Collection.module.scss";
import { FC } from "react";
import { ICategoryItem } from "types/Categories";
import { NoPhoto } from "components/no_foto";

interface IData {
  data: ICategoryItem;
}

const CollectionItem: FC<IData> = ({ data }) => {
  return (<div className={Styles.collectionItem_container_item}>
      {data.image ? <img src="" alt="" /> : <NoPhoto />}
      <div className={Styles.title}>{data.name}</div>
    </div>
  );
};

export { CollectionItem };