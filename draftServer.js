require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3600;
const pageDir = path.join(__dirname, "pages");
const publicDir = path.join(__dirname, "public");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
}

const app = http.createServer((req, res) => {
    const url = req.url;

    let filePath =
        url.startsWith("/public") ? path.join(publicDir, url.replace("/public", "")) :
            path.join(pageDir, url === "/" ? "index.html" : url);

    if (!path.extname(filePath)) {
        filePath += ".html";
    }
    const extention = path.extname(filePath);
    const contentType = mimeTypes[extention] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>404 Not Found</h1>");
            res.end();
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    })

});

app.listen(PORT, () => { console.log(`server is running on: http://localhost:${PORT}`); });
