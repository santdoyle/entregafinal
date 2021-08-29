const modelUsers = require('../models/modelUsers')
const Loggers = require('../utils/logsConfig')

const Users = new modelUsers()

class controllerUsers{


    async usuarioPorID(id){
        try {
            const usuario = await Users.getUserByID(id)

            return usuario
        } catch (error) {
            Loggers.logError.error(`Error al buscar usuario por id ${error}`)

        }
        
    }

}

module.exports = controllerUsers