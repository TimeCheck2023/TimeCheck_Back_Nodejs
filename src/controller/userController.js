const verfiRegister = require('../helpers/validateData')
const user_services = require('../services/user_servicie')
const services = new user_services()


class UserController {
    
    async registerUser(req, res) {
        const { error } = verfiRegister.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            })
        }
        try {
            const data = req.body
            const Users = services.createUsers(data)
            Users.then((responde) =>{
                console.log(responde);
                res.status(200).json({
                    data: responde, msg: "registrado"
                })
            }).catch((err) =>{
                 res.status(500).json({
                    status: false, msg: err.message
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = UserController