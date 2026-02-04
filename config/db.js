const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/", { dbName: "todo" });
    console.log("MongoDb connected successful");
  } catch (error) {
    console.log("failed to connect Mongodb !");
  }
}

module.exports = dbConnect;
