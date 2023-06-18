const router = require("express").Router();
const movieControllers = require("../controllers/movie-controller");

// Movies routes
router
  .route("/")
  .post(movieControllers.createMovie)
  .get(movieControllers.listMovies);

router
  .route("/:id")
  .get(movieControllers.getOne)
  .delete(movieControllers.deleteMovie)
  .put(movieControllers.updateMovie);

module.exports = router;
