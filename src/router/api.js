import express from "express"
import APIController from "../controller/APIController"
let router = express.Router()

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers)                     //GET       -> READ data
    router.post('/create-user', APIController.createNewUser)            //POST      -> CREATE data
    router.put('/update-user', APIController.updateUser)                //PUT       -> UPDATE data
    router.delete('/delete-user/:id', APIController.deleteUser)         //DELETE    -> DELETE data

    return app.use('/api/v1', router)
}

export default initAPIRoute