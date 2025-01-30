// Import modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connection = require("./config/db");
dotenv.config();
const productRouter = require("./routes/productRoutes");

// Middlewares
app.use(express.json());
app.use("/api/products", productRouter);

// Routes
app.get("/", (req, res) => {
  res.status(200).send({ status: true, msg: "API is working" });
});

// Listen server
const port = process.env.PORT || 4500;
app.listen(port, () => {
  connection();
  console.info(`Server is running on port ${process.env.PORT}`);
});
