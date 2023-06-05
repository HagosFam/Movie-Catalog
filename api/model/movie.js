const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: [String],
  releaseYear: Number,
  directors: [String],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
