const UserModel = require('../models/User')
const db = require("../loaders/sequelize")
const Roles = require("../models/Roles")
const Client = require("../models/Client")
const AppError = require("../utils/AppError")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const RolesEnum = require("../enums/Roles")
const Driver = require("../models/Driver");
const Insurance = require("../models/Insurance")
const sendingSmsService = require("./smsService")
const signToken = id => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET)
}

const hashPassword = async function (password) {
    const hashed = await bcrypt.hash(password, 12)
    return hashed
}
class User {
    async login(loginCandidates) {
        if (!loginCandidates.identifier || !loginCandidates.password) return (new AppError("Enter your identifier and password", 400))
        const user = await UserModel.findOne({
            where: {
                username: loginCandidates.identifier
            }
        })

        if (!user || !await bcrypt.compare(loginCandidates.password, user.password)) return (new AppError("Incorrect identifier or password", 401))


        const token = signToken(user.id)

        return {
            user,
            token
        }
    }
    async createUser(data) {
        const identifier = data.identifier
        const name = data.name
        const email = data.email
        const RoleId = 2
        const password = process.env.AUTO_USER_PASSWORD
        const savePassword = await hashPassword(password)
        try {

            const newUser = await UserModel.create({ email, password: savePassword, name, RoleId, username: identifier })
            const newClient = await Client.create({ active: false, UserId: newUser.id })

            const data = {
                PhoneNumber: newUser.PhoneNumber,
                name: newUser.name,
                email: newUser.email,
                RoleId: newUser.RoleId,
                id: newClient.id,
                userId: newClient.UserId,
            }
            return data
        } catch (error) {
            return new AppError(error.message, 400)
        }
    }
    async signUp(data) {
        const password = data.password

        const savePassword = await hashPassword(password)
        // console.log(savePassword);
        const PhoneNumber = data.PhoneNumber
        const blocked = false
        const name = data.name
        const email = data.email
        const username = data.username
        const RoleId = 2

        try {
            const newUser = await UserModel.create({ PhoneNumber, blocked, password: savePassword, name, username, email, RoleId })
            const newClient = await Client.create({ active: true, UserId: newUser.id })


            const token = signToken(newUser.id)

            return {
                PhoneNumber: newUser.PhoneNumber,
                name: newUser.name,
                email: newUser.email,
                RoleId: newUser.RoleId,
                id: newClient.id,
                userId: newClient.UserId,
                token
            }
        } catch (error) {
            console.log(error);
        }
    }
    async findUserByPhoneNumber(phoneNumber) {
        const user = await UserModel.findOne({
            where: {
                PhoneNumber: phoneNumber
            }
        })
        return user
    }
    async getUsers() {
        const users = await UserModel.findAll({ include: { model: Roles } })

        return users
    }

    async createUserAsAdmin(data) {
        const identifier = data.identifier
        const name = data.name
        const email = data.email
        const RoleId = data.roleId
        const role = data.role;
        console.log(role)
        const password = process.env.AUTO_USER_PASSWORD
        console.log(data)
        const savePassword = await hashPassword(password)
        try {
            const newUser = await UserModel.create({
                // PhoneNumber: identifier,
                username: identifier,
                email,
                password: savePassword,
                name,
                RoleId
            })
            if (role === RolesEnum.Client)
                return await Client.create({ active: false, UserId: newUser.id })
            else if (role == RolesEnum.Driver) {
                let serviceCarType = data.serviceCarType;
                return await Driver.create({
                    UserId: newUser.id,
                    offline: true,
                    service_car_type: serviceCarType,
                    average_rating: 0,
                    rating_count: 0,
                })
            }
            else if (role == RolesEnum.Admin) {
                //await Admin.create({ UserId: newUser.id })
            }
            else if (role === RolesEnum.Insurance) {
                const insuranceCompany = data.insuranceCompany;
                return await Insurance.create({
                    UserId: newUser.id,
                    insuranceCompanyId: insuranceCompany
                })
            }
        } catch (error) {
            console.log(error);
            return new AppError(error.message, 400)
        }
    }

    async resetPassword(data) {
        const { mobile, newPassword } = data;
        let response = await sendingSmsService.verifyOtp(data)
        if (response.message === 'OK') {
            const hashedPassword = await hashPassword(newPassword)
            await UserModel.update({ password: hashedPassword }, { where: { username: mobile } })
            return response
        }
        return response
    }

    async forgetPassword(data) {
        const { identifier } = data;
        const user = await UserModel.findOne({ where: { username: identifier } })
        if (!user) return new AppError("User not found", 404)
        let response = await sendingSmsService.sendOtp(identifier)
        return response
    }
}

const userService = new User()
module.exports = userService
