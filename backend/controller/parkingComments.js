import ParkingCommentsService from '../service/parkingComments'

const createComment = async (id, parkingCommentDto, req, res) => {
    try {
        await ParkingCommentsService.createComment(id, parkingCommentDto, req.body)
        res.send('Successful created comment!')
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const updateComment = async (id, req, res) => {
    try {
        await ParkingCommentsService.updateComment(id, req.body)
        res.send('Successful updated comment!')
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const deleteComment = async(id, req, res) => {
    try {
        await ParkingCommentsService.deleteComment(id)
        res.send('Successful deleted!')
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

export default {
    createComment,
    updateComment,
    deleteComment
}