const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// all routes
const userRouter = require("./api/routes/RouteModel");

app.use("/user", userRouter);

app.use("/", express.static(path.resolve(__dirname, "./dist")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"));
  res.end();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
