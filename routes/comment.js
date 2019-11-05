const express = require("express");
const router = express.Router();
const client = require("../api/mongodb");
const ObjectId = require('mongodb').ObjectID;

router.get("/:teacherId", function(req, res){
    const userRoutes = require("./user");
    const auth = userRoutes.auth;
    const name = req.params.teacherId;
    client.connect(async err => {
        const collection = await client.db("decision").collection("teachers");
        const Teacher = await collection.findOne({name: name});
        res.render("comment", {auth: auth, teacher: Teacher});
        client.close();
    });
});

module.exports = router;