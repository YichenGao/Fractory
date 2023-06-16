import React, {useState} from "react";
import { PatternEditorState} from "./PatternEditor";
import check_circle from "../../../../images/check_circle.svg"
import "./PatternEditorOptions.css";

type Props = {
    title: string,
    hint: string,
    is_selected: boolean,
    done: boolean,
    associated_editor_state: PatternEditorState,
    onClick: (newEditorState: PatternEditorState) => void,
}

const PatternEditorOptions = (props: Props) => {
    const onClickOption = (event) => {
        props.onClick(props.associated_editor_state);
    }
    return (
    <div 
        className = {`fractal-initial-option_container ${
            props.is_selected ? 'selected' : (props.done ? 'done': '')}`}
        onClick = {onClickOption}>
        <div className="pattern-editor-option-title_container">
            <div className="fractal-initial-option-title">
            {props.title}
            </div>
            <img className={`fractal-initial-option-done_img ${props.done ? 'done-img_visible' : ''}`} src={check_circle}/>
        </div>
        
        <div className="fractal-initial-option-hint">
            {props.hint}
        </div>
    </div>)
}

export default PatternEditorOptions;