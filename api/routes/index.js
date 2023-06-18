const movieRoutes = require("./movie-route");
const reviewRoutes = require("./review-route");
const router = require("express").Router();
const userRoutes = require("./user-route");

router.use("/movies", movieRoutes);

router.use("/movies/:id/review", reviewRoutes);

router.use("/account", userRoutes);

module.exports = router;
