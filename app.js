const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const colors = require("colors");

require("dotenv").config();

// MongoDB URI | Special
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}cluster0-zlxgj.mongodb.net/blogApi`;

// Imported Routes
const authRoutes = require("./routes/authRoutes");

// Setting up json parser
app.use(bodyParser.json());

// Serving static files with express
app.use(express.static("public"));

// Setting up api access permissions
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// Setting up routes with some default
app.use("/auth", authRoutes);

// Setting up special error middleware
app.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.send({
    type: "error",
    status: err.status || 500,
    message: err.message,
  });
});

// Setting up connection to MongoDB
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(uri).then(() => {
  const server = app.listen(5000);

  // Setting up connection to Socket.io
  const io = require("./socket")(server);

  app.set("socket.io", io);

  console.log("Sever listening to 5000".blue);
});
