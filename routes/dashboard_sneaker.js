const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag")
const uploader = require("./../config/cloudinary");

router.get("/prod-add", async (req, res) => {
    try{
        const tags = await tagModel.find()
        res.render("products_add.hbs", {tags});
    }
    catch(e){
        console.err(e)
    }
});

router.get("/prod-manage", (req, res) => {
  res.render("products_manage.hbs");
});

router.post("/tag", async (req, res) => {
    const newTag = {...req.body};
 try{
     await tagModel.create(newTag);
    res.redirect("prod-add")
 }
  catch(e) {
      next(e)
  }  
})

router.post("/", uploader.single("picture"), async (req, res, next) => {
  const newSneaker = { ...req.body };

  if (!req.file) newSneaker.picture = undefined;
  else newSneaker.picture = req.file.path;
  try {
    await sneakerModel.create(newSneaker);
    res.redirect("/prod-manage");
  } catch (err) {
      console.log(err)
    next(err);
  }
});

router.post

module.exports = router;
