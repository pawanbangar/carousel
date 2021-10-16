const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

const PgDelegate = require("../../models/PgDelegate");

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
      let pgDelegate = await pgDelegate.findOne({ email });
      if (pgDelegate) {
        return res
          .status(400)
          .json({ errors: [{ msg: "PG Delegate already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      pgDelegate = new PgDelegate({
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
      pgDelegate.password = await bcrypt.hash(password, salt);
      await pgDelegate.save();

      console.log("pgDelegate : " + pgDelegate.id);
      res.send("pg Delegate route");

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;