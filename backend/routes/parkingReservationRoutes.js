import express from 'express'
import parkingReservationController from '../controller/parkingReservation'
import auth from '../middleware/auth'
import config from '../core/config'

const router = express.Router()

// routes for parking reservation
router.post('/create/reservation/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.createParkingReservation(req.params.id, res.locals.user, req, res)
})

/* route for the user if he wants to refuse his reservation*/
router.patch('/refuse/reservation/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.refuseReservation(req.params.id, req, res)
})

/* route for the admin if he wants to refuse users reservation*/
router.patch('/refuse/users/reservation/:id', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.refuseUsersReservation(req.params.id, req, res)
})

/* route for the admin if he wants to finish users reservation*/
router.patch('/finished/reservation/:id', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.finishReservation(req.params.id, req, res)
})

/* /reservations -> route showing the list of customers who have reserved users parking space */
router.get('/reservations/:id', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.getAllReservationForMyParking(req.params.id, req, res)
})

/* /refused/reservations -> route showing the refused list of customers who have refused reservation */
router.get('/refused/reservations/:id', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.getAllRefusedReservationForMyParking(req.params.id, req, res)
})

router.get('/my/reservations', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.getMyReservations(res.locals.user, req, res)
})

router.get('/my/refused/reservations', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingReservationController.getMyRefusedReservations(res.locals.user, req, res)
})

router.get('/search/:code', auth([config.ROLES.bookingAdminRole]), (req, res) => {
    parkingReservationController.getSearchedReservation(req.params.code, req, res)
})


export default router