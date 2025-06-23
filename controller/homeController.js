module.exports = {
    index: (req, res) => {
        res.render("index", { pageTitle: "welcome | index" });
    },
    about: (req, res) => {
        res.render("about", { pageTitle: "welcome", cities: ["kolkata", "mumbai", "pune", "bengaluru"] });
    }
}