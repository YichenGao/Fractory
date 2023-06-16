import React, { MouseEventHandler, useState } from "react";
import "./Mode.css";
import { RouteComponentProps } from "@reach/router";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "@reach/router";

type ModeProps = RouteComponentProps;

const theme = createTheme({
  palette: {
    primary: {
      main: "#3454c5",
      contrastText: "#ffffff",
    },
    action: {
      hover: "#6987db",
      disabledBackground: "rgba(0,0,0,0.20)",
      disabled: "#444444",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 24,
    button: {
      fontWeight: 700,
    },
  },
});

const Mode = (props: ModeProps) => {
  return (
    <div className="mode-background">
      <h3 className="mode-text">CHOOSE A MODE</h3>
      <div className="split left">
        <div className="centered">
          <Stack spacing={2} direction="column">
            <Link to="/create/simple_fractal_creator/" className="Dashboard-linkText">
              <ThemeProvider theme={theme}>
                <Button variant="contained" size="large" sx={{ px: 3, py: 1.5 }}>
                  SIMPLE
                </Button>
              </ThemeProvider>
            </Link>
            <h2>Follow 5 simple steps to create fractals</h2>
            <p>
              Learn the process of creating fractals with a basic step-by-step tutorial. Recommended
              for those who are using Fractory for the first time.
            </p>
          </Stack>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <Stack spacing={2} direction="column">
            <Link to="/create/advanced_fractal_creator/" className="Dashboard-linkText">
              <ThemeProvider theme={theme}>
                <Button variant="contained" size="large" sx={{ px: 3, py: 1.5 }}>
                  ADVANCED
                </Button>
              </ThemeProvider>
            </Link>
            <h2>Build Fractals using more advanced features</h2>
            <p>
              Have custom shapes, colors, patterns, iteration rules, etc. Use your imagination to
              make intricate and beautiful fractals. Unfortunately, saving is not yet enabled in
              this mode.
            </p>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Mode;
