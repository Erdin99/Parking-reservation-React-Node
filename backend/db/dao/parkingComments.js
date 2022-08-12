import db from '..'

const createComment = async (parking_id, created_comment_by_id, created_comment_by_username, created_comment_by_email, comment, grade) => {
    const createdComment = await db.raw(`INSERT INTO parking_comments 
    (parking_id, created_comment_by_id, created_comment_by_username, created_comment_by_email, comment, grade) 
    VALUES 
    (:parking_id, :created_comment_by_id, :created_comment_by_username, :created_comment_by_email, :comment, :grade)`,
     {parking_id, created_comment_by_id, created_comment_by_username, created_comment_by_email, comment, grade})
    return createComment.rows
}

const readParkingComments = async (id) => {
    const comments = await db.raw(`SELECT comment, grade FROM parking_comments WHERE parking_id = :id`, {id})
    return comments.rows
}

const updateComment = async (id, comment, grade) => {
    await db.raw(`UPDATE parking_comments SET comment = :comment, grade = :grade WHERE id = :id`, {comment, grade, id})
}

const deleteComment = async (id) => {
    await db.raw(`DELETE FROM parking_comments WHERE id = :id`, {id})
}

export default {
    createComment,
    readParkingComments,
    updateComment,
    deleteComment
}