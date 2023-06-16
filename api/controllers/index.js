const Movie = require("../model/movie");
const Review = require("../model/review");

const createMovie = function (req, res) {
  console.log("request", req.body);

  const response = {
    status: 200,
    message: {},
  };

  // Validate request
  if (!req.body) {
    (response.status = 400),
      (response.message = "Request body cannot be empty");
  }

  // Create
  const movie = new Movie({
    name: req.body._name || "Untitled Movie",
    genre: req.body.genre,
    releaseYear: req.body._releaseYear,
    directors: req.body.directors,
    reviews: req.body.reviews
  });

  movie
    .save()
    .then((data) => {
      console.log("Arrived here in the 200");
      if (data) {
        (response.status = 200), (response.message = "Created" + data);
      } else {
        (response.status = 404), (response.message = "Not Created");
      }
    })
    .catch((err) => {
      console.log("Its here", err);
      (response.status = 500),
        (response.message = "Internal server error:" + err);
    })
    .finally(() => {
      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  console.log("get one api get called");
  movieId = req.params.id;
  Movie.findById(movieId)
    .then((foundMovie) => {
      if (foundMovie) {
        res.status(200).send(foundMovie);
      } else {
        res.status(401).send("Movie not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    })
    .finally(() => {});
};

const listMovies = function (req, res) {
  let offset = 0;
  let count = 0;

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
 console.log("arrived on the delete here")
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
  const updateData = {};
  (updateData.name = req.body.name),
    (updateData.genre = req.body.genre),
    (updateData.releaseYear = req.body.releaseYear),
    (updateData.directors = req.body.directors),
    (updateData.reviews = req.body.reviews),
    Movie.findByIdAndUpdate(movieId, updateData, { new: true })
      .then((updatedMovie) => {
        if (!updatedMovie) {
          return res.status(404).send("Movie not found");
        } else {
          console.log("movie updated", updatedMovie);
          res.status(200).json(updatedMovie);
        }
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
  getOne,
  listMovies,
  deleteMovie,
  updateMovie,
  createMovieReview,
  listMovieReview,
  deleteMovieReview,
  updateMovieReview,
};
