import { FC } from "react";
import { TextFieldProps, useRecordContext } from "react-admin";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";

interface ICustomImages extends TextFieldProps {
  uploads_name?: string;
}

const CustomImage: FC<ICustomImages> = ({
                                          source,
                                          resource,
                                          textAlign = "left",
                                          label = "",
                                          uploads_name = "brands"
                                        }) => {

  const record = useRecordContext();
  return <div>{record[source as string]?.desktop ?
    <img src={process.env.REACT_APP_APP_UPLOADS + "/" + uploads_name + "/" + record[source as string]?.desktop}
         alt={record.name} style={{ maxHeight: "40px" }} /> :
    <NoPhotographyOutlinedIcon />}</div>;
};

export { CustomImage };