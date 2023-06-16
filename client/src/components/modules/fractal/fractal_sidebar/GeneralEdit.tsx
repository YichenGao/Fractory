import React, {useState} from "react";
import { Operator, Symbol } from "../../../../constants/Types";
import Util from "../../../../constants/Util";

import "./FractalSidebar.css";
import InstructionInput from "./InstructionInput";

type Props = {
    num_iterations: number
    updateNumIterations: (new_num_iterations: number) => void
    initial: string
    updateInitial: (new_initial: string) => void
    symbols: Symbol[]
    operators: Operator[]
    background_color: number
    updateBackgroundColor: (new_background_color: number) => void
}

const GeneralEdit = (props: Props) => {
    return (<div className="fractal-sidebar-section-edit_container box-shadow general_extra_padding">
        <div className = "fractal-sidebar-section-title_text box-shadow">
            GENERAL SETTINGS
        </div>
        <div className="fractal-sidebar-section-list_container">
        <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
            Initial State:
        </div>
        <InstructionInput
            instruction={props.initial}
            updateInstruction={props.updateInitial}
            symbols={props.symbols}
            operators={props.operators}
            />
        <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
            Number of Iterations:
        </div>
        <input className = 'sidebar_input'
            type='number' 
            value={props.num_iterations} 
            min={0} 
            max={20} 
            step={1} 
            onChange={(event) => props.updateNumIterations(Number(event.target.value))}
        />
        <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
            Background Color:
        </div>
        <input className="fractal-sidebar-color_input box-shadow"
            type='color' 
            value={Util.colorNumberToString(props.background_color)}
            onChange={(event) => {
                props.updateBackgroundColor(Util.colorStringToNumber(event.target.value))}}
        />
        </div>
    </div>);
}

export default GeneralEdit;