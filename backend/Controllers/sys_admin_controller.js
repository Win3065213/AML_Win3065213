const sysAdminModel = require("../Models/sys_admin_model");

//only for testing middleware
exports.getSysAminAccess = async (req, res, next) => {
    try {
        const userInfo = await sysAdminModel.findSysAdmin(req.user.email);
        // see userInfo if success
        res.json(userInfo);
    } catch (error) {
        next(error)
    }
}