import React, { SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import * as d3 from "d3";
import * as svg_to_png from "save-svg-as-png";
import D3Drawer from "./D3Drawer";

import { GRID_SIZE } from "../../constants/Constants";
import { post } from "../../utilities";
import "./Result.css";
import Steps from "./Steps";

type ResultProp = {
  artworkId: string;
  setArtworkId: React.Dispatch<SetStateAction<string>>;
  stepNumber: number;
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  endCoords: number[];
  numIterations: number;
};

const useD3 = (renderD3) => {
  const ref = React.useRef();
  useEffect(() => {
    renderD3(d3.select(ref.current));
    return () => {};
  }, []);
  return ref;
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

const Result = (props: ResultProp) => {
  // convert to more usable data structure
  let cellDeltas: [number, number][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (props.grid[i][j]) {
        cellDeltas.push([j - props.startCoords[1], i - props.startCoords[0]]);
      }
    }
  }
  let endDelta: [number, number] = [
    props.endCoords[1] - props.startCoords[1],
    props.endCoords[0] - props.startCoords[0],
  ];

  const body = {
    grid: props.grid,
    startCoords: props.startCoords,
    endCoords: props.endCoords,
    cellDeltas: cellDeltas,
    endDelta: endDelta,
    numIterations: props.numIterations,
  };
  useEffect(() => {
    if (props.artworkId.length > 0) {
      post(`/api/artwork/${props.artworkId}`, body);
    } else {
      post("/api/artwork", body).then((artwork) => {
        props.setArtworkId(artwork._id);
      });
    }
  }, []);

  const [bounds, setBounds] = useState<{ [key: string]: number }>({});

  // D3 rendering
  const doD3Stuff = (svg) => {
    // svg.attr("width", 1000).attr("height", 1000);
    svg.attr("preserveAspectRatio", "xMinYMin meet").classed("Result-svgResponsive", true);
    const artist = new D3Drawer(cellDeltas, endDelta, props.numIterations, svg);
    artist.render();
    setBounds(artist.bounds);
  };
  const ref = useD3(doD3Stuff);

  const saveAsImage = () => {
    svg_to_png.saveSvgAsPng(document.getElementById("svgContainer"), "plot.png", {
      backgroundColor: "#000000",
      scale: Math.round(1680 / Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY)),
      left: bounds.minX,
      top: bounds.minY,
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
    });
  };

  return (
    <div className="Result-container">
      <div className="Result-top">
        <div className="Result-steps">
          <Steps stepNumber={props.stepNumber} />
        </div>
        <div className="Result-stepNav">
          <Stack spacing={2} direction="row">
            <ThemeProvider theme={theme}>
              <Button variant="contained" size="large" onClick={props.prevStep}>
                BACK
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={saveAsImage}
                sx={{ bgcolor: "rgb(150, 3, 3)", "&:hover": { bgcolor: "rgb(150, 3, 3, 0.7)" } }}
              >
                SAVE AS IMAGE
              </Button>
            </ThemeProvider>
          </Stack>
        </div>
      </div>
      <div className="Result-svgRenderer">
        <svg id="svgContainer" ref={ref}></svg>
      </div>
    </div>
  );
};

export default Result;
