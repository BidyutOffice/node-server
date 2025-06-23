require("dotenv").config();
const express = require("express");
const path = require("path");
const moragn = require("morgan");
const cors = require("cors");

const webRoutes = require("./routes/web")

const PORT = process.env.PORT || 3300;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(moragn("dev"));

// client
app.use(webRoutes);

// admin
const adminRoutes = require("./routes/admin");
const usersAPIRoutes = require("./routes/api/users");
const connectDB = require("./config/db");
app.use("/node-admin", adminRoutes);

// API ROUTES
app.use("/api", usersAPIRoutes);

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => { console.log(`server is running on: http://localhost:${PORT}`); });
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1); // Exit the process with failure
    }
}

startServer();