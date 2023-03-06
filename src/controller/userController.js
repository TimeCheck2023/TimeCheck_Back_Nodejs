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
                console.log(responde.recordset);
                res.status(200).json({
                    data: responde.recordset, msg: "registrado"
                })

            }).catch((err) =>{
                console.log(err.message);
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}



module.exports = UserController