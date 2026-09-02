const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"], // enum means the value is restricted to a specific list of allowed values.
        default: "user"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;