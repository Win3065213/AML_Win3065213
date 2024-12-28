const express = require("express");
const router = express.Router();
const mediaController = require("../Controllers/media_controller");

router.get("/all", mediaController.getAllMedia);
router.post("/search", mediaController.searchMedia);

module.exports = router;