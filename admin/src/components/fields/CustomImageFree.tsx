import { FC, useEffect, useState } from "react";
import { RaRecord, TextFieldProps, useRecordContext } from "react-admin";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";

interface ICustomImages extends TextFieldProps {
  uploads_name?: string;
}

const CustomImageFree: FC<ICustomImages> = ({
                                              source,
                                              resource,
                                              textAlign = "left",
                                              label = "",
                                              uploads_name = "brands"
                                            }) => {

  const record = useRecordContext();

  const [imgData, setImgData] = useState<string>("");
  const convertFileToBase64 = (file: RaRecord) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.rawFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  if (record.image.src) {
    convertFileToBase64(record.image).then(data => {
      return setImgData(data as string);
    });
  }
  const fetchImage = async (url: RequestInfo | URL) => {
    return await fetch(url).then(data => {
      return data.blob();
    });
  };

  const urlImage = process.env.REACT_APP_APP_UPLOADS + "/" + uploads_name + "/" + (typeof record === "string" ? record : record[source as string]);

  useEffect(() => {
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
  }, [record, uploads_name, urlImage]);

  return <div>{record ?
    <img src={imgData}
         alt={record.name} style={{ maxHeight: "40px" }} /> :
    <NoPhotographyOutlinedIcon />}</div>;
};

export { CustomImageFree };