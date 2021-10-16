const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Conference=require("../../models/Conference");
const auth = require("../../medicon/middleware/auth");

// @route POST  api/users
// @desc        Register user
// @access      Public


//register user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "mobile",
      "PLease enter a mobile number with exact 10 characters"
    ).isLength(10),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mobile } = req.body;

    try {
      // see if the user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        mobile,
        avatar,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return jsonwebtoken
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route POST  api/users/{org}/register
// @desc        Register For Conference
// @access      Public

router.post('/:org/register',auth,[],async (req,res)=>{
 try{

     const user=await User.findById(req.user.id).select('-password');
     const conferences=user.conferences;
   const conf=await Conference.findById(req.params.org);
   if(conf){
       if(!conferences.includes(conf._id)){
           conferences.push(conf._id);
       }
       user.profile=req.body;
       await user.save();
   }

 }catch(error){
   console.log(error.message);
 }
  res.send(
      'hello World'
  );
})

module.exports = router;
