import React, {useState, useRef} from "react";
import { Operator } from "../../../../constants/Types";
import rotate_right from "../../../../images/rotate_right.svg"
import rotate_left from "../../../../images/rotate_left.svg"
import delete_icon from "../../../../images/delete.svg"
import "./OperatorEdit.css";

type OperatorEditProps = {
    operator: Operator
    updateOperator: (new_operator: Operator) => void;
    removeOperator: (remove_operator: Operator) => void;
}

const OperatorEdit = (props: OperatorEditProps) => {
    const input_ref = useRef(undefined);
    // clockwise = true, counterclockwise = false
    const [orientation, setOrientation] = useState(props.operator.rotation >= 0);

    function updateOperator(raw_rotation_value: number, orientation: boolean): void {
        const new_rotation_value = (orientation ? raw_rotation_value : -raw_rotation_value);
        
        const new_Operator = {
            name: props.operator.name,
            rotation: new_rotation_value,
        } as Operator;
        props.updateOperator(new_Operator);
    }

    function updateOrientation(new_orientation: boolean) {
        if(new_orientation !== orientation) {
            setOrientation(new_orientation);
            updateOperator(Number(input_ref.current.value), new_orientation);
        }
    }

    function removeOperator(): void {
        props.removeOperator(props.operator);
    }
    
    return (<div className="operator-edit_container">
        <div className="operator-edit_container2">
            <div className="instruction-icon operator box-shadow">
                        <div>
                        {props.operator.name}
                        </div>
                    </div>
            <div className="fractal-sidebar-edit-remove_button"
            onClick={(event) => removeOperator()}>
            <img src={delete_icon}/>
            </div>        
        </div>

        <div className="operator-edit_container3">
            <div className="fractal-sidebar-edit-hint_text"> Rotate (degrees): 
                </div>
            
            <div className={`operator-edit_button box-shadow ${orientation ? 'selected' : ''}`} 
            onClick={(event) => updateOrientation(!orientation)}>
            <img src = {orientation ? rotate_right : rotate_left}/>
            </div>
            <input className = 'operator-edit_input' ref = {input_ref}
            type='number' value={Math.abs(props.operator.rotation)} min={0} max={180} step={15} 
            onChange={(event) => updateOperator(Number(event.target.value), orientation)}/>
        
        </div>

        <div className="fractal-sidebar_divider">

        </div>
        
        
    </div>);
}

export default OperatorEdit;