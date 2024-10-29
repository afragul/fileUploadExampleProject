const createError = require("http-errors");
const User = require("../models").User;

const fileMiddleware = async (req, res, next) => {
    try {
        if (!req.files) throw new createError.BadRequest("select file");

        let usedQouta = await User.findOne({ attributes: ["UsedQuota"], where: { id: req.User.id } });
        let newUsage = usedQouta.dataValues.UsedQuota

        for (const file of req.files) {
            newUsage += file.size;

            if (req.User.Role.MaxFileSize * 1024 * 1024 < file.size) throw new createError.BadRequest('file size cannot be larger than 1 mb')

            if (newUsage > (req.User.Role.TotalQuota * 1024 * 1024)) throw new createError.BadRequest("your remaining quota: " + ((req.User.Role.TotalQuota * 1024 * 1024) - req.User.UsedQuota))
        }
        req.newUsage =newUsage;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports={fileMiddleware}