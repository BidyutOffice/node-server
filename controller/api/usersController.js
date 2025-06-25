const User = require("../../model/User");

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.find().select("_id name email");
            return res.status(200).json({
                success: true,
                message: "successfull",
                result: users
            })
        } catch (e) {
            console.log("Error Fetching Users: " + e.message);
            return res.status(500).json({ message: "Internal Server Error!" })
        }
    },
    store: async (req, res) => {
        const { name, email } = req.body;
        try {
            if (!name || !email) {
                return res.status(400).json({ success: false, message: "Please Provide Name & email!" });
            }
            const newUser = await User.create({ name, email });
            return res.status(201).json({ success: true, message: `Welcome ${newUser.name}`, result: { id: newUser._id, name: newUser.name, } });

        } catch (e) {
            console.log("Error storeing User: " + e.message);
            return res.status(500).json({ message: "Internal Server Error!" })
        }
    },
    destroy: async (req, res) => {
        const { user } = req;
        try {
            await user.deleteOne();
            return res.status(200).json({ success: true, message: "user deleted", })

        } catch (e) {
            console.log("Error Deliting Users: " + e.message);
            return res.status(500).json({ message: "Internal Server Error!" })
        }
    },
    show: async (req, res) => {
        const { user } = req
        try {
            return res.status(200).json({
                success: true,
                message: "successfull",
                result: user
            })
        } catch (e) {
            console.log("Error Fetching Users: " + e.message);
            return res.status(500).json({ message: "Internal Server Error!" })
        }
    },
    edit: async (req, res) => {
        const { name } = req.body;
        const { user } = req

        try {
            if (!name) {
                return res.status(400).json({ success: false, message: "please provide a name" });
            }
            const result = await user.updateOne({ name });
            return res.status(200).json({ success: true, message: "user updated" });

        } catch (e) {
            console.log("Error Edit user: " + e.message);
            return res.status(500).json({ message: "Internal Server Error!" })
        }
    }
}