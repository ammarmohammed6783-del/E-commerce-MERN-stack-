const app = require("./src/app")
const mongoose = require("mongoose")

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

mongoose.connect("mongodb+srv://ammar_mohammed:admin123@cluster0.bdipxqy.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log("db is connected");
    })
    .catch(() => {
        console.log("db is not connected");
    })