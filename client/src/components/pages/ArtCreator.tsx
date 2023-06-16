import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";

import { GRID_SIZE } from "../../constants/Constants";
import { get } from "../../utilities";
import Pattern from "../modules/Pattern";
import StartPoint from "../modules/StartPoint";
import EndPoint from "../modules/EndPoint";
import Parameters from "../modules/Parameters";
import Result from "../modules/Result";
import "./ArtCreator.css";

type ArtCreatorProps = RouteComponentProps & {
  userId: String;
};

const ArtCreator = (props: ArtCreatorProps): JSX.Element => {
  const [artworkId, setArtworkId] = useState<string>("");

  // check if loading existing artwork

  // info to get from inputs (grid pattern, start, end)
  const [grid, setGrid] = useState(
    new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(false))
  );
  const changeCellState = (x: number, y: number): void => {
    let newGrid = grid.map((a) => {
      return [...a];
    });
    newGrid[x][y] = !newGrid[x][y];
    setGrid(newGrid);
  };
  const [startCoords, setStartCoords] = useState([-1, -1]);
  const [endCoords, setEndCoords] = useState([-1, -1]);
  const [numIterations, setNumIterations] = useState(1);

  // if editing existing artwork, load data
  useEffect(() => {
    if (props["*"].length > 0) {
      setArtworkId(props["*"]);
    }
    if (artworkId.length > 0) {
      get(`/api/artwork/${props.userId}`, { artworkId: artworkId }).then((artworks) => {
        let artwork = artworks[0];
        setGrid(artwork.grid);
        setStartCoords(artwork.startCoords);
        setEndCoords(artwork.endCoords);
        setNumIterations(artwork.numIterations);
      });
    }
  }, [props.userId, artworkId]);

  // keeping track of steps
  const [stepNumber, setStepNumber] = useState(0);
  const nextStep = (): void => {
    setStepNumber(stepNumber + 1);
  };
  const prevStep = (): void => {
    setStepNumber(stepNumber - 1);
  };

  const renderFromStepNumber = (stepNumber: number): JSX.Element => {
    switch (stepNumber) {
      case 0:
        return (
          <Pattern
            stepNumber={stepNumber}
            nextStep={nextStep}
            grid={grid}
            changeCellState={changeCellState}
          />
        );
      case 1:
        return (
          <StartPoint
            stepNumber={stepNumber}
            nextStep={nextStep}
            prevStep={prevStep}
            grid={grid}
            startCoords={startCoords}
            setStartCoords={setStartCoords}
          />
        );
      case 2:
        return (
          <EndPoint
            stepNumber={stepNumber}
            nextStep={nextStep}
            prevStep={prevStep}
            grid={grid}
            startCoords={startCoords}
            endCoords={endCoords}
            setEndCoords={setEndCoords}
          />
        );
      case 3:
        return (
          <Parameters
            stepNumber={stepNumber}
            nextStep={nextStep}
            prevStep={prevStep}
            numIterations={numIterations}
            setNumIterations={setNumIterations}
          />
        );
      case 4:
        return (
          <Result
            artworkId={artworkId}
            setArtworkId={setArtworkId}
            stepNumber={stepNumber}
            prevStep={prevStep}
            grid={grid}
            startCoords={startCoords}
            endCoords={endCoords}
            numIterations={numIterations}
          />
        );
    }
  };

  const renderLoginWarning = (): JSX.Element => {
    return <div className="ArtCreator-loginWarning">You must be logged in to continue!</div>;
  };

  return (
    <div className="ArtCreator-background">
      {props.userId ? renderFromStepNumber(stepNumber) : renderLoginWarning()}
    </div>
  );
};

export default ArtCreator;
