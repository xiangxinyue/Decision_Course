const express = require("express");
const router = express.Router();
const client = require("../api/mongodb");
const ObjectId = require('mongodb').ObjectID;


router.get("/", function(req,res){
    const userRoutes = require("./user");
    const auth = userRoutes.auth;
    res.render("index", {auth: auth});
});

router.post("/", function(req, res){
    const className = req.body.className.toLowerCase();
    const classNumber = req.body.classNumber;
    const name = className +" "+ classNumber;
    res.redirect("/class/"+name);
});

module.exports = router;