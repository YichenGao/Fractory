import * as d3 from "d3";
import { GRID_SIZE, addArray } from "../../constants/Constants";

class D3Drawer {
  cellDeltas: [number, number][];
  endDelta: [number, number];
  numIterations: number;
  svg: any;
  width: number;
  height: number;
  svgCanvas: any;
  bounds: { [key: string]: number };

  constructor(
    cellDeltas: [number, number][],
    endDelta: [number, number],
    numIterations: number,
    svg
  ) {
    this.cellDeltas = cellDeltas;
    this.endDelta = endDelta;
    this.numIterations = numIterations;
    this.svg = svg;
    this.svgCanvas = this.svg.append("g").attr("class", "D3Drawer-svgCanvas");
  }

  renderIteration(n: number, rotateIdx: number, origin: number[]): number[] {
    // rotateIdx = number of quadrants clockwise (3 -> 270 deg CW)
    // origin = where the iteration starts from
    // returns coordinates of end point

    const rotateDelta: [number, number][] = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]; // more translation from rotating about a corner
    let originRotated = addArray(origin, rotateDelta[rotateIdx]);

    if (n === 1) {
      let currentIteration = this.svgCanvas
        .append("g")
        .attr(
          "transform",
          `translate(${originRotated[0]}, ${originRotated[1]}) rotate(${rotateIdx * 90})`
        );
      for (let [dx, dy] of this.cellDeltas) {
        currentIteration
          .append("rect")
          .attr("x", dx)
          .attr("y", dy)
          .attr("width", 1)
          .attr("height", 1)
          .attr("fill", "#ffffff");

        let lowerXCoord: number = origin[0];
        let lowerYCoord: number = origin[1];
        if (rotateIdx === 0) {
          lowerXCoord += dx;
          lowerYCoord += dy;
        } else if (rotateIdx === 1) {
          lowerXCoord -= dy;
          lowerYCoord += dx;
        } else if (rotateIdx === 2) {
          lowerXCoord -= dx;
          lowerYCoord -= dy;
        } else if (rotateIdx === 3) {
          lowerXCoord += dy;
          lowerYCoord -= dx;
        }
        let higherXCoord: number = lowerXCoord + 1;
        let higherYCoord: number = lowerYCoord + 1;
        this.bounds.minX = Math.min(this.bounds.minX, lowerXCoord);
        this.bounds.minY = Math.min(this.bounds.minY, lowerYCoord);
        this.bounds.maxX = Math.max(this.bounds.maxX, higherXCoord);
        this.bounds.maxY = Math.max(this.bounds.maxY, higherYCoord);
      }

      let [x, y] = this.endDelta;
      switch (rotateIdx) {
        case 0:
          return addArray(origin, [x, y]);
        case 1:
          return addArray(origin, [-y, x]);
        case 2:
          return addArray(origin, [-x, -y]);
        case 3:
          return addArray(origin, [y, -x]);
      }
    } else {
      let newOrigin = this.renderIteration(n - 1, rotateIdx, origin);
      return this.renderIteration(n - 1, (rotateIdx + 1) % 4, newOrigin);
    }
  }

  render() {
    this.bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    this.renderIteration(this.numIterations, 0, [0, 0]);
    this.svg.attr(
      "viewBox",
      `${this.bounds.minX} ${this.bounds.minY} ${this.bounds.maxX - this.bounds.minX} ${
        this.bounds.maxY - this.bounds.minY
      }`
    );
  }
}

export default D3Drawer;
