import React, {useState} from "react";
import { Operator } from "../../../../constants/Types";

import "./FractalSidebar.css";
import OperatorEdit from "./OperatorEdit";

type Props = {
    operators: Operator[]
    updateOperators: (new_operators: Operator[], removed_operator: Operator) => void
}

const OperatorEditList = (props: Props) => {
    function updateOperator(new_operator: Operator): void {
        const new_operators = [];
        for(let old_operator of props.operators) {
            if(old_operator.name === new_operator.name)
                new_operators.push(new_operator);
            else 
                new_operators.push(old_operator);
        }
        props.updateOperators(new_operators, undefined);
    }

    function removeOperator(remove_operator: Operator): void {
        const new_operators = [];
        for(let old_operator of props.operators) {
            if(old_operator.name !== remove_operator.name)
                new_operators.push(old_operator);
        }
        props.updateOperators(new_operators, remove_operator);
    }

    const operator_names = '+-=<>*~:'.split('');
    function getNextOperatorName(): string {
        for(let name of operator_names) {
            if(undefined === props.operators.find(
                    (operator: Operator) => operator.name === name))
                return name;
        }
        return '';
    }

    function addOperator(): void {
        const new_operator_name = getNextOperatorName();
        if(new_operator_name.length === 1) {
            const new_operator = {
                name: new_operator_name,
                rotation: 90,
            } as Operator;
            const new_operators = [... props.operators];
            new_operators.push(new_operator);
            props.updateOperators(new_operators, undefined);
        }
    }
    
    return (<div className="fractal-sidebar-section-edit_container box-shadow">
        <div className = "fractal-sidebar-section-title_text box-shadow">
            OPERATORS
        </div>
        <div className="fractal-sidebar-section-list_container">
            {
                props.operators.map((operator: Operator) => 
                    <OperatorEdit key = {operator.name} 
                        operator={operator} 
                        updateOperator={updateOperator}
                        removeOperator={removeOperator}/>
                )
            }
        </div>
        
        <div className="fractal-sidebar-add-new_button" onClick={(event) => addOperator()}>
            Add Operator
        </div> 
    </div>);
}

export default OperatorEditList;