const express = require("express")
require("dotenv").config();
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const authRouter = require("./routes/authRouter")
const adminRouter = require("./routes/adminRouter")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express();
app.use(express.json())
app.use(cookieParser());



app.use("/auth", authRouter)
app.use("/admins", adminRouter)
app.use("/cart", cartRoutes) 
app.use("/products", productRoutes);

app.use(errorMiddleware)

module.exports = app;

// npx nodemon server.js