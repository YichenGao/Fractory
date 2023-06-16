import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

import "./Steps.css";

type StepsProps = {
  stepNumber: number;
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#3454c5",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#3454c5",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#444444",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiStepIcon-root.Mui-active": { color: "#3454c5" },
    "& .MuiStepIcon-root.Mui-completed": { color: "#3454c5" },
    "& .MuiStepIcon-root": { color: "#333333" },
  },
}));

const stepLabels = ["", "", "", "", ""];

const Steps = (props: StepsProps) => {
  const classes = useStyles();
  return (
    <Stepper className={classes.root} activeStep={props.stepNumber} connector={<CustomConnector />}>
      {stepLabels.map((label, idx) => (
        <Step key={idx}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Steps;
