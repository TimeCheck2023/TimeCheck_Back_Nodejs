const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const encryptPass = async(password) =>{
   const hash = await bcrypt.hash(password, 10)
   return hash
}

const macthPass = async(password, savePassword) =>{
    return await bcrypt.compare(password, savePassword)
}

const CreateToken = async(payload) =>{
     //  // creamos el token con jwt con una expiracion, los datos y la palabra secreta
     const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // valido hasta 30
        payload
     }, 'secret')

     return token

}


module.exports = {
    encryptPass,
    macthPass,
    CreateToken
}