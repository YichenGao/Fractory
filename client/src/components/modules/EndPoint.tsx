import React, { SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ButtonGrid from "./ButtonGrid";
import Steps from "./Steps";
import PopUp from "./PopUp";
import { isEqual } from "../../constants/Constants";

type EndPointProp = {
  stepNumber: number;
  nextStep: () => void;
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  endCoords: number[];
  setEndCoords: React.Dispatch<SetStateAction<number[]>>;
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

const EndPoint = (props: EndPointProp) => {
  // handle condition for allowing next step
  const [disableNext, setDisableNext] = useState<boolean>(true);
  useEffect(() => {
    setDisableNext(props.endCoords[0] === -1);
  }, [props.endCoords]);

  const [outOfPattern, setOutOfPattern] = useState(false);
  const [sameAsStart, setSameAsStart] = useState(false);

  const setNewEndPoint = (x: number, y: number) => {
    if (props.grid[x][y] && !isEqual([x, y], props.startCoords)) {
      props.setEndCoords([x, y]);
      setOutOfPattern(false);
      setSameAsStart(false);
    } else if (isEqual([x, y], props.startCoords)) {
      setOutOfPattern(false);
      setSameAsStart(true);
    } else {
      setSameAsStart(false);
      setOutOfPattern(true);
    }
  };

  useEffect(() => {
    let [x2, y2] = props.endCoords;
    if (isEqual([x2, y2], props.startCoords)) {
      props.setEndCoords([-1, -1]);
    } else if (x2 >= 0 && !props.grid[x2][y2]) {
      props.setEndCoords([-1, -1]);
    }
  }, []);

  return (
    <div className="Pattern-container">
      <div className="Pattern-sidebar">
        <div className="Pattern-steps">
          <Steps stepNumber={props.stepNumber} />
        </div>
        <h1 className="Pattern-title">Step 3: Choose End Point</h1>
        <p className="Pattern-body">
          Select the ending point. New copies are attached to the original's ending point, but
          rotated 90 degrees.
        </p>
        {outOfPattern ? (
          <PopUp
            delay={3000}
            visible={outOfPattern}
            setVisible={setOutOfPattern}
            message="Ending point has to be part of the pattern!"
          />
        ) : (
          <></>
        )}
        {sameAsStart ? (
          <PopUp
            delay={3000}
            visible={sameAsStart}
            setVisible={setSameAsStart}
            message="Ending point cannot be the same as the starting point!"
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
          endCoords={props.endCoords}
          handleClick={setNewEndPoint}
        />
      </div>
    </div>
  );
};

export default EndPoint;
