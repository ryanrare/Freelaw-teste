import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import { GlobalStyle } from "../GlobalStyle";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";
import EventCard from "../components/Cards/events";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CustomPagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import CustomSpeedDial from "../components/Dial";
import { getToken } from "../utils/functions/getToken";

const Event: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  let currentPage = Number(params.get("page")) || 1;

  const [page, setPage] = React.useState(currentPage);
  const [events, setEvents] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const perPage = 9;

  const [filters, setFilters] = React.useState<any[]>([]);
  const [updateEvents, setUpdateEvents] = React.useState(false);

  function updateEventData() {
    fetchData();
  }

  const fetchData = async () => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await fetch("http://localhost:8000/events/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const updatedData = data.results.map(
        (event: {
          start_date: any;
          end_date: any;
          end_time: any;
          start_time: any;
          occupancy: any;
          users_registered: any;
        }) => ({
          ...event,
          startDate: event.start_date,
          endDate: event.end_date,
          endTime: event.end_time,
          startTime: event.start_time,
          lotation: event.users_registered.length,
        })
      );
      setEvents(updatedData);

      if (!data) {
        return;
      }

      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      let totalPages;
      const totalUsers = data.length;
      let usersPerPage;

      if (!(endIndex - 1 >= perPage)) {
        const usersForPage = data.slice(startIndex, endIndex);
        totalPages = Math.ceil(totalUsers / perPage);
      } else {
        totalPages = 1;
      }

      setTotalPages(totalPages);

      if (usersPerPage) setEvents(usersPerPage);

      if (page > totalPages) {
        setPage(totalPages);
        navigate(`?page=${totalPages}`);
      } else {
        navigate(`?page=${page}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, navigate]);

  useEffect(() => {}, [filters]);

  return (
    <HelmetProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Helmet>
          <title>Eventos</title>
        </Helmet>
        <GlobalStyle />
        <AppBar setFilters={setFilters} />
        <Container
          maxWidth={"xl"}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          {events.map((event: any) => (
            <EventCard
              key={event.id}
              {...event}
              updateEventData={updateEventData} // Passa a função como prop
            />
          ))}
        </Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            currentPage={page}
            setOnFatherPage={setPage}
          />
        </Box>
        <CustomSpeedDial />
        <Footer />
      </Box>
    </HelmetProvider>
  );
};

export default Event;
