const express = require('express')
const Celebrity = require("../models/Celebrity.model");
const router = express.Router()


router.get("/", async (req, res, next) => {
  try {
    const allCelebs= await Celebrity.find();
    res.render("celebrities/celebrities.ejs", { allCelebs });
  } catch (error) {
    console.log(err);
  }
});

router.get("/create", (req, res, next) => {
  console.log(req)
  res.render("celebrities/new-celebrity.ejs");
});

router.post("/create", async (req, res, next) => {
  console.log(req.body)
  const data= req.body
  try {
    

    const newCeleb = await Celebrity.create(data)

    console.log(newCeleb)
   // res.redirect(`celebrities/${Celebrity._id}`)
   res.redirect("/");
  } catch (error) {
    console.log(error);
    ;
  }
});

module.exports = router;