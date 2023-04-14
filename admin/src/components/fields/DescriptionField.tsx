import { FC } from "react";
import { TextFieldProps, useRecordContext } from "react-admin";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";

const DescriptionField: FC<TextFieldProps> = ({
                                                source,
                                                resource,
                                                textAlign = "left",
                                                label = ""
                                              }) => {
  const record = useRecordContext();

  return <div>{record.description ? <GradingOutlinedIcon /> :
    <DoNotDisturbAltOutlinedIcon />}</div>;
};

export { DescriptionField };