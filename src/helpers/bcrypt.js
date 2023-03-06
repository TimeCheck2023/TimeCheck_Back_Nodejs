const bcrypt = require('bcrypt')

const encryptPass = async(password) =>{
   const hash = await bcrypt.hash(password, 10)
   return hash
}

const macthPass = async(password, savePassword) =>{
    return await bcrypt.compare(password, savePassword)

}


module.exports = {
    encryptPass,
    macthPass
}