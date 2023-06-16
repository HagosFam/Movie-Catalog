const router = require("express").Router();
const controllers = require("../controllers")

router
  .route("")                            // if we want to limit the access 
  .post(controllers.createMovieReview) // .post(authConroller.authenticate, controllers.createMovieReview )
  .get(controllers.listMovieReview);

router
  .route("movies/:reviewId")
  .delete(controllers.deleteMovieReview)
  .put(controllers.updateMovieReview);