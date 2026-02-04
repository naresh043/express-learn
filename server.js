const express = require("express");
const dbConnect = require("./config/db.js");
require("dotenv").config();

const authRoutes = require("./routes/authRouters");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//db coonection
dbConnect();
app.get("/", (req, res) => {
  res.send("this is the naresh ");
});

app.use(`/api/v1/auth`, authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
