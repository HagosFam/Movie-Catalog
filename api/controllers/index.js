const Movie = require("../model/movie");
const Review = require("../model/review");

const createMovie = function (req, res) {
  console.log("request", req.body)
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Movie content can not be empty",
    })
  }

  // Create
  const movie = new Movie({
    name: req.body.name || "Untitled Movie",
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    directors: req.body.directors,
    review: req.body.review,
  });

movie
  .save()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Movie.",
    });
  });
};

const listMovies = function (req, res) {
  let offset = 0;
  let count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  Movie.find()
    .skip(offset)
    .limit(count)
    .then((movies) => {
      console.log("Found movies", movies.length);
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error listing movies");
    });
};
  

const deleteMovie = function (req, res) {
  const movieId = req.params.id;

  Movie.findByIdAndRemove(movieId)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        return res.status(404).send("Movie not found");
      }
      res.status(200).json(deletedMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting movie");
    });
};

const updateMovie = function (req, res) {
  const movieId = req.params.id;
  const { name, genre, releaseYear, directors, reviews } = req.body;

  Movie.findByIdAndUpdate(
    movieId,
    { name, genre, releaseYear, directors, reviews },
    { new: true }
  )
    .then((updatedMovie) => {
      if (!updatedMovie) {
        return res.status(404).send("Movie not found");
      }
      res.status(200).json(updatedMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating movie");
    });
};

const createMovieReview = function (req, res) {
  const { movieId, review, rating, postedDate } = req.body;

  const movieReview = new Review({
    review,
    rating,
    postedDate,
  });

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send("Movie not found");
      }

      movie.reviews.push(movieReview);

      return movie.save();
    })
    .then((updatedMovie) => {
      res.status(200).json(updatedMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating movie review");
    });
};

const listMovieReview = function (req, res) {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send("Movie not found");
      }

      const reviews = movie.reviews;
      res.status(200).json(reviews);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error finding movie");
    });
};

const deleteMovieReview = function (req, res) {
  const movieId = req.params.movieId;
  const reviewId = req.params.reviewId;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send("Movie not found");
      }

      movie.reviews.pull(reviewId);

      return movie.save();
    })
    .then((updatedMovie) => {
      res.status(200).json(updatedMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting movie review");
    });
};

const updateMovieReview = function (req, res) {
  const movieId = req.params.movieId;
  const reviewId = req.params.reviewId;
  const { review, rating, postedDate } = req.body;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send("Movie not found");
      }
      const movieReview = movie.reviews.id(reviewId);
      movieReview.review = review;
      movieReview.rating = rating;
      movieReview.postedDate = postedDate;

      return movie.save();
    })
    .then((updatedMovie) => {
      res.status(200).json(updatedMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating movie review");
    });
};

  

module.exports = {
  createMovie,
  listMovies,
  deleteMovie,
  updateMovie,
  createMovieReview,
  listMovieReview,
  deleteMovieReview,
  updateMovieReview,
};
