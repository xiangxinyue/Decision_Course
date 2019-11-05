const express = require("express");
const router = express.Router();
const client = require("../api/mongodb");
const ObjectId = require('mongodb').ObjectID;

router.get("/:classId", function(req, res){
    const userRoutes = require("./user");
    const auth = userRoutes.auth;
    const name = req.params.classId;
    client.connect(async err => {
        const collection = await client.db("decision").collection("classes");
        const Class = await collection.findOne({name: name});
        const teachers = Class.teachers;
        res.render("teacher", {auth: auth, teachers: teachers, name: name});
        client.close();
    });
});

module.exports = router;