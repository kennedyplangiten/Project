import express from "express";
import mongoose from "mongoose";
import productRoute from "./modules/product.route";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello there, Ed!");
});

mongoose
  .connect(
    "mongodb+srv://kennedyplangiten_db_user:passwordblah@cluster.vbghwoz.mongodb.net/?appName=Cluster"
  )
  .then(() => {
    console.log("Connected Succesfuly!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000!");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
