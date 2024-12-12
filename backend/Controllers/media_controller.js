const mediaModel = require("../Models/media_model");

exports.searchMedia = async (req, res, next) => {
    try {
        //put all values here
        // possible values: value, isAdvanced, searchBy, mediaTypes, etc.
        const { value, isAdvanced, searchBy, mediaTypes } = req.body
        // console.log(req.body)
        const mediaList = await mediaModel.getMedia(value, isAdvanced, searchBy, mediaTypes);
        // console.log("Controller: ",mediaList);
        res.json(mediaList);
    } catch (error) {
        next(error)
    }
}