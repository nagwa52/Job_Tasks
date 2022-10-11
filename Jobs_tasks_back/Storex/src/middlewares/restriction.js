const AppError = require("../utils/AppError")
const restriction = (...roles) => {
    return (req, res, next) => {
        let user = JSON.stringify(req.user)
        user = JSON.parse(user)
        if (!roles.includes(req.user.RoleId)) {
            return next(new AppError('You do not have a permission to preform this action', 403))
        }
        next()
    }
}

module.exports = restriction