const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
   type: [String],
   default : [""]
  } ,
  releaseYear: Number,
  directors: {
   type: [String],
   default:[""]
  } ,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
