import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { RouteComponentProps } from "@reach/router";

import './Dtest.css';

type d3testProp = RouteComponentProps & {

}

const Dtest = (props: d3testProp) => {
    const graph_container = useRef(null);
    const width: number = 800;
    const height: number = 800;
    const center_x: number = width/2;
    const center_y: number = height/2;
    const transitionDuration = 1000;
    const [num_circles, setNumCircles] = useState(50);
    const zoomHandler = useRef(undefined);

    function generateNewData(){
        function numToString(num: number): string {
            if(num < 0x10)
                return "0" + num.toString(0x10);
            return num.toString(0x10);
        }
        const data = [];
        for(let i: number = 0; i < num_circles; i++) {
            let r = numToString((Math.floor(Math.random()*256)));
            let g = numToString((Math.floor(Math.random()*256)));
            let b = numToString((Math.floor(Math.random()*256)));
            data.push({
                x: Math.random()*width,
                y: Math.random()*height,
                color: "#" + r+g+b
            });
        };
        return data;
    }

    useEffect(() => {
        //zoom = d3.zoom();
        // const graph = d3
        //     .select(graph_container.current)
        //     .append("svg")
        //     .attr("width", 800)
        //     .attr("height", 800)
        //     .call(zoom.on("zoom", function (event) {
        //         graph.attr("transform", event.transform)
        //      }))
        //      .append("g")
        //     ;
        const selection = d3.select(graph_container.current);

        const svg = selection.append("svg")
            .attr("width", width)
            .attr("height", height);
        
        const g = svg.append("g");
        let zoom = d3.zoom().scaleExtent([0.1,1000]).on("zoom", function (event) {
            g.attr("transform", event.transform)
        })
        zoomHandler.current = zoom;
        
        selection.call(zoom);


        // background
        g.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "white");
        generateNew(g);
        // g
        //     .selectAll('circle')
        //     .data(generateNew())
        //     .join('circle')
        //     .attr('cx', (d) => d.x)
        //     .attr('cy', (d) => d.y)
        //     .attr('fill', (d) => d.color)
        //     .attr('r', 30)
        //     .attr('opacity', 0.5)
        // ;

        // g.append('circle')
        // .attr('cx', center_x)
        // .attr('cy', center_y)
        // .attr('r', 50)
        // .attr('fill', '#69a3b2');
    }, []);

    const resetGraph= (event) => {
        d3.select(graph_container.current)
		.transition()
        .call(zoomHandler.current.transform, d3.zoomIdentity);
    }

    const zoomOut = (event) => {
        d3.select(graph_container.current)
		.transition()
        .call(zoomHandler.current.scaleBy, 0.5, [center_x,center_y]);
    }

    const zoomIn = (event) => {
        d3.select(graph_container.current)
		.transition()
        .call(zoomHandler.current.scaleBy, 2, [center_x,center_y]);
    }

    function generateNew(selection) {
        selection
            .selectAll('circle')
            .data(generateNewData())
            .join(
                function(enter) {
                    return enter
                        .append('circle')
                        .attr('cx', (d) => d.x)
                        .attr('cy', (d) => d.y)
                        .attr('fill', (d) => d.color)
                        .attr('r', 30)
                        .attr('opacity',0);
                  },
                function(update) {
                    return update
                    .transition()
                    .duration(transitionDuration);
                },
                function(exit) {
                    return exit
                    .transition()
                    .duration(transitionDuration)
                    .attr('r', 0)
                    .style('opacity', 0)
                    .on('end', function() {
                        d3.select(this).remove();
                    });
                }
            )
            .transition()
            .duration(transitionDuration)
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('fill', (d) => d.color)
            .attr('r', 30)
            .attr('opacity', 0.5)
            
        ;
    }

    const regenerate = (event) => {
        const g = d3.select(graph_container.current).select("svg g");
        generateNew(g);
    }

    const onCircleInputChange = (event) => {
        setNumCircles(event.target.value
        );
    }

    useEffect(() => {
        const g = d3.select(graph_container.current).select("svg g");
                generateNew(g);
    }, [num_circles]);

    return (
    <div className="dtest-container">
        <div ref = {graph_container} className="dtest-graph-container"></div>
        <div className="dtest-button-container">
            <div className="dtest-button" onClick={resetGraph}>Reset</div>
            <div className="dtest-button" onClick={zoomIn}>Zoom In</div>
            <div className="dtest-button" onClick={zoomOut}>Zoom Out</div>
            <div className="dtest-button" onClick={regenerate}>Generate New</div>
            <div className="dtest-button">
                <input type="number" min="0" max = "20000" value = {num_circles} required placeholder="0-200" step = "20" onChange={onCircleInputChange}/>
            </div>
        </div>
    </div>);
}

export default Dtest;