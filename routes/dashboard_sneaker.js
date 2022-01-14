const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag")
const uploader = require("./../config/cloudinary");
const privateRoute = require("./../middlewares/protectPrivateRoute")

router.get("/prod-add", privateRoute ,async (req, res) => {
    try{
        const tags = await tagModel.find()
        res.render("products_add.hbs", {tags});
    }
    catch(e){
        console.err(e)
    }
});

router.get("/prod-manage", privateRoute, async (req, res, next) => {
try {
  res.render("products_manage.hbs", { sneakers : await sneakerModel.find().populate('tag')});
}
catch(e){
  next(e)
}
});

router.post("/tag", async (req, res) => {
    const newTag = {...req.body};
 try{
     await tagModel.create(newTag);
    res.redirect("/prod-add")
 }
  catch(e) {
      next(e)
  }  
})

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  const newSneaker = { ...req.body };

  if (!req.file) newSneaker.image = undefined;
  else newSneaker.image = req.file.path;
  try {
    await sneakerModel.create(newSneaker);
    res.redirect("/prod-manage");
  } catch (err) {
      console.log(err)
    next(err);
  }
});

router.get("/product-edit/:id", privateRoute, async (req, res, next) => {
  try {
    const tags = await tagModel.find()
    const sneaker = await sneakerModel.findById(req.params.id).populate('tag')
    res.render("product_edit", { sneaker, tags})
  }
  catch(e){
    next(e)
  }
});

router.post("/product-edit/:id", uploader.single("image"), async (req, res, next) => {
  try { 
    const updatedSneaker = {...req.body};
    if (req.file) updatedSneaker.image = req.file.path
    await sneakerModel.findByIdAndUpdate(req.params.id, updatedSneaker);
    console.log(updatedSneaker)
    res.redirect("/prod-manage")
  }
  catch(e){
    next(e)
  }
})

router.get("/product-delete/:id", privateRoute, async (req, res, next) => {
  try {
    await sneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/prod-manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
