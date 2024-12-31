const express = require("express");
const router = express.Router();
const sysAdminController = require('../Controllers/sys_admin_controller');
const { verifyToken } = require('../middlewares/auth')

router.use(verifyToken("sys_admin"));

router.get("/access", sysAdminController.getSysAminAccess);

module.exports = router;