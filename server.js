// import modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/Users");

const app = express();

app.use(express.urlencoded({ extended: true }));

//parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post(`/add_address`, async function (req, res) {
  const { address, balance } = req.body;

  let userUpdate = new User({
    address: address,
    balance: balance,
  });

  // console.log("gasping here and there");
  userUpdate = await userUpdate.save();

  if (userUpdate)
    return res
      .status(200)
      .json({ status: true, data: userUpdate, message: "user added" });
});

//ini my database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Elprof",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// get port
const port = process.env.PORT || 8000;

// listen to request
app.listen(port, () => {
  console.log(`App is Listening ${port}`);
});
