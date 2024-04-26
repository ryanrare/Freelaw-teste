import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ThemeContext from "../../context/themeContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const Footer = () => {
  const theme = React.useContext(ThemeContext);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const styles = {
    root: {
      backgroundColor: theme.darkBlue,
      color: "white",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        color: "white",
      },
    },
  };

  return (
    <Box component="footer" sx={styles.root}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="/Logo-Freelaw-Branca.webp"
          alt="FreeLaw Logo"
          style={{
            width: "120px",
            height: "60px",
          }}
        />
        <Typography variant="body1">
          &copy; {new Date().getFullYear()}
        </Typography>
        <Typography
          sx={{
            m: 2,
          }}
          variant="subtitle2"
        >
          {" "}
          Por Ryan Victor{" "}
        </Typography>
      </Box>
      {!isSmallScreen && (
        <Stack
          direction="row"
          spacing={4}
          sx={{
            mr: 20,
          }}
        >
          <Link
            href="https://www.google.com/search?q=Freelaw&oq=Free&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYOzIGCAMQRRg9MgYIBBBFGD0yBggFEEUYPDIGCAYQRRg8MgYIBxAuGEDSAQgxNDQ4ajBqMagCALACAA&sourceid=chrome&ie=UTF-8"
            sx={styles.link}
          >
            Sobre Nós
          </Link>
          <Link href="https://freelaw.work/" sx={styles.link}>
            Nosso Site
          </Link>
          <Link
            href="https://freelaw.work/agendar-demonstracao/"
            sx={styles.link}
          >
            Agendar Demonstração
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default Footer;
