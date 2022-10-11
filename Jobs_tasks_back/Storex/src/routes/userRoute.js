const express = require("express")
const catchAsync = require("../utils/catchAsync")
const userService = require("../services/userService")
const clientService = require("../services/clientService")
const AppError = require("../utils/AppError")
const auth = require('../middlewares/auth')
const restriction = require('../middlewares/restriction')
const Roles = require("../enums/Roles")
const router = express.Router()

router.post('/login', catchAsync(async (req, res, next) => {
    const loginCandidates = req.body
    const data = await userService.login(loginCandidates)
    if (data.statusCode) {
        res.status(data.statusCode).json({
            msg:data.message
        })
    }   
    res.status(200).json({
        status: "success",
        data
    })
}))

router.post('/createUser', auth, restriction(1, 3, 4), catchAsync(async (req, res, next) => {
    const roleService = require("../services/roleService")
    let role = await roleService.getRole(req.user.RoleId)
    if (!role) return next(new AppError("Role not found", 404))
    console.log(role.name);
    if (Roles.Insurance === role.name) {
        const createdUser = await userService.createUser(req.body)
        if (createdUser.statusCode) return next(new AppError(createdUser.message, createdUser.statusCode))
        res.status(201).json({
            status: "success",
            createdUser
        })
    }
    else if (Roles.Admin === role.name) {
        let newRole = await roleService.getRole(req.body.roleId)
        console.log(newRole.name)
        const createdUser = await userService.createUserAsAdmin({ ...req.body, role: newRole.name })
        if (createdUser.statusCode) return next(new AppError(createdUser.message, createdUser.statusCode))
        res.status(201).json({
            createdUser
        })
    }
}))

router.post('/signup', catchAsync(async (req, res, next) => {
    const newUser = await userService.signUp(req.body)
    if (newUser.statusCode) return next(newUser)
    res.status(201).json({
        status: "success",
        newUser
    })
}))

router.get("/", auth, restriction(1, 3, 4), catchAsync(async (req, res, next) => {

    const users = await userService.getUsers()
    res.status(200).json({
        users
    })
}))

router.patch('/clients/', catchAsync(async (req, res, next) => {

    const updateData = req.body
    const id = req.body.id
    const updateClient = await clientService.updateClient({ id, data: updateData })
    if (updateClient.statusCode) return next(new AppError(updateClient.message, updateClient.statusCode))
    res.status(200).json({
        status: "updated",
        updateClient
    })

}))

router.post('/resetPassword', catchAsync(async (req, res, next) => {
    const data = req.body
    const user = await userService.resetPassword(data)
    if (user.statusCode) return next(new AppError(user.message, user.statusCode))
    res.status(200).json({
        status: "success",
        user
    })
}))

router.post('/forgotPassword', catchAsync(async (req, res, next) => {
    const data = req.body
    const user = await userService.forgetPassword(data)
    if (user.statusCode) return next(new AppError(user.message, user.statusCode))
    res.status(200).json({
        status: "success",
        user
    })
}))


module.exports = router