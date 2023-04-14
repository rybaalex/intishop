import { FC, useState } from "react";
import { RaRecord, TextFieldProps, useRecordContext } from "react-admin";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
interface ICustomImages extends TextFieldProps {
  uploads_name?: string;
}
const PreviewImage: FC<ICustomImages> = ({
                                            source,
                                            resource,
                                            textAlign = "left",
                                            label = "",
                                            uploads_name = "brands"
                                          }) => {

  const record = useRecordContext();
  const [img, setImg] = useState<string>("");
  const convertFileToBase64 = (file: RaRecord) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.rawFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  if (record.src) {
    convertFileToBase64(record).then(data => {
      return setImg(data as string);
    });
  }
  return <div>
    {record.src ? <div><img src={img} alt={record.title} style={{ height: "90px" }} /></div> : record?.img ?
      <img src={process.env.REACT_APP_APP_UPLOADS + "/" + uploads_name + "/" + record?.img}
           alt={record.name} style={{ height: "90px" }} /> :
      <NoPhotographyOutlinedIcon />}</div>;
};

export { PreviewImage };