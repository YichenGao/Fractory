import React, {useState} from "react";
import PatternEditorOptions from "./PatternEditorOptions";
import {PatternEditorState} from "./PatternEditor";

import "./PatternEditorSidebar.css"

type Props = {
    editorState: PatternEditorState,
    onEditorStateUpdate: (newEditorState: PatternEditorState) => void,
    optionStatus: boolean[],
}

const PatternEditorSidebar = (props: Props) => {
    
    const [currentEditorState, setCurrentEditorState] = useState(props.editorState);
    
    const onOptionClick = (new_editor_state: PatternEditorState): void => {
        if(!(new_editor_state === currentEditorState)) {
            props.onEditorStateUpdate(new_editor_state);
            setCurrentEditorState(new_editor_state);
        }
    }

    return (<div className="fractal-initial-sidebar_container">
        <PatternEditorOptions
            title='Select Cells'
            hint='Select one or more cells'
            is_selected={props.editorState === PatternEditorState.SELECT_REGULAR}
            done={props.optionStatus[PatternEditorState.SELECT_REGULAR]}
            associated_editor_state={PatternEditorState.SELECT_REGULAR}
            onClick={onOptionClick}/>
        <PatternEditorOptions
            title='Select Start Point'
            hint='Select 1 start point'
            is_selected={props.editorState === PatternEditorState.SELECT_START}
            done={props.optionStatus[PatternEditorState.SELECT_START]}
            associated_editor_state={PatternEditorState.SELECT_START}
            onClick={onOptionClick}/>
        <PatternEditorOptions
            title='Select End Point'
            hint='Select 1 end point'
            is_selected={props.editorState === PatternEditorState.SELECT_END}
            done={props.optionStatus[PatternEditorState.SELECT_END]}
            associated_editor_state={PatternEditorState.SELECT_END}
            onClick={onOptionClick}/>
    </div>)
}

export default PatternEditorSidebar;