const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

async function createAdmin() {
    await mongoose.connect(process.env.MONGODB_URI);

    const password = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        12
    );

    const existingAdmin = await User.findOne({
        email: process.env.ADMIN_EMAIL
    });

    if (existingAdmin) {
        console.log("Admin already exists");
        process.exit();
    }

    await User.create({
        userName: "superAdmin",
        email: process.env.ADMIN_EMAIL,
        password,
        role: "superAdmin"
    });

    console.log("superAdmin created");

    process.exit();
}

createAdmin();

/*
    this is just for creating the account as a field in the db 
    then this admin account can easily sign in and gets his authentication steps prepared
*/