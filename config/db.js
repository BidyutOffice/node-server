const { connect } = require("mongoose");

async function connectDB() {
    try {
        await connect("mongodb://localhost:27017/node-server");
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;