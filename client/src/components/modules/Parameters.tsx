import React, { SetStateAction, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Steps from "./Steps";
import "./Parameters.css";

type ParametersProp = {
  stepNumber: number;
  nextStep: () => void;
  prevStep: () => void;
  numIterations: number;
  setNumIterations: React.Dispatch<SetStateAction<number>>;
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

const Parameters = (props: ParametersProp) => {
  // handle condition for allowing next step
  const [disableNext, setDisableNext] = useState<boolean>(true);
  useEffect(() => {
    setDisableNext(
      props.numIterations <= 0 || props.numIterations === undefined || props.numIterations === null
    );
  }, [props.numIterations]);

  const handleInputChange = (event) => {
    let allNumber: boolean = true;
    for (const c of event.target.value) {
      if (!("0" <= c && c <= "9")) {
        allNumber = false;
        break;
      }
    }
    if (allNumber) {
      props.setNumIterations(Math.min(event.target.value, 12));
    }
  };

  const decrement = (): void => {
    props.setNumIterations(Math.max(0, props.numIterations - 1));
  };
  const increment = (): void => {
    props.setNumIterations(Math.min(12, props.numIterations + 1));
  };

  return (
    <div className="Parameters-container">
      <div className="Pattern-steps">
        <Steps stepNumber={props.stepNumber} />
      </div>
      <h1 className="Parameters-title">Step 4: Choose Parameters</h1>
      <div className="Parameters-body">
        <Stack spacing={2} direction="column">
          <div>Number of iterations:</div>
          <Stack spacing={2} direction="row">
            <button onClick={decrement} className="Parameters-counterButton">
              〈&ensp;
            </button>
            <input
              type="text"
              value={props.numIterations}
              onChange={handleInputChange}
              className="Parameters-input"
            />
            <button onClick={increment} className="Parameters-counterButton">
              &ensp;〉
            </button>
          </Stack>
        </Stack>
      </div>
      <div className="Parameters-stepNav">
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={props.prevStep}>
              BACK
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={props.nextStep}
              disabled={disableNext}
            >
              GENERATE FRACTAL !
            </Button>
          </Stack>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Parameters;
