const express = require("express")
require("dotenv").config();

const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const authRouter = require("./routes/authRouter")
const adminRouter = require("./routes/adminRouter")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express();
app.use(express.json())


app.use("/auth", authRouter)
app.use("/admins", adminRouter)
app.use("/cart", cartRoutes) 
app.use("/products", productRoutes);

app.use(errorMiddleware)

module.exports = app;