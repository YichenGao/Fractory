import React, {useState, useRef, useEffect} from "react";
import { Project, Symbol, Operator, Pattern, Point } from "../../../../constants/Types";
import * as d3 from 'd3'

import "./PatternPreviewRenderer.css";
import Util from "../../../../constants/Util";

type PatternPreviewRendererProps = {
    pattern: Pattern;
    onPreviewClick: (pattern: Pattern) => void 
}

const PatternPreviewRenderer = (props: PatternPreviewRendererProps) => {
    const PREVIEW_WIDTH = 120, PREVIEW_HEIGHT = 120, GRID_SIZE = 10;
    const svg_container = useRef(undefined);

    useEffect(() => {
        const svg = d3.select(svg_container.current).select('svg');
        svg.select('g').remove();

        const g = svg.append('g');
        for(let point of props.pattern.points) {
            const cell_g = g.append('g');
            Util.drawGraphic_d3(cell_g, point.shape, PREVIEW_WIDTH/GRID_SIZE, PREVIEW_HEIGHT/GRID_SIZE, point.color);
            cell_g.attr('transform', `translate(${point.x*PREVIEW_WIDTH/GRID_SIZE},${point.y*PREVIEW_HEIGHT/GRID_SIZE})`);
        }

        const end_point = props.pattern.end_position;
        if(end_point.length == 2) {
            const end_g = g.append('g');
            Util.drawGraphic_d3(end_g, 'end', PREVIEW_WIDTH/GRID_SIZE, PREVIEW_HEIGHT/GRID_SIZE, 0xFF0000);
            end_g.attr('transform', `translate(${end_point[0]*PREVIEW_WIDTH/GRID_SIZE},${end_point[1]*PREVIEW_HEIGHT/GRID_SIZE})`);
        }
        
        const start_point = props.pattern.start_position;
        if(start_point.length == 2) {
            const start_g = g.append('g');
            Util.drawGraphic_d3(start_g, 'start', PREVIEW_WIDTH/GRID_SIZE, PREVIEW_HEIGHT/GRID_SIZE, 0x00FF00);
            start_g.attr('transform', `translate(${start_point[0]*PREVIEW_WIDTH/GRID_SIZE},${start_point[1]*PREVIEW_HEIGHT/GRID_SIZE})`);
        }
        
        // d3
        // .selectAll('rect')
        // .data(props.pattern.points)
        // .join(
        //     function(enter) {
                
        //         return enter
        //         .append('rect')
        //         .attr('x', (data_value: Point) => { return data_value.x*PREVIEW_WIDTH/GRID_SIZE})
        //         .attr('y', (data_value: Point) => data_value.y*PREVIEW_HEIGHT/GRID_SIZE)
        //         .attr('width', PREVIEW_WIDTH/GRID_SIZE)
        //         .attr('height', PREVIEW_HEIGHT/GRID_SIZE)
        //         .attr('fill', (data_value: Point) => {
        //             if(data_value.x === props.pattern.start_position[0]
        //                 && data_value.y === props.pattern.start_position[1])
        //                 return '#0f0';
        //             if(data_value.x === props.pattern.end_position[0]
        //                 && data_value.y === props.pattern.end_position[1])
        //                 return '#f00';
        //             return '#000'
        //         });
        //     },
        //     function(update) {
        //         return update
        //         .attr('x', (data_value: Point) => { return data_value.x*PREVIEW_WIDTH/GRID_SIZE})
        //         .attr('y', (data_value: Point) => data_value.y*PREVIEW_HEIGHT/GRID_SIZE)
        //         .attr('width', PREVIEW_WIDTH/GRID_SIZE)
        //         .attr('height', PREVIEW_HEIGHT/GRID_SIZE)
        //         .attr('fill', (data_value: Point) => {
        //             if(data_value.x === props.pattern.start_position[0]
        //                 && data_value.y === props.pattern.start_position[1])
        //                 return '#0f0';
        //             if(data_value.x === props.pattern.end_position[0]
        //                 && data_value.y === props.pattern.end_position[1])
        //                 return '#f00';
        //             return '#000'
        //         });
        //     },
        //     function(exit) {
        //         return exit.remove();
        //     }
        // );
    });

    return (<div ref = {svg_container} className="preview-svg_container box-shadow" 
            onClick={(event) => props.onPreviewClick(props.pattern)}>
        <svg width = {`${PREVIEW_WIDTH}px`} height = {`${PREVIEW_HEIGHT}px`}>
            <g>

            </g>
        </svg>
    </div>);
}

export default PatternPreviewRenderer;