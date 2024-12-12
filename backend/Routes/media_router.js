const express = require("express");
const router = express.Router();
const mediaController = require("../Controllers/media_controller");

router.post("/search", mediaController.searchMedia);

module.exports = router;