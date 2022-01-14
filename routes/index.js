const express = require("express");
const sneakerModel = require("../models/Sneaker");
const router = express.Router();

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", async (req, res) => {
  let category = req.params.cat
  if (category === "collection"){
    res.render("products",{
      sneakers: await sneakerModel.find()
  })}
  else {
  res.render("products",{
    sneakers: await sneakerModel.find({category : category}),
  }
  )};
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

module.exports = router;
