const router = require("express").Router();
const controllers = require("../controllers/movie-controller");

router
  .route("/") // if we want to limit the access
  .post(controllers.createMovieReview) // .post(authConroller.authenticate, controllers.createMovieReview )
  .get(controllers.listMovieReview);

router
  .route("/:id")
  .delete(controllers.deleteMovieReview)
  .put(controllers.updateMovieReview);

module.exports = router;
