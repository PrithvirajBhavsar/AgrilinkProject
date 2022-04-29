const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const {default:router} = require("./Routes/router.js");

const app = express();

app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// app.use(express.static('images'))
app.use(('/'), router);

const CONNECTION_URL = "mongodb://localhost:27017/AgriMarket";
const port = 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => console.log(`server started at port ${port}`))
  )
  .catch((error) => {
    console.log(error);
  });

  module.exports = app;
