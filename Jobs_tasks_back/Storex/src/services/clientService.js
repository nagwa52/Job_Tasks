const ClientModel = require("../models/Client")
const AppError = require("../utils/AppError")

class Client {
    async updateClient({id,data}) {
        const updatedClient = await ClientModel.update({data},{
            where:{
                id
            }
        })
        if(!updatedClient) return new AppError("something went wrong!",400)
        
        return updatedClient
    }
    async getClientByUserId(id) {
        const client = await ClientModel.findOne({
            where:{
                UserId:id
            }
        })
        if(!client) return new AppError("something went wrong!",400)
        return client
    }
}

const clientService = new Client()

module.exports = clientService