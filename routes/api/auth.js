const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../medicon/middleware/auth");
const adminAuth = require("../../medicon/middleware/admin");
const Admin = require("../../models/Admin");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

// @route GET  api/auth
// @desc        Login user
// @access      Public


//login user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(req.body);
    res.status(500).send("Server Error");
  }
});

router.get("/admin", adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.log(req.body);
    res.status(500).send("Server Error");
  }
});

router.post("/login", 
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min window
    max: 15, // start blocking after 15 requests
    message:
        "Too many attempts, please try again after a minute"
  }),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      }).exec();
      if (!user) {
        res.status(500).send({ error: "Invalid login credentials" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(500).send({ error: "Wrong Password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {}
});
module.exports = router;
