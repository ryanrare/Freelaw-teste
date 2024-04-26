import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ThemeContext from "../../context/themeContext";
import { Box, IconButton, List, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { NotificationType } from "../../types/notification";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/functions/getToken";
import { Bounce, toast } from "react-toastify";

type notificationListProps = {
  anchorElNotification: null | HTMLElement;
  handleCloseNotification: () => void;
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  notifications: NotificationType[];
};

export default function NotificationList(props: notificationListProps) {
  const { anchorElNotification, handleCloseNotification, notifications } =
    props;

  const dispatch = useDispatch();

  const theme = React.useContext(ThemeContext);

  const deleteNotification = async (id: number) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
    try {
      const token = getToken();

      const res = await fetch(
        `http://localhost:8000/users/notifications/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status !== 204) {
        toast.error("Falha ao deletar notificação", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          toastId: 123,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Menu
      sx={{
        mt: "45px",
        "& .MuiMenu-paper": {
          backgroundColor: theme.darkBlue,
          scrollbarWidth: "thin",
          scrollbarColor: "#4d4d4d #071330",
        },
      }}
      id="menu-notifications"
      anchorEl={anchorElNotification}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={
        notifications &&
        notifications.length > 0 &&
        Boolean(anchorElNotification)
      }
      onClose={handleCloseNotification}
    >
      <List
        dense={true}
        sx={{
          width: "100%",
          maxWidth: 300,
          maxHeight: 300,
          padding: 0,
        }}
      >
        {notifications.map((not) => (
          <MenuItem key={not.id} onClick={() => {}}>
            <ListItem
              alignItems="center"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.blueGray,
                height: "auto",
                textWrap: "pretty",
                width: "100%",
                borderRadius: "10px",
                padding: "10px",
                zIndex: 10,
                "&:hover": {
                  cursor: "pointer !important",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    cursor: "pointer !important",
                  },
                }}
              >
                <ListItemAvatar
                  sx={{
                    "&:hover": {
                      cursor: "pointer !important",
                    },
                  }}
                >
                  <Avatar alt="User" src="astronaut.jpg" />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    display: "inline",
                    color: "white",
                    fontSize: "1.8rem",
                  }}
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          "&:hover": {
                            cursor: "pointer !important",
                          },
                          color: "white",
                        }}
                        component="span"
                        variant="subtitle1"
                        color="white"
                      >
                        Evento Atualizado!
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          "&:hover": {
                            cursor: "pointer !important",
                          },
                          color: "white",
                        }}
                        component="span"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {not.notificationExtraData?.eventTitle} as{" "}
                        {new Date().toLocaleTimeString()}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Box>
              <IconButton
                size="small"
                aria-label="delete"
                aria-haspopup="true"
                onClick={() => {
                  deleteNotification(not.id);
                }}
                color="inherit"
                sx={{
                  zIndex: 100,
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          </MenuItem>
        ))}
      </List>
    </Menu>
  );
}
