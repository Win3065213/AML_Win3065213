const express = require("express");
const router = express.Router();
const memberController = require('../Controllers/member_controller');
const { verifyToken } = require('../middlewares/auth')

router.use(verifyToken("member"));

router.get("/access", memberController.getMemberAccess);

module.exports = router;