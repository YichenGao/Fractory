import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { GRID_SIZE } from "../../constants/Constants";
import "./Pattern.css";
import ButtonGrid from "./ButtonGrid";
import Steps from "./Steps";

type PatternProp = {
  stepNumber: number;
  nextStep: () => void;
  grid: boolean[][];
  changeCellState: (x: number, y: number) => void;
};

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
    button: {
      fontWeight: 700,
    },
  },
});

const Pattern = (props: PatternProp) => {
  // handling condition for allowing next step
  const [disableNext, setDisableNext] = useState<boolean>(true);
  const hasTwoCells = (): boolean => {
    let count: number = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (props.grid[i][j]) count++;
        if (count >= 2) return true;
      }
    }
    return false;
  };
  useEffect(() => {
    setDisableNext(!hasTwoCells());
  }, [props.grid]);

  return (
    <div className="Pattern-container">
      <div className="Pattern-sidebar">
        <div className="Pattern-steps">
          <Steps stepNumber={props.stepNumber} />
        </div>
        <h1 className="Pattern-title">Step 1: Choose Pattern</h1>
        <p className="Pattern-body">
          Draw the initial seed pattern that will be copy-pasted over and over again to generate the
          fractal. <b>Please select at least two cells.</b>
        </p>
        <div className="Pattern-stepNav">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="large"
              disabled={disableNext}
              onClick={props.nextStep}
            >
              NEXT
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <div className="Pattern-content">
        <ButtonGrid grid={props.grid} handleClick={props.changeCellState} />
      </div>
    </div>
  );
};

export default Pattern;
