import express from 'express'
import commonWallController from '../controller/commonWall'
import auth from '../middleware/auth'
import config from '../core/config'

const router = express.Router()

//routes for posts for common wall
router.post('/create/post', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), (req, res) => {
    commonWallController.createPost(res.locals.user, req, res)
})

router.get('/commonWall/list', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), commonWallController.readAllPosts)

router.patch('/update/post/:id', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), (req, res) => {
    commonWallController.updatePost(req.params.id, req, res)
})

router.delete('/delete/post/:id', auth([config.ROLES.bookingAdminRole, config.ROLES.bookingUserRole]), (req, res) => {
    commonWallController.deletePost(req.params.id, req, res)
})

export default router