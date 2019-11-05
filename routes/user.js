const express = require("express");
const router = express.Router();
const client = require("../api/mongodb");
const ObjectId = require('mongodb').ObjectID;
let auth = null;

router.get("/signup", function(req,res){
    module.exports = {auth: null}
    res.render("signup", {auth: null});
});

router.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    client.connect(async err => {
        const collection = await client.db("decision").collection("users");
        const exist = await collection.findOne({username: username});
        if (exist) {
            res.redirect("/user/signup");
            client.close();
        } else {
            await collection.insertOne({username: username, password: password});
            auth = username;
            if (auth) {
                module.exports = {auth: auth}
                res.redirect("/");
                client.close();
            };
        };
    });
});

router.get("/signin", function(req,res){
    module.exports = {auth: null}
    res.render("signin", {auth: null});
});

router.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    client.connect(async err => {
        const collection = await client.db("decision").collection("users");
        const exist = await collection.findOne({username: username, password: password});
        if (exist) {
            auth = username;
            module.exports = { auth: auth };
            res.redirect("/");
            client.close();
        } else {
            res.redirect("/user/signin");
            client.close();
        };
    });
});
module.exports = { userRoutes: router } 

