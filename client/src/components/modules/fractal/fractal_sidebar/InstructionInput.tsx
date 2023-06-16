import React, {useState} from "react";
import { Operator, Symbol } from "../../../../constants/Types";

import "./InstructionInput.css";

type Props = {
    instruction: string
    updateInstruction: (new_instruction: string) => void
    symbols: Symbol[]
    operators: Operator[]
}

const InstructionInput = (props: Props) => {
    return (<div className="instruction-input-dropdown_container">
        <input className="sidebar_input" 
            type="text" 
            value = {props.instruction} 
            placeholder={
                props.operators.map((operator: Operator) => operator.name).join(', ') + 
                ', ' + 
                props.symbols.map((symbol: Symbol) => symbol.name).join(', ')} 
            maxLength={10}
            onChange={(event) => props.updateInstruction(event.target.value.toUpperCase())}/> 
        <div className="instruction-input-dropdown-content_container box-shadow">
            <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
                Available: 
            </div>
            <div className="instruction-input-instruction_container">
                {
                    props.symbols.map((symbol: Symbol) => 
                    <div key={symbol.name} className="instruction-icon symbol instruction-input-small-instruction-icon" 
                           >
                        {symbol.name}
                    </div>
                )   
                }
                {
                    props.operators.map((operator: Operator) => 
                    <div key={operator.name} className="instruction-icon operator instruction-input-small-instruction-icon" 
                           >
                        {operator.name}
                    </div>
                )   
                }
            </div>
        </div>
    </div>);
}

export default InstructionInput;