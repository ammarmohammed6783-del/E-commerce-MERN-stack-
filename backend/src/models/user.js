const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"], // enum means the value is restricted to a specific list of allowed values.
        default: "user"
    },

    invitationToken: String,

    invitationExpires: Date,

    isActive: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;