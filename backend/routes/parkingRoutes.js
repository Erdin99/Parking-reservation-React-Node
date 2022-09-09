import express from 'express'
import parkingSpotsController from '../controller/parkingSpots'
import auth from '../middleware/auth'
import config from '../core/config'
import { validUserForUpdate } from '../middleware/validUserForUpdate'
import { validUserForDelete } from '../middleware/validUserForDelete'

const router = express.Router()

// routes for parking spots
router.post('/create/parking', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingSpotsController.createParkingSpot(res.locals.user, req, res)
})

router.get('/lists/parking/:filter', auth([config.ROLES.bookingUserRole]), (req, res) => { 
    parkingSpotsController.readAllParkings(req.params.filter, req, res)
})

router.get('/mylist/parking', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingSpotsController.readMyList(res.locals.user, req, res)
})

router.get('/parking/details/:id', (req, res) => {
    parkingSpotsController.readParkingDetails(req.params.id, req, res)
})

router.patch('/update/parking/:id', auth([config.ROLES.bookingAdminRole]), validUserForUpdate, (req, res) => {
    parkingSpotsController.updateParking(req.params.id, req, res)
})

router.delete('/delete/parking/:id', auth([config.ROLES.bookingAdminRole]), validUserForDelete, (req, res) => {
    parkingSpotsController.deleteParking(req.params.id, req, res)
})

export default router
