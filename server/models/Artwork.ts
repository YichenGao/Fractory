const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  title: String,
  creator_id: String,
  grid: [[Boolean]],
  startCoords: [Number],
  endCoords: [Number],
  cellDeltas: [[Number]],
  endDelta: [Number],
  numIterations: Number,
});

export interface Artwork extends Document {
  title: string;
  creator_id: string;
  grid: boolean[][];
  startCoords: number[];
  endCoords: number[];
  cellDeltas: [number, number][];
  endDelta: [number, number];
  numIterations: number;
  _id: string;
}

module.exports = mongoose.model("artwork", ArtworkSchema);
