const router = require("express").Router();
const movieRoutes = require("./movie-route");
const reviewRoutes = require("./review-route");

const userRoutes = require("./user-route");
router.use("/movies/:id/review", reviewRoutes);

router.use("/movies", movieRoutes);


router.use("/account", userRoutes);

module.exports = router;
