// index.js

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
const app = express();

// Other settings
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes

// Port setting
const port = 3000;
app.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});
