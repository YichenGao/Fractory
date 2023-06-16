import React, {useState} from "react";

import "./Warning.css";

type Props = {
    onWarningResponse: (proceed: boolean) => void
    num_shapes: number
}

const Warning = (props: Props) => {
    function getWarningText(number): string {
        if(number < 3e6)
            return "there is a chance it may even"
        if(number < 5e6)
            return "it may"
        if(number < 1e7)
            return "it probably will"
        return "it almost certainly will"
    }


    return (<div className="warning_container">
        <div className="warning-text_container">
            <div className = "warning-title_text">
                Warning
            </div>
            <div className = "warning-body_text">
                Rendering this fractal with the given parameters may require the processing of up to {Math.round(props.num_shapes/1e6)} million shapes. This may cause your browser to lag and {getWarningText(props.num_shapes)} crash. Reduce iterations or proceed with rendering?
            </div>
            <div className= "warning-button_container">
                <div className="warning-reduce-iterations_button" onClick={(event) => props.onWarningResponse(false)}>
                    Reduce iterations
                </div>
                <div className="warning-proceed_button" onClick={(event) => props.onWarningResponse(true)}>
                    Proceed
                </div>
            </div>
        </div>
    </div>);
}

export default Warning;