import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Badge, useMediaQuery } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ThemeContext from "../../context/themeContext";
import { useLocation, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchBar from "@mkyy/mui-search-bar";
import NotificationList from "../Notification";
import Filters from "../Filter";
import { useSelector, useDispatch } from "react-redux";
import {
  addNotifications,
  resetNotifications,
} from "../../actions/notificationActions";

import { fetchNotificationsData } from "../../utils/functions/getNotifications";
import { NotificationType } from "../../types/notification";

interface Page {
  path: string;
  placeholder: string;
}

type appBarProps = {
  setFilters?: React.Dispatch<React.SetStateAction<any>>;
};

const pages: Page[] = [
  {
    path: "/users",
    placeholder: "Usuários",
  },
  {
    path: "/events",
    placeholder: "Eventos",
  },
  {
    path: "/reports",
    placeholder: "Relatórios",
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar(props: appBarProps & any) {
  const location = useLocation();
  const isEventsPage = location.pathname === "/events";

  const { setFilters } = props;
  const theme = React.useContext(ThemeContext);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const reduxNotifications = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = React.useState<NotificationType[]>(
    []
  );

  const getServerSideNotifications = async () => {
    const data = await fetchNotificationsData();
    dispatch(resetNotifications());
    dispatch(addNotifications(data));
    setNotifications(reduxNotifications);
  };

  const handleClick = () => {};

  React.useEffect(() => {
    setNotifications(reduxNotifications);
  }, [reduxNotifications]);

  React.useEffect(() => {
    getServerSideNotifications();
  }, []);

  const navigate = useNavigate();

  const handleSearch = (value: string) => {};

  const [textFieldValue, setTextFieldValue] = React.useState("");

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElFilters, setAnchorElFilters] =
    React.useState<null | HTMLElement>(null);

  const [anchorElNotification, setAnchorElNotification] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleOpenFiltersMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFilters(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const handleCloseFilters = () => {
    setAnchorElFilters(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        alignSelf: "flex-start",
        backgroundColor: theme.darkBlue,
        color: "white",
        boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isSmallScreen && (
            <img
              src="/Logo-Freelaw-Branca.webp"
              alt="FreeLaw Logo"
              style={{
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.placeholder}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ":hover": {
                cursor: "default",
                marginBottom: "1px",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => navigate(page.path)}
                sx={{
                  color: "white",
                  borderBottom: "1px solid transparent",
                  display: "block",
                  ":hover": {
                    cursor: "pointer",
                    borderBottom: "1px solid white",
                  },
                  transition: "border-color 0.3s ease-in-out",
                }}
              >
                {page.placeholder}
              </Button>
            ))}
          </Box>
          {isEventsPage && (
            <IconButton
              sx={{ mr: 2 }}
              size="large"
              aria-label="Filter events"
              aria-controls="filter"
              aria-haspopup="true"
              onClick={handleOpenFiltersMenu}
              color="inherit"
            >
              <FilterAltIcon />
            </IconButton>
          )}
          <SearchBar
            value={textFieldValue}
            onChange={(newValue) => setTextFieldValue(newValue)}
            onSearch={() => {
              handleSearch(textFieldValue);
            }}
            style={{
              backgroundColor: "white",
              color: "darkblue",
              marginRigth: "10px",
            }}
          />

          <Box sx={{ mr: 3 }}>
            <Tooltip title={"Notificações"}>
              <IconButton
                size="large"
                aria-label="mostra notificações"
                color="inherit"
                onClick={handleOpenNotificationMenu}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <NotificationList
              notifications={notifications}
              setNotifications={setNotifications}
              anchorElNotification={anchorElNotification}
              handleCloseNotification={handleCloseNotification}
            />
            <Filters
              setFilters={setFilters}
              handleCloseFilters={handleCloseFilters}
              anchorElFilters={anchorElFilters}
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Ryan"
                  sx={{ bgcolor: "white", color: "#071330" }}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
