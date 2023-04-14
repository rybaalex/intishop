import { FC } from "react";
import { RaRecord, TextFieldProps, useRecordContext, useRefresh, useUpdate } from "react-admin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Product } from "../types";

const IsActiveBooleanField: FC<TextFieldProps> = ({ source, textAlign = "left", label = "" }) => {
  const record = useRecordContext();
  const [update] = useUpdate<Product, Error>(undefined, undefined);
  const refresh = useRefresh();

  const handleDoubleIconClick = (record: RaRecord) => {
    const res = { data: { _id: record.id, isActivated: !record.isActivated } };
    update(
      "user_is_activated",
      res, {
        onSuccess: () => {
          refresh();
        }
      }
    );
  };
  return <div onDoubleClick={() => handleDoubleIconClick(record)}>{record.isActivated ? <VisibilityIcon /> :
    <VisibilityOffIcon />}</div>;
};

export { IsActiveBooleanField };