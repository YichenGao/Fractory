import React, {useEffect, useRef} from "react";
import * as d3 from 'd3'
import "./PatternEditorCell.css";
import Util from "../../../../constants/Util";

type Props = {
    shape: string
    selected: boolean
    onClick: (shape: string) => void
}

const PatternEditorShapeSelector = (props: Props) => {
    const container_ref = useRef(undefined);
    const WIDTH = 32;

    useEffect(() => {
        const svg = d3.select(container_ref.current).select('svg');
        svg.style('width', `${WIDTH}px`).style('height', `${WIDTH}px`);
        Util.drawGraphic_d3(svg, props.shape, WIDTH, WIDTH, 0x0);
    }, []);

    return (
    <div className={`pattern-editor-cell_button box-shadow ${props.selected ? 'selected' : ''}`}
        ref={container_ref} onClick={(event) => {props.onClick(props.shape);}}>
            <svg>

            </svg>
    </div>);
}

export default PatternEditorShapeSelector;