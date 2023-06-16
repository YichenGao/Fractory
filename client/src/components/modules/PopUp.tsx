import React, { useEffect, useState, SetStateAction } from "react";
import Alert from "@mui/material/Alert";

import "./PopUp.css";

type PopUpProps = {
  delay: number;
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  message: string;
};

const PopUp = (props: PopUpProps) => {
  useEffect(() => {
    console.log(props.delay);
    setTimeout(() => {
      props.setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return props.visible ? (
    <div className="Alert">
      <Alert
        onClose={() => {
          props.setVisible(false);
        }}
        severity="warning"
      >
        {props.message}
      </Alert>
    </div>
  ) : (
    <></>
  );
};

export default PopUp;
