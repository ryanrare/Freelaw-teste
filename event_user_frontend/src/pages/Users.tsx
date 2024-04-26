import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import { GlobalStyle } from "../GlobalStyle";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CustomPagination from "../components/Pagination";
import CustomSpeedDial from "../components/Dial";
import UserCard from "../components/Cards/users";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../utils/functions/getToken";

type userType = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

const Users: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  let currentPage = Number(params.get("page")) || 1;

  const [page, setPage] = React.useState(currentPage);
  const [users, setUsers] = React.useState<userType[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const perPage = 8;

  const [editUserModalOpen, setEditUserModalOpen] = React.useState(false);

  const handleEditUserClick = () => {
    setEditUserModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        const response = await fetch("http://localhost:8000/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setUsers(data);

        if (!data) {
          return;
        }

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const usersForPage = data.slice(startIndex, endIndex);

        const totalUsers = data.length;
        const totalPages = Math.ceil(totalUsers / perPage);

        setTotalPages(totalPages);
        setUsers(usersForPage);

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

    fetchData();
  }, [page, navigate]);

  return (
    <HelmetProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          justifyContent: "space-between",
        }}
      >
        <GlobalStyle />
        <Helmet>
          <title>Usuários</title>
        </Helmet>
        <AppBar />
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
          {users.map((user: userType) => (
            <UserCard
              key={user.id}
              avatar={user.avatar}
              email={user.email}
              name={user.name}
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

export default Users;
