import { FC, useEffect, useState } from "react";
import { ImageField, RaRecord, TextFieldProps, useRecordContext } from "react-admin";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";

interface ICustomImages extends TextFieldProps {
  uploads_name?: string;
}

const PreviewImageFree: FC<ICustomImages> = ({
                                               source = "",
                                               resource,
                                               textAlign = "left",
                                               label = "",
                                               uploads_name = "brands"
                                             }) => {

  let record = useRecordContext();
  const [imgData, setImgData] = useState<string>("");

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
      return setImgData(data as string);
    });
  }
  const fetchImage = async (url: RequestInfo | URL) => {
    return await fetch(url).then(data => {
      return data.blob();
    });
  };
  const urlImage = process.env.REACT_APP_APP_UPLOADS + "/" + uploads_name + "/" + record;

  useEffect(() => {
    if (typeof (record) == "string") {
      fetchImage(urlImage).then(data => {
        if (data.size === 0) {
          setTimeout(() => fetchImage(urlImage)
            .then((d) => {
              if (data.size === 0) {
                setTimeout(() => fetchImage(urlImage)
                  .then((d) => {
                    setImgData(URL.createObjectURL(d));
                  }), 1000);
              }
            }), 1000);
        } else {
          setImgData(URL.createObjectURL(data));
        }
      });
    }
  }, [record, uploads_name, urlImage]);
  return <div>
    {record ?
      <img src={imgData} alt={record.title} style={{ height: "90px" }} /> :
      <NoPhotographyOutlinedIcon />}
  </div>;
};

export { PreviewImageFree };