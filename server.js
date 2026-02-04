const express = require("express");
const dbConnect=require("./config/db.js")
const dotenv=require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//db coonection
dbConnect()

const authRoutes = require("./routes/authRouters");
app.use(`/api/v1/auth`, authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
