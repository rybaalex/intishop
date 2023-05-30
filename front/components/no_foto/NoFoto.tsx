import { uploadsPath } from "utils/bootstrap";

const NoPhoto = () => {
  return <div><img src={uploadsPath + "/site/noPhoto.jpg"} alt={"Нет фото"} /></div>;
};

export { NoPhoto };