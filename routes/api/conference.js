const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const adminAuth = require("../../medicon/middleware/admin");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Conference = require("../../models/Conference");

// @route GET
// @desc render conference details
// @access public
router.get("/", async(req, res)=>{
  try{
    let conferences = [];
    conferences = await Conference.find({});
    res.status(200).json({conferences});
}
  catch(err){
    console.log(err);
    res.status(404).send("The requested resorces could not be found");
  }
});
  



// @route POST
// @desc create conference
// @access public
router.post(
  "/",
  adminAuth,
  [
    check("city", "City of conduct of conference is required").not().isEmpty(),
    check("name", "Name of conference is required").not().isEmpty(),
    check("startDate", "Start date of conference is required").not().isEmpty(),
    check("endDate", "End date of conference is required").not().isEmpty(),
    check("confTime", "Time of conduct of conference is required")
      .not()
      .isEmpty(),
    check("country", "Country of conduct of conference is required")
      .not()
      .isEmpty(),
    check("state", "State of conuduct of the conference is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "feesForDelegate",
      "Fees for delegate had to be min Rs.0.00"
    ).isLength({ min: 0 }),
    check(
      "feesForPGDelegate",
      "Fees for  PGdelegate had to be min Rs.0.00"
    ).isLength({ min: 0 }),
    check("feesForFaculty", "Fees for faculty had to be min Rs.0.00").isLength({
      min: 0,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      city,
      state,
      country,
      startDate,
      endDate,
      confTime,
      expectedCreditPoints,
      feesForDelegate,
      feesForPGDelegate,
      feesForFaculty,
      confTheme,
      welcomeLetter,
      allowedAttendees,
      days,
    } = req.body;

    try {
      let conference = await Conference.findOne({ name });
      if (conference) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Conference already exists" }] });
      }

      conference = new Conference({
        name,
        password,
        city,
        state,
        country,
        startDate,
        endDate,
        confTime,
        expectedCreditPoints,
        feesForDelegate,
        feesForPGDelegate,
        feesForFaculty,
        confTheme,
        welcomeLetter,
        allowedAttendees,
        days,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      conference.password = await bcrypt.hash(password, salt);
      await conference.save();

      console.log("conference : " + conference.id);
      res.send("conference create route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT
// @desc update conference
// @access private
router.put(
  "/:id",
  [
    check("city", "City of conduct of conference is required").not().isEmpty(),
    check("name", "Name of conference is required").not().isEmpty(),
    check("startDate", "Start date of conference is required").not().isEmpty(),
    check("endDate", "End date of conference is required").not().isEmpty(),
    check("confTime", "Time of conduct of conference is required")
      .not()
      .isEmpty(),
    check("country", "Country of conduct of conference is required")
      .not()
      .isEmpty(),
    check("state", "State of conuduct of the conference is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "feesForDelegate",
      "Fees for delegate had to be min Rs.0.00"
    ).isLength({ min: 0 }),
    check(
      "feesForPGDelegate",
      "Fees for  PGdelegate had to be min Rs.0.00"
    ).isLength({ min: 0 }),
    check("feesForFees", "Fees for faculty had to be min Rs.0.00").isLength({
      min: 0,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      password,
      city,
      state,
      country,
      startDate,
      endDate,
      confTime,
      expectedCreditPoints,
      feesForDelegate,
      feesForPGDelegate,
      feesForFaculty,
      confTheme,
      welcomeLetter,
      allowedAttendees,
      days,
    } = req.body;

    try {
      //  let conference = await Conference.findByIdAndUpdate({req.id, req.body, function(err, updatedConf){
      //  if (err) {
      //       return res
      //         .status(400)
      //         .json({ errors: [{ msg: "Conference does not exists" }] });
      //     }
      //     else {
      //       console.log("conference : " + conference.id);
      //       res.send("conference updated successfully");
      //     }
      //   }
      // });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE
// @desc delete the specified conference
// @access private

router.delete("/:id", async (req, res) => {
  try {
    await Conference.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Something went wrong!" }] });
      } else {
        res.send("conference deleted successfully");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
