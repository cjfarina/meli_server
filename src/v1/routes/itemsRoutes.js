// In src/v1/routes/workoutRoutes.js
const express = require("express");
const { searchItems, getItem } = require("../controllers/itemsController");
const router = express.Router();

router.get("/", searchItems);

router.get("/:itemId", getItem);

module.exports = router;
