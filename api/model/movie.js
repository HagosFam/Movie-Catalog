const mongoose = require("mongoose");
const Review = require("./review");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    default: [""],
  },
  releaseYear: Number,
  directors: {
    type: [String],
    default: [""],
  },
  reviews: {
    type: [Review],
    default:[]
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
