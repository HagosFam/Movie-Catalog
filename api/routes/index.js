const router = require("express").Router();
const controllers = require("../controllers");

// Movies routes
router
  .route("/movies")
  .post(controllers.createMovie)
  .get(controllers.listMovies);

router
  .route("/movies/:id")
  .delete(controllers.deleteMovie)
  .put(controllers.updateMovie);

// Movie reviews routes
router
  .route(`/movies/:movieId/reviews`)
  .post(controllers.createMovieReview)
  .get(controllers.listMovieReview);

router
  .route(`/movies/:movieId/reviews/:reviewId`)
  .delete(controllers.deleteMovieReview)
  .put(controllers.updateMovieReview);

module.exports = router;
