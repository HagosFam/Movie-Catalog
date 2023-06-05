const mongoose = require("mongoose");

const movieReviewSchema = mongoose.Schema({
  review: String,
  rating: Number,
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

const Review  = mongoose.model("Review", movieReviewSchema);
module.exports = Review
