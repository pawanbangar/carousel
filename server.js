const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const app = express();
app.use(cors());

//connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//defines routes
app.get("/", (req, res) => res.send("API Running"));
app.use("/api/carousel", require("./routes/api/carousel"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server Started"));
