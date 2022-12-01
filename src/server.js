import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './router/web'
import initAPIRoute from './router/api'
// import connection from './configs/connectDB'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
console.log(">>> check port: ", port)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup view engine
configViewEngine(app)

// init web router
initWebRoute(app)

// init API router
initAPIRoute(app) 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})