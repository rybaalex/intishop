import { FC } from "react";
import { RaRecord, TextFieldProps, useRecordContext, useRefresh, useUpdate } from "react-admin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Product } from "../types";

const PublishedBooleanField: FC<TextFieldProps> = ({
                                                    source,
  resource,
                                                    textAlign = "left",
                                                    label = ""
                                                  }) => {
  const record = useRecordContext();
  const [update] = useUpdate<Product, Error>(undefined, undefined);
  const refresh = useRefresh();
  const handleDoubleIconClick = (record: RaRecord) => {
    const res = { data: { _id: record.id, published: !record.published } };
    update(
      resource+"/published",
      res, {
        onSuccess: () => {
          refresh();
        }
      }
    );
  };
  return <div onDoubleClick={() => handleDoubleIconClick(record)} >{Boolean(record.published) ? <VisibilityIcon /> :
    <VisibilityOffIcon />}</div>;
};

export { PublishedBooleanField };