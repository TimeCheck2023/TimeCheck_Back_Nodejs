const express = require('express')
const UserController = require('../controller/userController')
const controller = new UserController();
const router = express.Router()

router.post('/prueba', controller.registerUser)
router.post('/Login', controller.LoginUser)


module.exports = router;