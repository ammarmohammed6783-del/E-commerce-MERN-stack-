const express = require("express")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")

const app = express();
app.use(express.json())


app.use("/cart", cartRoutes) 

app.use("/api/products", productRoutes);


module.exports = app;