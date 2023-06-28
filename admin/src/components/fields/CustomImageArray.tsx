import { FC } from "react";
import { TextFieldProps, useRecordContext } from "react-admin";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";

interface ICustomImages extends TextFieldProps {
  uploads_name?: string;
}

const CustomImageArray: FC<ICustomImages> = ({
                                               source,
                                               resource,
                                               textAlign = "left",
                                               label = "",
                                               uploads_name = "brands"
                                             }) => {

  const record = useRecordContext();
  return <div>{record[source as string][0]?.catalog ?
    <img src={process.env.REACT_APP_APP_UPLOADS + "/" + uploads_name + "/" + record[source as string][0]?.catalog}
         alt={record.name} style={{ maxHeight: "70px" }} /> :
    <NoPhotographyOutlinedIcon />}</div>;
};

export { CustomImageArray };