const RoleModel = require('../models/Roles')
const AppError = require("../utils/AppError")

class Roles {
    async createRole(body) {
        console.log(body);
        if(body.name === null ) return new AppError("Enter the role Name", 400)
        
        const data = await RoleModel.create(body)
        
        return data
    }
    
    async getRoles(){
        const data = await RoleModel.findAll()
        
        return data
    }

    async getRole(roleId){
        const data = await RoleModel.findOne({
            where: {
                id: roleId
            }
        })
        return data
    }
}

const roleService = new Roles()
module.exports = roleService