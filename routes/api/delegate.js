const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Delegate = require("../../models/Delegate");

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "contactNo",
      "PLease enter a mobile number with exact 10 characters"
    ).isLength(10)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { delegateType, address, email, firstname, middlename, lastname,
            gender, institution, mmcNo, contactNo, regFees, username,
            password } = req.body;

    try {
      let delegate = await delegate.findOne({ email });
      if (delegate) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Delegate already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      delegate = new Delegate({
        delegateType, 
        address, 
        email, 
        firstname, 
        middlename, 
        lastname,
        gender, 
        institution, 
        mmcNo, 
        contactNo, 
        regFees, 
        username,
        password, 
        avatar
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      delegate.password = await bcrypt.hash(password, salt);
      await delegate.save();

      console.log("delegate : " + delegate.id);
      res.send("delegate route");

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;