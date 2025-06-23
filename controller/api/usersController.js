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
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ success: false, message: "Provide a user Id", })
            }
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found", })
            }
            await user.deleteOne();
            return res.status(200).json({ success: true, message: "user deleted", })

        } catch (e) {
            console.log("Error Deliting Users: " + e.message);
            return res.status(500).json({ message: "Internal Server Error!" })
        }
    },
    show: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id).select("_id name email");
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found", })
            }
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
    edit: async () => {
    }
}