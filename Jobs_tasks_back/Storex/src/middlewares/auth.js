const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = catchAsync(async function(req,res,next) {
    if(!req.headers.authentication) return next(new AppError("Provide us login token", 400))
    const token = req.headers.authentication.split(' ')[1]
    const data = await jwt.decode(token)
    
    if(!data || !data.id) return next(new AppError("Provide us login again", 403))
    const id = data.id
    req.user = await User.findOne({
        where:{
            id
        }
    })
    next()
})