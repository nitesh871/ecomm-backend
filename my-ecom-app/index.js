const express = require("express");
const cors = require('cors')
const session = require('express-session');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/authRoutes")
const userRoutes = require("./Routes/userRoutes")
const productRoutes = require("./Routes/productRoutes")
const cartRoutes = require("./Routes/cartRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const paymentRoutes = require("./Routes/paymentRoutes")

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection is successfull"))
  .catch((err)=>{
    console.log(err)
  })

  app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true,
}))

app.use(session({
    secret: 'N.K shop', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());
app.use("/",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/carts",cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/checkout",paymentRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running!");
});
