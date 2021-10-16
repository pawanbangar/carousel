const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

// @route GET  api/category
// @desc        Get categories
// @access      Public


//Get categories
router.get(
  "/", (req, res) => {
    try {
        Category.find({}, function(err, categories) {
            var CategoryMap = {};
            categories.forEach(function(user) {
                CategoryMap[user.name] = user.count;
            });
            res.send(CategoryMap);
        });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
