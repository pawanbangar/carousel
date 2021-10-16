const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//connect to database

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("mongoo connected");
  } catch (err) {
    console.error(err);
    //EXit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
