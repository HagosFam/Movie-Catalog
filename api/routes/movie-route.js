const router = require("express").Router();
const controllers = require("../controllers");

// Movies routes
router
  .route("/")
  .post(controllers.createMovie)
  .get(controllers.listMovies);

router
  .route("/:id")
  .get(controllers.getOne)
  .delete(controllers.deleteMovie)
  .put(controllers.updateMovie);

  module.exports = router