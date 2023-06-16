import * as d3 from "d3"
import {Graphics} from 'pixi.js'
export default abstract class Util {
    public static colorNumberToString(hex_color: number): string {
        const raw_string = hex_color.toString(0x10);
            return "#" + "0".repeat(6-raw_string.length) + raw_string;
    }
    
    public static colorStringToNumber(color_string: string): number {
        return parseInt(color_string.substring(1), 16);
    }

    // assumes arrays are same length
    // returns new array
    public static arrayOpp(arr_1: number[], arr_2: number[], operation: (a1: number, a2: number) => number) {
        const sum_arr = [];
        for(let i = 0; i < arr_1.length; i++) {
            sum_arr.push(operation(arr_1[i], arr_2[i]));
        }
        return sum_arr;
    }

    static all_shapes: string[] = ['rect', 'circ', 'diam', 'oct', 'ecirN', 'ecirE', 'ecirS', 'ecirW', 'triNW', 'triNE', 'triSE', 'triSW'];

    // draws to 0,0; you will need to transform it yourself
    public static drawGraphic_d3(selection, shape: string, width: number, height: number, color: number) {
        switch(shape) {
            case 'start':
                // const path_start = d3.path();
                // path_start.moveTo(width/2, width/20);
                // path_start.arcTo(width*0.95, width/20, width*0.95, width*0.95, width*0.45);
                // path_start.arcTo(width*0.95, width*0.95, width*0.05, width*0.95, width*0.45);
                // path_start.arcTo(width*0.05, width*0.95, width*0.05, width*0.05, width*0.45);
                // path_start.arcTo(width*0.05, width*0.05, width*0.95, width*0.05, width*0.45);
                // path_start.closePath();
                // selection.append('path')
                //     .attr('d', path_start)
                //     .attr('fill', 'none')
                //     .attr('stroke', Util.colorNumberToString(color))
                //     .attr('stroke-width', width*0.10)
                selection.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width/10.0)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width*9/10)
                .attr('y', 0)
                .attr('width', width/10.0)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width/10.0)
                .attr('y', 0)
                .attr('width', width*8/10)
                .attr('height', height/10.0)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width/10.0)
                .attr('y', width*9/10)
                .attr('width', width*8/10)
                .attr('height', height/10.0)
                .attr('fill', Util.colorNumberToString(color))

                const path_start = d3.path();
                path_start.moveTo(width*0.35, width*0.3);
                path_start.lineTo(width*0.35, width*0.7);
                path_start.lineTo(width*0.7, width*0.5);
                path_start.closePath();
                selection.append('path')
                    .attr('d', path_start)
                    .attr('fill', Util.colorNumberToString(color))
                break;
            case 'end':
                selection.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width/10.0)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width*9/10)
                .attr('y', 0)
                .attr('width', width/10.0)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width/10.0)
                .attr('y', 0)
                .attr('width', width*8/10)
                .attr('height', height/10.0)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width/10.0)
                .attr('y', width*9/10)
                .attr('width', width*8/10)
                .attr('height', height/10.0)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width*0.35)
                .attr('y', width*0.35)
                .attr('width', width*0.3)
                .attr('height', height*0.3)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'focus':
                selection.append('rect')
                .attr('x', -width/10.0)
                .attr('y', 0)
                .attr('width', width/10.0)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', width)
                .attr('y', 0)
                .attr('width', width/10.0)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', -width/10.0)
                .attr('y', -height/10.0)
                .attr('width', 6*width/5.0)
                .attr('height', height/10.0)
                .attr('fill', Util.colorNumberToString(color))

                selection.append('rect')
                .attr('x', -width/10.0)
                .attr('y', height)
                .attr('width', 6*width/5.0)
                .attr('height', height/10.0)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'rect':
                selection.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width)
                .attr('height', height)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'circ':
                selection.append('circle')
                .attr('cx', width/2)
                .attr('cy', width/2)
                .attr('r', width/2)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'diam':
                const path_diam = d3.path();
                path_diam.moveTo(width/2, 0);
                path_diam.lineTo(width, width/2);
                path_diam.lineTo(width/2, width);
                path_diam.lineTo(0, width/2);
                path_diam.closePath();
                selection.append('path')
                .attr('d', path_diam)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'oct':
                const path_oct = d3.path();
                path_oct.moveTo(width*.293, 0);
                path_oct.lineTo(width*.707, 0);
                path_oct.lineTo(width, width*.293);
                path_oct.lineTo(width, width*.707);
                path_oct.lineTo(width*.707, width);
                path_oct.lineTo(width*.293, width);
                path_oct.lineTo(0, width*.707);
                path_oct.lineTo(0, width*.293);
                path_oct.closePath();
                selection.append('path')
                    .attr('d', path_oct)
                    .attr('fill', Util.colorNumberToString(color));
                break;
            case 'ecirN':
                const path_ecirN = d3.path();
                path_ecirN.moveTo(0, width/2);
                path_ecirN.arcTo(0,0, width/2, 0, width/2);
                path_ecirN.arcTo(width,0, width, width/2, width/2);
                path_ecirN.lineTo(width, width);
                path_ecirN.lineTo(0,width);
                path_ecirN.closePath();
                selection.append('path')
                .attr('d', path_ecirN)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'ecirE':
                const path_ecirE = d3.path();
                path_ecirE.moveTo(width/2, 0);
                path_ecirE.arcTo(width,0, width, width/2, width/2);
                path_ecirE.arcTo(width,width, width/2, width, width/2);
                path_ecirE.lineTo(0,width);
                path_ecirE.lineTo(0,0);
                path_ecirE.closePath();
                selection.append('path')
                .attr('d', path_ecirE)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'ecirS':
                const path_ecirS = d3.path();
                path_ecirS.moveTo(width, width/2);
                path_ecirS.arcTo(width, width, width/2, width, width/2);
                path_ecirS.arcTo(0, width, 0,0, width/2);
                path_ecirS.lineTo(0,0);
                path_ecirS.lineTo(width,0);
                path_ecirS.closePath();
                selection.append('path')
                .attr('d', path_ecirS)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'ecirW':
                const path_ecirW = d3.path();
                path_ecirW.moveTo(width/2, width);
                path_ecirW.arcTo(0, width, 0,0, width/2);
                path_ecirW.arcTo(0,0, width/2, 0, width/2);
                path_ecirW.lineTo(width,0);
                path_ecirW.lineTo(width, width);
                path_ecirW.closePath();
                selection.append('path')
                .attr('d', path_ecirW)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'triNW':
                const path_triNW = d3.path();
                path_triNW.moveTo(0,0);
                path_triNW.lineTo(0,width);
                path_triNW.lineTo(width, 0);
                path_triNW.closePath();
                selection.append('path')
                .attr('d', path_triNW)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'triNE':
                const path_triNE = d3.path();
                path_triNE.moveTo(width,0);
                path_triNE.lineTo(0,0);
                path_triNE.lineTo(width, width);
                path_triNE.closePath();
                selection.append('path')
                .attr('d', path_triNE)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'triSE':
                const path_triSE = d3.path();
                path_triSE.moveTo(width,width);
                path_triSE.lineTo(0,width);
                path_triSE.lineTo(width, 0);
                path_triSE.closePath();
                selection.append('path')
                .attr('d', path_triSE)
                .attr('fill', Util.colorNumberToString(color))
                break;
            case 'triSW':
                const path_triSW = d3.path();
                path_triSW.moveTo(0,width);
                path_triSW.lineTo(0,0);
                path_triSW.lineTo(width, width);
                path_triSW.closePath();
                selection.append('path')
                .attr('d', path_triSW)
                .attr('fill', Util.colorNumberToString(color))
                break;
        }
    }

    // rotation is in degrees
    // positive rotation is counterclockswise
    public static rotateXY(xy: number[], rotation:number): number[] {
        const rotation_radians = rotation*Math.PI/180;
        return [xy[0]*Math.cos(rotation_radians) - xy[1]*Math.sin(rotation_radians),
                xy[0]*Math.sin(rotation_radians) + xy[1]*Math.cos(rotation_radians)];
    }

    // x and y denote the center
    // begin fill and end fill yourself
    public static drawGraphic_pixi(graphics: Graphics, 
        shape: string,
        x: number,
        y: number,
        width: number,
        rotation: number,
        ) {
        // before rotation
        // 1 ----- 2
        // |       |
        // |       |
        // 4 ----- 3
        const rot_1 = this.arrayOpp(this.rotateXY([-width/2, width/2], rotation), [x,y], (a1,a2)=>a1+a2);
        const rot_2 = this.arrayOpp(this.rotateXY([width/2, width/2], rotation), [x,y], (a1,a2)=>a1+a2);
        const rot_3 = this.arrayOpp(this.rotateXY([width/2, -width/2], rotation), [x,y], (a1,a2)=>a1+a2);
        const rot_4 = this.arrayOpp(this.rotateXY([-width/2, -width/2], rotation), [x,y], (a1,a2)=>a1+a2);
        const mid_12 = [0.5*(rot_1[0]+rot_2[0]), 0.5*(rot_1[1]+rot_2[1])];
        const mid_23 = [0.5*(rot_2[0]+rot_3[0]), 0.5*(rot_2[1]+rot_3[1])];
        const mid_34 = [0.5*(rot_3[0]+rot_4[0]), 0.5*(rot_3[1]+rot_4[1])];
        const mid_41 = [0.5*(rot_4[0]+rot_1[0]), 0.5*(rot_4[1]+rot_1[1])];
        switch(shape) {
            case 'rect':
                graphics.drawPolygon(rot_1.concat(rot_2, rot_3, rot_4));
                break;
            case 'circ':
                graphics.drawCircle(x,y,width/2);
                break;
            case 'diam':
                graphics.drawPolygon(mid_12.concat(mid_23, mid_34, mid_41));
                break;
            case 'oct':
                const oct_12 = Util.arrayOpp(rot_1, rot_2, (a1,a2) => a1*0.707+a2*0.293);
                const oct_21 = Util.arrayOpp(rot_2, rot_1, (a1,a2) => a1*0.707+a2*0.293);
                const oct_23 = Util.arrayOpp(rot_2, rot_3, (a1,a2) => a1*0.707+a2*0.293);
                const oct_32 = Util.arrayOpp(rot_3, rot_2, (a1,a2) => a1*0.707+a2*0.293);
                const oct_34 = Util.arrayOpp(rot_3, rot_4, (a1,a2) => a1*0.707+a2*0.293);
                const oct_43 = Util.arrayOpp(rot_4, rot_3, (a1,a2) => a1*0.707+a2*0.293);
                const oct_41 = Util.arrayOpp(rot_4, rot_1, (a1,a2) => a1*0.707+a2*0.293);
                const oct_14 = Util.arrayOpp(rot_1, rot_4, (a1,a2) => a1*0.707+a2*0.293);
                graphics.drawPolygon(oct_12.concat(oct_21, oct_23, oct_32, oct_34, oct_43, oct_41, oct_14));
                break;
            case 'ecirN':
                graphics.arc(x,y,width/2,Math.PI*(1+rotation/180), Math.PI*(rotation/180));
                graphics.lineTo(rot_2[0], rot_2[1]);
                graphics.lineTo(rot_1[0], rot_1[1]);
                break;
            case 'ecirE':
                graphics.arc(x,y,width/2,Math.PI*(-0.5+rotation/180), Math.PI*(0.5+rotation/180));
                graphics.lineTo(rot_1[0], rot_1[1]);
                graphics.lineTo(rot_4[0], rot_4[1]);
                break;
            case 'ecirS':
                graphics.arc(x,y,width/2,Math.PI*(rotation/180), Math.PI*(-1+rotation/180));
                graphics.lineTo(rot_4[0], rot_4[1]);
                graphics.lineTo(rot_3[0], rot_3[1]);
                break;
            case 'ecirW':
                graphics.arc(x,y,width/2,Math.PI*(0.5+rotation/180), Math.PI*(-0.5+rotation/180));
                graphics.lineTo(rot_3[0], rot_3[1]);
                graphics.lineTo(rot_2[0], rot_2[1]);
                break;
            case 'triNW':
                graphics.drawPolygon([...rot_4].concat(rot_1, rot_3));
                break;
            case 'triNE':
                graphics.drawPolygon([...rot_3].concat(rot_4, rot_2));
                break;
            case 'triSE':
                graphics.drawPolygon([...rot_2].concat(rot_3, rot_1));
                break;
            case 'triSW':
                graphics.drawPolygon([...rot_1].concat(rot_2, rot_4));
                break;
            
        }
    }
    
}
