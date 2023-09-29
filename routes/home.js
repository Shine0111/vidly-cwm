const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.send("Welcom to Vidly!");
});

module.exports = router;
