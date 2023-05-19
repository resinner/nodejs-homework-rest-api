const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Groot:TDRqQVeU1qdxXtWY@node64.tfek1pi.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
