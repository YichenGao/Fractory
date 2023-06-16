import React, { SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ButtonGrid from "./ButtonGrid";
import Steps from "./Steps";
import PopUp from "./PopUp";

type StartProp = {
  stepNumber: number;
  nextStep: () => void;
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  setStartCoords: React.Dispatch<SetStateAction<number[]>>;
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

const Start = (props: StartProp) => {
  // handle condition for allowing next step
  const [disableNext, setDisableNext] = useState<boolean>(true);
  useEffect(() => {
    setDisableNext(props.startCoords[0] === -1);
  }, [props.startCoords]);

  // show an error message if start point out of pattern
  const [outOfPattern, setOutOfPattern] = useState(false);
  const setNewStartPoint = (x: number, y: number) => {
    if (props.grid[x][y]) {
      props.setStartCoords([x, y]);
      setOutOfPattern(false);
    } else {
      setOutOfPattern(true);
    }
  };

  // reset start point to dummy value if out of pattern
  // at rendering step (from pressing back)
  useEffect(() => {
    let [x1, y1] = props.startCoords;
    if (x1 >= 0 && !props.grid[x1][y1]) {
      props.setStartCoords([-1, -1]);
    }
  }, []);

  return (
    <div className="Pattern-container">
      <div className="Pattern-sidebar">
        <div className="Pattern-steps">
          <Steps stepNumber={props.stepNumber} />
        </div>
        <h1 className="Pattern-title">Step 2: Choose Start Point</h1>
        <p className="Pattern-body">
          Select the starting point. New copies of the pattern are attached to the original at their
          starting point.
        </p>
        {outOfPattern ? (
          <PopUp
            delay={3000}
            visible={outOfPattern}
            setVisible={setOutOfPattern}
            message="Starting point has to be part of the pattern!"
          />
        ) : (
          <></>
        )}
        <div className="Pattern-stepNav">
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
                NEXT
              </Button>
            </Stack>
          </ThemeProvider>
        </div>
      </div>
      <div className="Pattern-content">
        <ButtonGrid
          grid={props.grid}
          startCoords={props.startCoords}
          handleClick={setNewStartPoint}
        />
      </div>
    </div>
  );
};

export default Start;
