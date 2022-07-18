


const router = require('express').Router() 

const authController = require('../controller/authController')


router.post('/login' , authController.login)
router.post('/reset_password', authController.reset_password) ; 
router.post('/update_password/:token',authController.update_password );
module.exports = { router}