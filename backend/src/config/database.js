const mongoose = require("mongoose");
function connectToDB() {
  mongoose.connect(process.env.Mongo_URI).then(() => {
    console.log("DB connectes");
  });
}
module.exports = connectToDB;
