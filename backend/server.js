const app = require("./src/app")
const mongoose = require("mongoose")
require("dotenv").config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})


const URI = process.env.MONGODB_URI;
mongoose.connect(URI)
    .then(() => {
        console.log("db is connected");
    })
    .catch(() => {
        console.log("db is not connected");
    })