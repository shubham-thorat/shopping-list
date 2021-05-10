import express from 'express'
import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const router = express.Router()
dotenv.config()

//@routes Post  api/users
//@desc  register new user
//@access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please Enter all fields" })
    }
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User Already exists" })
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                })

                //create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => {
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
                            })
                    })
                })
            }
        })
})


export default router