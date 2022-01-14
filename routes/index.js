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
  res.render("products", {
    sneakers: await sneakerModel.find(),
  });
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

module.exports = router;
