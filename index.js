const express = require("express"),
  app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require("express-async-errors");

const db = require("./db"),
  postRoute = require("./controllers/posts.controller");

const port = process.env.PORT || 3000;

//   middleware
const allowedOrigin = process.env.FRONTEND;
app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(bodyParser.json());
app.use("/api/posts", postRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong!");
});

db.query("SELECT 1")
  .then((data) => {
    console.log("Success" + data);
    app.listen(port, () => console.log("server started at port 3000"));
  })
  .catch((err) => console.log("connection failed" + err));
