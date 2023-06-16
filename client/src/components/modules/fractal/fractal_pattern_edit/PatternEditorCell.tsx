import React, {useState, useRef, useEffect} from "react";
import { Point } from "../../../../constants/Types";
import * as d3 from 'd3'
import Util from "../../../../constants/Util";

import "./PatternEditorCell.css";
import { PatternEditorState } from "./PatternEditor";
import PatternEditorShapeSelector from "./PatternEditorShapeSelector";

type Props = {
    editorState: PatternEditorState
    focus_point: Point
    updateSelectedColor: (new_color: number) => void
    updateSelectedShape: (new_shape: string) => void
}

const PatternEditorCell = (props: Props) => {
    //const container_ref = useRef(undefined);
    //const shapes = Util.all_shapes;

    // useEffect(() => {
    //     for(let shape of shapes) {
    //         const svg = d3.select(container_ref.current).append('svg');
    //         svg.style('width', `${WIDTH}px`).style('height', `${WIDTH}px`)
    //         Util.drawGraphic_d3(svg, shape, WIDTH, WIDTH, 0x0);
    //         svg.on("click", function(event)  {
    //             props.updateSelectedShape(shape);
    //         });
    //     }
    // }, []);
    
    
    return (<div className={`pattern-editor-cell_container ${props.editorState === PatternEditorState.SELECT_REGULAR ? '' : 'invisible'}`}>
        <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
            Select a selected cell again to remove.
        </div>
        <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
            Selected Color:
        </div>
        <input className="sidebar_input" type='color' 
            value = {Util.colorNumberToString(props.focus_point.color)} 
            onChange = {(event) => props.updateSelectedColor(Util.colorStringToNumber(event.target.value))}/>
        <div className="fractal-sidebar-edit-hint_text hint_text-extra-margin">
            Selected Shape:
        </div>
        <div className="select-shape_container">
            {
                Util.all_shapes.map((shape: string) => 
                    <PatternEditorShapeSelector
                        key={shape}
                        shape={shape}
                        selected={props.focus_point.shape === shape}
                        onClick={props.updateSelectedShape}/>
                )
            }
        </div>
    </div>);
}

export default PatternEditorCell;