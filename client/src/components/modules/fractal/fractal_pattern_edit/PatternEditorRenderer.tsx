import { RouteComponentProps } from "@reach/router";
import React, {useState, useRef, useEffect} from "react";
import * as d3 from 'd3';
import Util from "../../../../constants/Util";
import { PatternEditorState , RectData} from "./PatternEditor";

import "./PatternEditorRenderer.css"
import { Point } from "../../../../constants/Types";

type Props = RouteComponentProps & {
    editorState: PatternEditorState
    rectData: RectData[][]
    onRectClick: (x: number, y: number) => void
    start_point: number[]
    end_point: number[]
    focus_point: Point
    selected_color: number
    selected_shape: string
}

const PatternEditorRenderer = (props: Props) => {
    // console.log("INITIAL RENDERER RERENDER");
    // console.log(props.editorState);
    //const [editorState, setEditorState] = useState[props.editorState];
    // const firstTime = useRef(true);

    const svg_container_ref = useRef(undefined);
    let WIDTH = 800, HEIGHT = WIDTH, C_X = WIDTH/2, C_Y = HEIGHT/2;
    const GRID_SIZE = 10;

    useEffect(() => {

        const svg = d3.select(svg_container_ref.current).select('svg');
        
        const start_hover_graphic = svg.select("#start_hover");
        Util.drawGraphic_d3(start_hover_graphic, 'start', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x00FF00)
        start_hover_graphic.attr('opacity', 0.5);

        const end_hover_graphic = svg.select("#end_hover");
        Util.drawGraphic_d3(end_hover_graphic, 'end', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0xFF0000)
        end_hover_graphic.attr('opacity', 0.5);

        const focus_hover_graphic = svg.select("#focus_hover");
        Util.drawGraphic_d3(focus_hover_graphic, 'focus', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x0000FF)
        focus_hover_graphic.attr('opacity', 0.5);

        const select_hover_graphic = svg.select("#select_hover").append('g');
        Util.drawGraphic_d3(select_hover_graphic, props.selected_shape, WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, props.selected_color)
        select_hover_graphic.attr('opacity', 0.5);
    }, []);

    useEffect(() => {
        const svg = d3.select(svg_container_ref.current).select('svg');
        
        const start_hover_graphic = svg.select("#start_hover");
        const end_hover_graphic = svg.select("#end_hover");
        const focus_hover_graphic = svg.select("#focus_hover");
        svg.select("#select_hover").select('g').remove();
        const select_hover_graphic = svg.select("#select_hover").append('g');
        Util.drawGraphic_d3(select_hover_graphic, props.selected_shape, WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, props.selected_color)
        select_hover_graphic.attr('opacity', 0.5);
        select_hover_graphic.style('visibility', 'hidden');

        function updateVisibliity() {
            switch(props.editorState) {
                case PatternEditorState.SELECT_REGULAR:
                    start_hover_graphic.style('visibility', 'hidden');
                    end_hover_graphic.style('visibility', 'hidden');
                    focus_hover_graphic.style('visibility', 'hidden');
                    select_hover_graphic.style('visibility', 'hidden');
                    break;
                case PatternEditorState.SELECT_START:
                    start_hover_graphic.style('visibility', 'visible');
                    end_hover_graphic.style('visibility', 'hidden');
                    focus_hover_graphic.style('visibility', 'hidden');
                    select_hover_graphic.style('visibility', 'hidden');
                    break;
                case PatternEditorState.SELECT_END:
                    start_hover_graphic.style('visibility', 'hidden');
                    end_hover_graphic.style('visibility', 'visible');
                    focus_hover_graphic.style('visibility', 'hidden');
                    select_hover_graphic.style('visibility', 'hidden');
                    break;
            }
        }

        updateVisibliity();

        const mouseover = (event: MouseEvent) => {
            updateVisibliity();
        }
        svg.on("mouseover", mouseover);

        const mouseout = (event: MouseEvent) => {
            start_hover_graphic.style('visibility', 'hidden');
            end_hover_graphic.style('visibility', 'hidden');
            focus_hover_graphic.style('visibility', 'hidden');
            select_hover_graphic.style('visibility', 'hidden');
        }
        svg.on("mouseout", mouseout);

        const mousemove = (event: MouseEvent) => {
            const step_x = event.offsetX - event.offsetX % (WIDTH/GRID_SIZE), 
            step_y= event.offsetY - event.offsetY % (HEIGHT/GRID_SIZE);
            
            start_hover_graphic.attr('transform', `translate(${step_x},${step_y})`);
            end_hover_graphic.attr('transform', `translate(${step_x},${step_y})`);
            focus_hover_graphic.attr('transform', `translate(${step_x},${step_y})`);
            select_hover_graphic.attr('transform', `translate(${step_x},${step_y})`);

            if(props.editorState === PatternEditorState.SELECT_REGULAR) {
                const x = Math.round(step_x/(WIDTH/GRID_SIZE)), y = Math.round(step_y/(HEIGHT/GRID_SIZE));
                if(props.rectData[x][y].is_selected) {
                    focus_hover_graphic.style('visibility', 'visible');
                    select_hover_graphic.style('visibility', 'hidden');
                } else {
                    focus_hover_graphic.style('visibility', 'hidden');
                    select_hover_graphic.style('visibility', 'visible');
                }
            } else {
                focus_hover_graphic.style('visibility', 'hidden');
                select_hover_graphic.style('visibility', 'hidden');
            }
            
            
        }
        svg.on("mousemove", mousemove);

        return () => {
            svg.on("mouseover", undefined);
            svg.on("mouseout", undefined);
            svg.on("mousemove", undefined);
        }
    }, [props.editorState, props.selected_color, props.selected_shape, props.rectData]);

    useEffect(() => {
        const start_hover_graphic = d3.select(svg_container_ref.current).select('svg').select("#hover");
        Util.drawGraphic_d3(start_hover_graphic, 'start', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x00FF00)
        
        if(props.start_point && props.start_point.length == 2) {
            start_hover_graphic
                .attr('transform', `translate(${props.start_point[0]*WIDTH/GRID_SIZE},${props.start_point[1]*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 0.5);
        } else {
            start_hover_graphic.attr('opacity', 0);
        }
    }, [props.editorState, props.start_point]);

    useEffect(() => {
        const start_graphic = d3.select(svg_container_ref.current).select('svg').select("#start");
        Util.drawGraphic_d3(start_graphic, 'start', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x00FF00)
        
        if(props.start_point && props.start_point.length == 2) {
            start_graphic
                .attr('transform', `translate(${props.start_point[0]*WIDTH/GRID_SIZE},${props.start_point[1]*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 1);
        } else {
            start_graphic.attr('opacity', 0);
        }
    }, [props.start_point]);

    useEffect(() => {
        const end_graphic = d3.select(svg_container_ref.current).select('svg').select("#end");
        Util.drawGraphic_d3(end_graphic, 'end', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0xFF0000)
        
        if(props.end_point && props.end_point.length == 2) {
            end_graphic
                .attr('transform', `translate(${props.end_point[0]*WIDTH/GRID_SIZE},${props.end_point[1]*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 1);
        } else {
            end_graphic.attr('opacity', 0);
        }
    }, [props.end_point]);

    useEffect(() => {
        const focus_graphic = d3.select(svg_container_ref.current).select('svg').select("#focus");
        Util.drawGraphic_d3(focus_graphic, 'focus', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x0000FF)
        
        if(props.focus_point.x && props.focus_point.y && props.editorState === PatternEditorState.SELECT_REGULAR) {
            focus_graphic
                .transition()
                .duration(200)
                .attr('transform', `translate(${props.focus_point.x*WIDTH/GRID_SIZE},${props.focus_point.y*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 1);
        } else {
            focus_graphic.attr('opacity', 0).attr('z');
        }
    }, [props.focus_point, props.editorState]);

    useEffect(() => {
        const svg = d3.select(svg_container_ref.current).select('svg');
        const g = svg.select("#grid");
        for(let i = 0; i < GRID_SIZE; i++) {
            for(let j = 0; j < GRID_SIZE; j++) {
                g.append('rect')
                    .attr('x', i*HEIGHT/GRID_SIZE)
                    .attr('y', j*HEIGHT/GRID_SIZE)
                    .attr('width', WIDTH/GRID_SIZE)
                    .attr('height', HEIGHT/GRID_SIZE)
                    .attr('fill', '#fff')
                    .attr('stroke', '#ddd')
                    .attr('stroke-width', 1)
            }
        }
    }, []);

    useEffect(() => {
        const rect_data: RectData[] = [];
        
        props.rectData.forEach(element => {
            rect_data.push(...element);
        });

        const svg = d3.select(svg_container_ref.current).select('svg');
        const g = svg.select("#rects");

        g.selectAll('g')
            // .transition()
            // .ease(d3.easeLinear)
            // .duration(200)
            // .attr('opacity',0)
            .remove();

        
        for(let data of rect_data) {
            const cell_g = g.append('g');
            if(data.is_selected) {
                Util.drawGraphic_d3(cell_g, data.point.shape, WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, data.point.color);
            cell_g
                .attr('transform', `translate(${data.point.x*WIDTH/GRID_SIZE},${data.point.y*HEIGHT/GRID_SIZE})`)
            }
                // .attr('opacity', 0)
                // .transition()
                // .ease(d3.easeLinear)
                // .duration(200)
                // .attr('opacity',1);
        }

        const click = (event: MouseEvent, data:RectData) => {
            const rect_x = Math.floor(event.offsetX/(WIDTH/GRID_SIZE)), rect_y = Math.floor(event.offsetY/(HEIGHT/GRID_SIZE));
            props.onRectClick(rect_x, rect_y);
        }
            
        svg.on("click", click);

        return () => {
            svg.on("click", undefined);
        }
    });

    return (
            <div ref={svg_container_ref} className="create-initial-svg_container">
                <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
                    <g id="grid"></g>
                    <g id="rects"></g>
                    
                    <g id="end"></g>
                    <g id="start"></g>
                    <g id="focus"></g>
                    <g id="end_hover"></g>
                    <g id="start_hover"></g>
                    <g id="focus_hover"></g>
                    <g id="select_hover"></g>
                </svg>
            </div>
        );
}

export default PatternEditorRenderer;