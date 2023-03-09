const express = require('express')
const UserController = require('../controller/userController')
const {authMiddleware} = require('../middlewares/authMiddleware')
const controller = new UserController();
const router = express.Router()

router.post('/prueba', controller.registerUser)
router.post('/Login', controller.LoginUser)
router.get('/HomePrueba', authMiddleware, (req, res)=>{
    res.status(200).json({ message: "token valido"})
})


module.exports = router;