const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
var moment = require("moment");
const Review = require("../models/review");
const user = require("../models/user");
const { json } = require("express");
const fs = require ("fs");

let data = fs.readFileSync("../senanalysis/afinn1.json");

// GET: display all products
router.get("/", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  try {
    const products = await Product.find({})
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.count();

    res.render("shop/index", {
      pageName: "All Products",
      products,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/products/?",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET: search box
router.get("/search", async (req, res) => {
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];

  try {
    const products = await Product.find({
      title: { $regex: req.query.search, $options: "i" },
    })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category")
      .exec();
    const count = await Product.count({
      title: { $regex: req.query.search, $options: "i" },
    });
    res.render("shop/index", {
      pageName: "Search Results",
      products,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/products/search?search=" + req.query.search + "&",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//GET: get a certain category by its slug (this is used for the categories navbar)
router.get("/:slug", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  try {
    const foundCategory = await Category.findOne({ slug: req.params.slug });
    const allProducts = await Product.find({ category: foundCategory.id })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.count({ category: foundCategory.id });

    res.render("shop/index", {
      pageName: foundCategory.title,
      currentCategory: foundCategory,
      products: allProducts,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: req.breadcrumbs,
      home: "/products/" + req.params.slug.toString() + "/?",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

// GET: display a certain product by its id
router.get("/:slug/:id", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  let user ; 
  try {
    const product = await Product.findById(req.params.id).populate("category");
    const dbreview = await Review.find({product:req.params.id}).populate("user");
    let overAllScore = 0;
    let count = 0;
    dbreview.forEach((review , index) => {
      overAllScore += dbreview[index].score;
      count++;
    })
    if(overAllScore !=0){
    overAllScore /= count;
    overAllScore = (Math.round(overAllScore * 100) / 100).toFixed(1); 
    }else{
      overAllScore = "0.0";
    }
    res.render("shop/product", {
      pageName: product.title,
      product,
      successMsg,
      errorMsg,
      dbreview: dbreview ? dbreview : false ,
      moment: moment,
      user: req.user ? req.user : false , 
      overAllScore,
      count,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.post("/:slug/:id", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];

  try {
    // the logic for the review score
    let afinn = JSON.parse(data);
    let afinnKeys = Object.keys(afinn);
    let reviewArr = req.body.takethis.split(/\s/);
    let acumulativeScore = 0;
    let avgScore = 0;
    var count = 1;
    reviewArr.forEach((word,index) => {
      afinnKeys.forEach((key,index) => {
        if(key == word){
            var score = Number(afinn[word]);
            acumulativeScore += ((score + 5)/2);
            avgScore = acumulativeScore/count++;
        }
    })
}); 


    const rev = await new Review({
      user: req.session.passport.user,
      product: req.params.id,
      reviewBody: req.body.takethis,
      score: avgScore,
    });
    await rev.save();
    res.redirect("back");

  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

module.exports = router;
