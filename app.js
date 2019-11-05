const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const indexRoutes = require("./routes/index");
const teacherRoutes = require("./routes/teacher");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const addRoutes = require("./routes/add");

app.use("/", indexRoutes);
app.use("/user", userRoutes.userRoutes);
app.use("/add", addRoutes);
app.use("/class", teacherRoutes);
app.use("/class/:classId/teacher", commentRoutes);

let port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Ready on port: "+ port);
});