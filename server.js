import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import Items from './routes/api/items.js'
import Users from './routes/api/Users.js'
import Auth from './routes/api/auth.js'

const app = express()

//to server json files
app.use(express.json({ extended: true, limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(cors())
//config files
dotenv.config()

//connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connect to Mongodb ..')
    })
    .catch(error => {
        console.log(error)
    })

//use routes
app.use('/api/items', Items)
app.use('/api/users', Users)
app.use('/api/auth', Auth)

const __dirname = path.dirname(new URL(import.meta.url).pathname);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
})