const schemaUsers = require('./schemas/schemaUsers')
const Loggers = require('../utils/logsConfig')

class modelUsers{

    getAll(){

    }

    async getUserByID(id){
        try {
            const user = await schemaUsers.find({'_id': id})

            return user
        } catch (error) {
            Loggers.logError.error(`Error al buscar usuario por ID ${error}`)
        }
        
    }

    setUser(data){}

    deleteUser(id){}

    updateUser(id){}

}

module.exports = modelUsers