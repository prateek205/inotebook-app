const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI),
      console.log("Mongodb is Connect Successfully!!!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
