const memberModel = require("../Models/member_model");

//only for testing middleware
exports.getMemberAccess = async (req, res, next) => {
    try {
        const userInfo = await memberModel.findMember(req.user.email);
        // see userInfo if success
        res.json(userInfo);
    } catch (error) {
        next(error)
    }
}