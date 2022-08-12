import express from 'express'
import parkingReservationController from '../controller/parkingReservation'
import auth from '../middleware/auth'
import config from '../core/config'

const router = express.Router()

// routes for parking reservation
router.post('/create/reservation/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.createParkingReservation(req.params.id, res.locals.user, req, res)
})

router.patch('/refuse/reservation/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.refuseReservation(req.params.id, req, res)
})

/* /reservations -> route showing the list of customers who have reserved users parking space */
router.get('/reservations', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.getAllReservationForMyParking(res.locals.user, req, res)
})

/* /refused/reservations -> route showing the refused list of customers who have refused reservation */
router.get('/refused/reservations', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.getAllRefusedReservationForMyParking(res.locals.user, req, res)
})

router.get('/my/reservations', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.getMyReservations(res.locals.user, req, res)
})

router.get('/my/refused/reservations', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.getMyRefusedReservations(res.locals.user, req, res)
})


export default router