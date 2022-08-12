import ParkingCommentsDao from "../db/dao/parkingComments"

const createComment = async (id, parkingCommentDto, parkingCommentDto1) => {
    const { comment, grade } = parkingCommentDto1
    return ParkingCommentsDao.createComment(id, parkingCommentDto.id, parkingCommentDto.username, parkingCommentDto.email, comment, grade)
}

const readParkingComments = async (id) => {
    return ParkingCommentsDao.readParkingComments(id)
}

const updateComment = async (id, parkingCommentDto1) => {
    const { comment, grade } = parkingCommentDto1
    return ParkingCommentsDao.updateComment(id, comment, grade)
}

const deleteComment = async (id) => {
    return ParkingCommentsDao.deleteComment(id)
}

export default {
    createComment,
    readParkingComments,
    updateComment,
    deleteComment
}