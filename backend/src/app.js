const express = require("express")
require("dotenv").config();

const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const authRouter = require("./routes/authRouter")

const app = express();
app.use(express.json())


app.use("/cart", cartRoutes) 

app.use("/api/products", productRoutes);

app.use("/auth", authRouter)


module.exports = app;