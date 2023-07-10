const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res, next) => {
  try {
    const foundMovies = await Movie.find();
    res.render("movies/movies.ejs", { foundMovies });
  } catch (error) {
    console.log(err);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const celebsList = await Celebrity.find();
    res.render("movies/new-movie.ejs", { celebsList });
  } catch (error) {
    console.log(err);
  }
});

router.post("/create", async (req, res) => {
  console.log(req.body)
  const data= req.body
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/");
  } catch (error) {
    console.log(err);
    res.render("movies/new-movie.ejs");
  }
});
router.get("/movies/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      console.log(`foundMovie`, foundMovie);

      res.render("movies/movie-details", { foundMovie });
    });
});

module.exports = router;