import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

const defaultTheme = createTheme();

type editUserModalOpen = {
  editUserModalOpen: boolean;
  setEditUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: userType;
};

type userType = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
};

export default function EditUserForm({
  user,
  editUserModalOpen,
  setEditUserModalOpen,
}: editUserModalOpen) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const [formData, setFormData] = React.useState({
    firstName: user.name?.split(" ")[0] || "",
    lastName: user.name?.split(" ")[1] || "",
    email: user.email || "",
    password: "",
  });

  React.useEffect(() => {
    setFormData({
      firstName: user.name?.split(" ")[0] || "",
      lastName: user.name?.split(" ")[1] || "",
      email: user.email || "",
      password: "",
    });
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid component="main" sx={{ height: "auto" }}>
        <CssBaseline />
        <Grid
          sx={{
            borderRadius: 8,
          }}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Editar usuário
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Nome"
                      autoFocus
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Sobrenome"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    maxWidth: "100%",
                    display: " flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Fab
                    onClick={() => setEditUserModalOpen(false)}
                    color={"error"}
                    sx={{ padding: "0.5rem 1rem", marginRight: "1rem" }}
                    variant="extended"
                    size="small"
                  >
                    <DoDisturbOnIcon sx={{ color: "success" }} />
                    Cancelar
                  </Fab>
                  <Fab
                    color="primary"
                    sx={{
                      mr: 2,
                      padding: "0.5rem 1rem",
                      marginRight: "1rem",
                    }}
                    variant="extended"
                    size="small"
                  >
                    <AddIcon />
                    Salvar
                  </Fab>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
