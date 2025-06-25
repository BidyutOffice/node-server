const mongoose = require("mongoose");
const User = require("../model/User");

async function checkUserID(req, res, next) {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "please provide a user id" })
        }
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            return res.status(404).json({ success: false, message: "please provide a valid mongo ID" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        req.user = user;
        next()
    } catch (e) {
        console.log("Error Check User ID: " + e.message);
        return res.status(500).json({ message: "Internal Server Error!" })
    }
}

module.exports = checkUserID