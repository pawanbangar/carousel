const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Organization = require("../../models/Organization");
const rateLimit = require("express-rate-limit");
const authOrg=require("../../medicon/middleware/organization");

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("MMC_code_of_org", "MMC code of organisation is required")
      .not()
      .isEmpty(),
    check("name_of_org", "Name of organisation is required").not().isEmpty(),
    check("name_of_secretary", "Name of the Secretary is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "mobile_no_of_secretary",
      "PLease enter a mobile number with exact 10 characters"
    ).isLength(10),
    check("no_of_all_registration").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      lectures,
      MMC_code_of_org,
      mobile_no_of_secretary,
      name_of_org,
      name_of_secretary,
      no_of_all_registration,
      password,
      workshops,
    } = req.body;

    try {
      let organisation = await Organisation.findOne({ email_id });
      if (organisation) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Organisation already exists" }] });
      }

      const avatar = gravatar.url(email_id, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      organisation = new Organization({
        email,
        lectures,
        MMC_code_of_org,
        mobile_no_of_secretary,
        name_of_org,
        name_of_secretary,
        no_of_all_registration,
        password,
        workshops,
        avatar,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      organisation.password = await bcrypt.hash(password, salt);
      await organisation.save();

      console.log("organisation : " + organisation.id);
      res.send("organisation route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.put(
  "/:id",
  [
    check("email", "Please include a valid email").isEmail(),
    check("MMC_code_of_org", "MMC code of organisation is required")
      .not()
      .isEmpty(),
    check("name_of_org", "Name of organisation is required").not().isEmpty(),
    check("name_of_secretary", "Name of the Secretary is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "mobile_no_of_secretary",
      "PLease enter a mobile number with exact 10 characters"
    ).isLength(10),
    check("no_of_all_registration").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      lectures,
      MMC_code_of_org,
      mobile_no_of_secretary,
      name_of_org,
      name_of_secretary,
      no_of_all_registration,
      password,
      workshops,
    } = req.body;

    try {
      let organisation = await Organisation.findByIdAndUpdate(
        req.params.id,
        req.body,
        function (err, updatedOrg) {
          if (err) {
            return res
              .status(400)
              .json({ errors: [{ msg: "Organisation does not exists" }] });
          } else {
            console.log("organisation : " + organisation.id);
            res.send("organisation updated successfully");
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE
// @desc delete the specified organization
// @access private

router.delete("/:id", async (req, res) => {
  try {
    await Organisation.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Something went wrong!" }] });
      } else {
        res.send("organisation deleted successfully");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST
// @desc login route for organization
// @access public

router.post("/login",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min window
    max: 5, // start blocking after 5 requests
    message:
      "Too many attempts, please try again after a minute"
  }),
  async(req, res)=>{
    try
    {
      const {email, password} = req.body;
      const organization = await Organization.findOne({email}).exec();
      if(!organization)
      {
        res.status(500).send({error: "Invalid login credentials"});
      }
      // const isPasswordMatch = await bcrypt.compare(password, organization.password);
      // if(!isPasswordMatch)
      // {
      //   res.status(500).send({error: "Wrong password"});
      // }
      const payload = {
        organization:{
          id: organization.id
        }
      };
      jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 360000}, (err, token)=>{
          if(err)
          {
            throw err;
          }
          res.json({token});
      });

    }
    catch(error)
    {
      res.status(400).send(error);
    }
});

router.get("/",authOrg, async (req, res) => {
    try {
        const org = await Organization.findById(req.org.id).select("-password");
        res.json(org);
    } catch (err) {
        console.log(req.body);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
