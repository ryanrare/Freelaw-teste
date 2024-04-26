import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardActionArea } from "@mui/material";
import ThemeContext from "../../../context/themeContext";
import EditUserModal from "../../modals/editUserModal";

type userType = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
};

export default function UserCard({ id, name, email, avatar }: userType) {
  const theme = React.useContext(ThemeContext);
  const [editUserModalOpen, setEditUserModalOpen] = React.useState(false);

  const handleClick = () => {
    setEditUserModalOpen(true);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        minWidth: 300,
        maxWidth: 350,
        bgcolor: theme.darkBlue,
      }}
    >
      {" "}
      <CardActionArea onClick={handleClick}>
        {" "}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              alignContent: "center",
              mb: 3,
            }}
          >
            <Avatar
              alt={name?.split(" ")[0]}
              sx={{
                bgcolor: theme.mistyBlue,
                color: theme.darkBlue,
                height: 90,
                width: 90,
                mr: 2,
              }}
              src={avatar || ""}
            />
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{
                color: "#fff",
                textWrap: "pretty",
              }}
            >
              {name || "Usuário sem nome"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <MarkEmailUnreadIcon
              sx={{
                color: "#fff",
                mr: 1,
              }}
            />

            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{
                color: "#fff",
                textWrap: "pretty",
              }}
            >
              {email}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <EditUserModal
        user={{ name, email, avatar }}
        editUserModalOpen={editUserModalOpen}
        setEditUserModalOpen={setEditUserModalOpen}
      />
    </Card>
  );
}
