const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const _ = require('lodash')

exports.signUp = async (req, res) => {
    const { email, username, password } = req.body.data
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const registeredEmail = await User.findOne({ email: email })
    const registeredUsername = await User.findOne({ username: username })
    const registeredBoth = registeredEmail && registeredUsername

    try {
        if (registeredBoth) {
            return res.json({
                success: false,
                message: 'E-mail and Username already exists',
            })
        } 

        if (registeredEmail) {
            return res.json({
                success: false,
                message: 'E-mail already exists',
            })
        } 

        if (registeredUsername) {
            return res.json({
                success: false,
                message: 'Username already exists',
            })
        }
        
        else {
            const user = new User({
                email: email,
                username: username,
                password: hashedPassword,
            })
            const payloadAccess = { id: user._id }
            const accessToken = jwt.sign(payloadAccess, process.env.TOKEN_SECRET)

            user.accessToken = accessToken

            await user.save();

            return res.status(200).json({
                success: true,
                message: 'Created a new user',
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(!user) {
            return res.json({
                success: false,
                message: `E-mail doesn't exist`,
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(user && !validPassword) {
            return res.json({
                success: false,
                message: 'Wrong password',
            })
        }

        if (user && validPassword) {
        const payload = { id: user._id, role: user.role, isVerified: user.isVerified }
        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET)
            await User.findByIdAndUpdate(user._id, { accessToken })
            return res.status(200).header('Auth-Token', accessToken).json({
                success: true,
                message: 'Login successful',
                token: accessToken,
        })
        }

    } catch(err) {
        console.log(err)
    }
}

exports.logout = async (req, res) => {
    return res.status(200).json({ 
        success: true,
        message: 'Logged out' 
    })
}

// User data - Get me
// To fetch user information (ID, email, etc) for frontend
// nuxt/auth
exports.getUser = async (req, res) => {
    try {
    const Token = res.req.headers.token
    const nakedToken = Token.split(' ')[1] // Remove Bearer
    const user = jwt.verify(nakedToken, process.env.TOKEN_SECRET)

      const userID = user.id;
      const foundUser = await User.findById(userID);
      if (!foundUser) {
          return res.json({
              success: false,
              message: `User doesn't exist`
          })
      } else {
        res.status(200).json({
            data: foundUser,
          })
      }
    } catch (err) {
        console.log(err)
    }
}