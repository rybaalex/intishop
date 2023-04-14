import * as React from "react";
import {
  AppBar,
  Logout,
  UserMenu,
  useUserMenu
} from "react-admin";
import { Link } from "react-router-dom";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  Theme
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";

import { uploadPath } from "../utils/bootstrap";

const ConfigurationMenu = React.forwardRef((props, ref) => {
  const { onClose } = useUserMenu();

  return (
    <MenuItem
      component={Link}
      {...props}
      // @ts-ignore
      ref={ref}
      to="/configuration"
      onClick={onClose}

    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>{"Профиль"}</ListItemText>
    </MenuItem>
  );
});
const MyCustomIcon = () => (
  <Avatar
    sx={{
      height: 30,
      width: 30
    }}
  />
);
const CustomUserMenu = () => {
  return <UserMenu icon={<MyCustomIcon />}>
    <ConfigurationMenu />
    <Logout />
  </UserMenu>;
};

const CustomAppBar = (props: any) => {
  const isLargeEnough = useMediaQuery<Theme>(theme =>
    theme.breakpoints.up("sm")
  );

  return (
    <AppBar
      {...props}
      color="default"
      elevation={1}
      userMenu={<CustomUserMenu />}
    >
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
        id="react-admin-title"
      />
      {isLargeEnough && <div style={{ padding: "5px" }}><img src={uploadPath + "/site/logo-admin.svg"} alt={"Логотип"}
                                                             style={{ height: "30px" }} /></div>}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export { CustomAppBar };
