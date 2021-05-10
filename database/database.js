const mongoose = require("mongoose");

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
const db = () =>
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn);

module.exports = db();
