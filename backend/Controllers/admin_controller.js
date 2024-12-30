const adminModel = require("../Models/admin_model");

//only for testing middleware
exports.getAdminAccess = async (req, res, next) => {
    try {
        const userInfo = await adminModel.findAdmin(req.user.email);
        // see userInfo if success
        res.json(userInfo);
    } catch (error) {
        next(error)
    }
}