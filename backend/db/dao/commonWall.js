import db from '..'

const createPost = async (created_post_by_id, created_post_by_username, post) => {
    const createdPost = await db.raw(`INSERT INTO common_wall (created_post_by_id, post, created_post_by_username) VALUES (:created_post_by_id, :post, :created_post_by_username)`,
    {created_post_by_id, post, created_post_by_username})
    return createdPost.rows[0]
}

const readAllPosts = async () => {
    const allPosts = await db.raw(`SELECT * FROM common_wall`)
    return allPosts.rows
}

const updatePost = async (id, post) => {
    await db.raw(`UPDATE common_wall SET post = :post WHERE id = :id`, {post, id})
}

const deletePost = async (id) => {
    await db.raw(`DELETE FROM common_wall WHERE id = :id`, {id})
}

export default {
    createPost,
    readAllPosts,
    updatePost,
    deletePost
}
