const path = require("path");

module.exports = {

    servePage: (page) => {
        return path.join(__dirname, "..", "views", `${page}.html`);
    }

}