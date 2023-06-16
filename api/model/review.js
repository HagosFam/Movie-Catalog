const mongoose = require("mongoose");

const Review = mongoose.Schema({
  review: String,
  rating: Number,
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review
