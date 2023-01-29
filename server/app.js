require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 6010;
require("./db/conn")

app.get("/", (req, res) => {
  res.status(200).json("Server Started");
});

app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
