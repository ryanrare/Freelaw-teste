import React from "react";
import AppBar from "../components/AppBar";
import { GlobalStyle } from "../GlobalStyle";
import Footer from "../components/Footer";
import { Box, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home: React.FC = () => {
  return (
    <HelmetProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Helmet>
          <title>Home</title>
        </Helmet>
        <GlobalStyle />
        <AppBar />
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            flexDirection: "column",
            minHeight: "70dvh",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              ml: 2,
            }}
            variant="h2"
          >
            Home Page
          </Typography>
        </Box>
        <Footer />
      </Box>
    </HelmetProvider>
  );
};

export default Home;
