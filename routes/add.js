const express = require("express");
const router = express.Router();
const client = require("../api/mongodb");

router.get("/class", function(req,res){
    res.render("addClass");
});

router.post("/class", function(req, res){
    const name = req.body.name;
    const teachers = req.body.teachers.split("|");
    client.connect(async err => {
        const collection = await client.db("decision").collection("classes");
        collection.insertOne({name: name, teachers: teachers});
        res.redirect("/add/class");
        client.close();
    }); 
});

router.get("/teacher", function(req,res){
    res.render("addTeacher");
});

router.post("/teacher", function(req, res){
    const name = req.body.name.toLowerCase();
    const score = req.body.score;
    const comments = req.body.comments.split("|");
    client.connect(async err => {
        const collection = await client.db("decision").collection("teachers");
        collection.insertOne({name: name, score: score, comments: comments});
        res.redirect("/add/teacher");
        client.close();
    }); 
});

module.exports = router;