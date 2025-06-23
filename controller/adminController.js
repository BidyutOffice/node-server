module.exports = {
    index: (req, res) => { res.json({ success: true, message: "this is admin" }) },
    dashboard: (req, res) => { res.json({ success: true, message: "this is admin dashboard" }) }
}