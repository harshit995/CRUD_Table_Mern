require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 6010;
const router = require("./Routes/router")
require("./db/conn")


app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});