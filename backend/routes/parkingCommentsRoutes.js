import express from "express";
import parkingCommentsController from '../controller/parkingComments'
import auth from "../middleware/auth";
import config from "../core/config";

const router = express.Router()

// routes for parking comments
router.post('/create/comment/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingCommentsController.createComment(req.params.id, res.locals.user, req, res)
})

router.patch('/update/comment/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingCommentsController.updateComment(req.params.id, req, res)
})

router.delete('/delete/comment/:id', auth([config.ROLES.bookingUserRole]), (req, res) => {
    parkingCommentsController.deleteComment(req.params.id, req, res)
})

export default router