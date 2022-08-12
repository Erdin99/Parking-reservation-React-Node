import express from 'express'
import usersController from '../controller/users'
import auth from '../middleware/auth'
import config from '../core/config'
import {validation} from '../middleware/validation'
import {registration} from '../middleware/registration'

const router = express.Router()

// routes for users
router.post('/users/signup', 
    validation, registration, usersController.createUser
)

router.post('/users/login',
    usersController.loginUser
)

router.get('/users', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), (req, res) => {
        res.status(200).json(res.locals.user)
})

router.get('/users/admin', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    res.status(200).send('Admin user successful logged in!')
})

router.get('/users/user', auth([config.ROLES.bookingUserRole]), (req, res) => {
    res.status(200).send('Client user successful logged in!')
})

router.get('/users/info', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), (req, res) => {
    usersController.readUserInfo(res.locals.user, req, res)
})

router.get('/users/info/:id', (req, res) => {
    usersController.readUserInfoById(req.params.id, req, res)
})

router.patch('/update/user', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), (req, res) => {
    usersController.updateUser(res.locals.user, req, res)
})

export default router
