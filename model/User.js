const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true, min: 6, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: true });

const User = model("User", userSchema);
module.exports = User;