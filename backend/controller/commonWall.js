import CommonWallService from '../service/commonWall'

const createPost = async (commonWallDto, req, res) => {
    try {
        await CommonWallService.createPost(commonWallDto, req.body)
        res.send('Successful created post!')
    } catch (err) {
        console.log(err)
        res.status(400).send()
    }
}


const readAllPosts = async (req, res) => {
    try {
        const allPosts = await CommonWallService.readAllPosts()
        res.send({allPosts})
    } catch (err) {
        console.log(err)
        res.status(400).send()
    }
}

const updatePost = async (id, req, res) => {
    try {
        await CommonWallService.updatePost(id, req.body)
        res.send('Successful update!')
    } catch (err) {
        console.log(err)
        res.status(400).send()
    }
}

const deletePost = async (id, req, res) => {
    try {
        await CommonWallService.deletePost(id)
        res.send('Successful deleted!')
    } catch (err) {
        console.log(err)
        res.status(400).send()
    }
}

export default {
    createPost,
    readAllPosts,
    updatePost,
    deletePost
}
  