const express = require("express")
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/user', authController.getUser)

module.exports = router;