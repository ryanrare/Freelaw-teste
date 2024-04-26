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
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const defaultTheme = createTheme();

type createUserModalOpen = {
  createUserModalOpen?: boolean;
  setCreateUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateUserForm({
  createUserModalOpen,
  setCreateUserModalOpen,
  setEditUserModalOpen,
}: createUserModalOpen) {
  const [response, setResponse] = React.useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
      const res = await fetch("http://localhost:8000/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("firstName") + " " + data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
        }),
      });
      const json = await res.json();
      setResponse(json);
      if (json.email) {
        toast.error(`${json.email[0]}`, {
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
      } else {
        toast.success("Criado Com sucesso!", {
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
                Cadastrar usuário
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      autoComplete="new-password"
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
                    onClick={() => setCreateUserModalOpen(false)}
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
                    type="submit"
                  >
                    <AddIcon />
                    Criar
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
