import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    //check for token
    if (!token) return res.status(401).json({ msg: "No token , authoriztion denied" })

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(400).json({ msg: "Invalid token" })
    }
}

export default auth