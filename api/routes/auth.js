const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        
        const user = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const { password, ...userInfo } = user._doc;
        res.status(200).json(userInfo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
