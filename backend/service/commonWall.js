import CommonWallDao from '../db/dao/commonWall'

const createPost = (postDto, postDto1) => {
    const {post} = postDto1
    return CommonWallDao.createPost(postDto.id, postDto.username, postDto.email, post)
}

const readAllPosts = () => {
    return CommonWallDao.readAllPosts()
}

const updatePost = (id, postDto) => {
    const {post} = postDto
    return CommonWallDao.updatePost(id, post)
}

const deletePost = (id) => {
    return CommonWallDao.deletePost(id)
}

export default {
    createPost,
    readAllPosts,
    updatePost,
    deletePost
}