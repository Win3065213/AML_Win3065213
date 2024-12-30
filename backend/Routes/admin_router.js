const express = require("express");
const router = express.Router();
const adminController = require('../Controllers/admin_controller');
const { verifyToken } = require('../middlewares/auth')

router.use(verifyToken("admin"));

router.get("/access", adminController.getAdminAccess);

module.exports = router;