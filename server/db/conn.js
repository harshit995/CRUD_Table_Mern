const mongoose = require("mongoose");

const Db = process.env.URL;

mongoose.connect(Db).then(() => console.log("Database connected....")).catch((err) => {
    console.log(error);
  });
