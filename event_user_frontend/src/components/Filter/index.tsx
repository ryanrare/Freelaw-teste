import * as React from "react";
import { Box, IconButton, List, Menu, MenuItem } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, useMediaQuery } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type filterProps = {
  anchorElFilters: null | HTMLElement;
  handleCloseFilters: () => void;
  setFilters?: React.Dispatch<React.SetStateAction<any>>;
};

export default function Filters(props: filterProps) {
  const { anchorElFilters, handleCloseFilters, setFilters } = props;

  const [formData, setFormData] = React.useState<any>({
    capacity: "",
    lotation: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
  });

  const handleSubmit = (event: any) => {
    handleCloseFilters();
    event.preventDefault();

    const startDateString = event.target.elements["startDate"].value;
    const endDateString = event.target.elements["endDate"].value;

    const startTimeString = event.target.elements["startTime"].value;
    const endTimeString = event.target.elements["endTime"].value;

    const startDate = dayjs(startDateString, "DD/MM/YYYY").format("YYYY-MM-DD");
    const endDate = dayjs(endDateString, "DD/MM/YYYY").format("YYYY-MM-DD");
    const startTime = dayjs(startTimeString, "HH:mm").format("HH:mm");
    const endTime = dayjs(endTimeString, "HH:mm").format("HH:mm");

    const data = {
      capacity: formData.capacity,
      lotation: formData.lotation,
      startDate: startDate && startDate !== "Invalid Date" ? startDate : "",
      endDate: endDate && endDate !== "Invalid Date" ? endDate : "",
      startTime: startTime && startTime !== "Invalid Date" ? startTime : "",
      endTime: endTime && endTime !== "Invalid Date" ? endTime : "",
    };

    if (setFilters) {
      setFilters(data);
    }

    setFormData({
      capacity: "",
      lotation: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    });
  };

  const clearFilters = () => {
    setFormData({
      capacity: "",
      lotation: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    });
  };

  return (
    <Menu
      sx={{
        mt: "45px",
        "& .MuiMenu-paper": {
          backgroundColor: "transparent",
          scrollbarWidth: "thin",
          scrollbarColor: "#4d4d4d #071330",
          padding: "0",
          borderRadius: "35px",
          maxWidth: 500,
        },
        "& .MuiMenu-list": {
          padding: "0",
          borderRadius: "35px",
        },
        paddingBottom: "0",
      }}
      id="menu-notifications"
      anchorEl={anchorElFilters}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElFilters)}
      onClose={handleCloseFilters}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          borderRadius: "35px",
        }}
      >
        <Grid
          component="main"
          sx={{
            height: "auto",
            width: "100%",
            maxWidth: "100%",
            backgroundColor: "transparent",
            borderRadius: "35px",
          }}
        >
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
                  marginTop: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 0 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        name="capacity"
                        fullWidth
                        id="capacity"
                        label="Capacidade"
                        autoFocus
                        type="number"
                        value={formData.capacity}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            capacity: event.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="lotation"
                        fullWidth
                        id="lotation"
                        label="Confirmadas"
                        autoFocus
                        type="number"
                        value={formData.lotation}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            lotation: event.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data inicial"
                          name="startDate"
                          format="DD/MM/YYYY"
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                          }}
                          defaultValue={formData.startDate}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                          name="startTime"
                          label="Hora inicial"
                          ampm={false}
                          defaultValue={formData.startTime}
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data Final"
                          name="endDate"
                          format="DD/MM/YYYY"
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                          }}
                          defaultValue={formData.endDate}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                          name="endTime"
                          label="Hora Final"
                          ampm={false}
                          defaultValue={null}
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                          }}
                          value={formData.endTime}
                        />
                      </LocalizationProvider>
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
                      onClick={() => {
                        handleCloseFilters();
                        clearFilters();
                      }}
                      color={"error"}
                      sx={{ padding: "0.5rem 1rem", marginRight: "1rem" }}
                      variant="extended"
                      size="small"
                    >
                      Cancelar
                    </Fab>
                    <Fab
                      type="submit"
                      color="primary"
                      sx={{
                        mr: 2,
                        padding: "0.5rem 1rem",
                        marginRight: "1rem",
                      }}
                      variant="extended"
                      size="small"
                    >
                      Filtrar
                    </Fab>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Menu>
  );
}
