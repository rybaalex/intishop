import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import GroupIcon from "@mui/icons-material/Group";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import {
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState
} from "react-admin";

import SubMenu from "./SubMenu";

type MenuName = "menuMarketing" | "menuCatalog" | "menuSales" | "menuCustomers" | "menuDownloads";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: false,
    menuMarketing: true,
    menuSales: false,
    menuCustomers: false,
    menuDownloads: false
  });
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: theme =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          })
      }}
    >
      <DashboardMenuItem />
      <SubMenu
        handleToggle={() => handleToggle("menuSales")}
        isOpen={state.menuSales}
        name="Заказы"
        icon={<CurrencyRubleIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/post"
          state={{ _scrollToTop: true }}
          primaryText={`Продажи`}
          leftIcon={<AccountBalanceWalletIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCatalog")}
        isOpen={state.menuCatalog}
        name="Каталог"
        icon={<ShoppingBagOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/products"
          state={{ _scrollToTop: true }}
          primaryText={"Товары"}
          leftIcon={<Inventory2OutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/categories"
          state={{ _scrollToTop: true }}
          primaryText={"Категории"}
          leftIcon={<CategoryOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/brands"
          state={{ _scrollToTop: true }}
          primaryText={"Бренды"}
          leftIcon={<BrandingWatermarkIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/colors"
          state={{ _scrollToTop: true }}
          primaryText={"Цвета"}
          leftIcon={<ColorLensOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/sizes"
          state={{ _scrollToTop: true }}
          primaryText={"Размеры"}
          leftIcon={<StraightenOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/structures"
          state={{ _scrollToTop: true }}
          primaryText={"Материалы"}
          leftIcon={<AcUnitOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/tags"
          state={{ _scrollToTop: true }}
          primaryText={"Теги"}
          leftIcon={<LocalOfferOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/labels"
          state={{ _scrollToTop: true }}
          primaryText={"Этикетки"}
          leftIcon={<BookmarkBorderOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuMarketing")}
        isOpen={state.menuMarketing}
        name="Маркетинг"
        icon={<TimelineOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/banners"
          state={{ _scrollToTop: true }}
          primaryText={"Баннеры"}
          leftIcon={<ViewCarouselOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="Пользователи"
        icon={<GroupIcon />}
        dense={dense}
      >
        {/*        <WithPermissions render={(permissions) => {
          console.log("per", permissions);
          return <div>1111</div>;
        }
        } />*/}
        <MenuItemLink
          to="/users"
          state={{ _scrollToTop: true }}
          primaryText={"Пользователи"}
          leftIcon={<GroupIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/roles"
          state={{ _scrollToTop: true }}
          primaryText={"Роли"}
          leftIcon={<BubbleChartIcon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/reviews"
        state={{ _scrollToTop: true }}
        primaryText={"Отзывы"}
        leftIcon={<CommentOutlinedIcon />}
        dense={dense}
      />
      <SubMenu
        handleToggle={() => handleToggle("menuDownloads")}
        isOpen={state.menuDownloads}
        name="Загрузки"
        icon={<GroupIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/downloads_brand"
          state={{ _scrollToTop: true }}
          primaryText={"Бренды"}
          leftIcon={<CommentOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/downloads_colors"
          state={{ _scrollToTop: true }}
          primaryText={"Цвета"}
          leftIcon={<ColorLensOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/downloads_structures"
          state={{ _scrollToTop: true }}
          primaryText={"Материалы"}
          leftIcon={<AcUnitOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export { Menu };
