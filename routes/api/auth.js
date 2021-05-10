import express from 'express'
import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import auth from '../../middleware/auth.js'

const router = express.Router()
dotenv.config()

//@routes POST  api/auth
//@desc  authenticate new user
//@access Public
router.post('/', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: "Please Enter all fields" })
    }
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exists" })

            //validating password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Credintials" })
                    else {
                        jwt.sign(
                            { id: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({
                                    token: token,
                                    user: {
                                        id: user._id,
                                        email: user.email,
                                        name: user.name
                                    }
                                })
                            }
                        )
                    }
                })
        })
})


//@routes GET  api/auth/user
//@desc  get user Data
//@access private
router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})


export default router