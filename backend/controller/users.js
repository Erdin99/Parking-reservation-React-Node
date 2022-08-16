import UsersService from '../service/users'
import UsersDAO from '../db/dao/users'

const createUser = async (req, res) => {
    console.log('usao u createUser u controller users.js')
    try {
      const existEmail = await UsersDAO.findUser(req.body.email)
      const existUsername = await UsersDAO.findUserByUsername(req.body.username)
      if (existEmail) {
        return res.send('Email already exists')
      }
      if (existUsername) {
        return res.send('Username already exists')
      }
      await UsersService.createUsers(req.body)
      
      res.status(201).send('User successful created!')
    } catch (err) {
      console.error(err)
    }
}

const loginUser = async (req, res) => {
  try {
    const user = await UsersService.loginUser(req.body.email, req.body.password)
    
    res.send({ user })
  } catch(err) {
    console.log(err)
    res.status(400).send()
  }
}

const readUserInfo = async (usersDto, req, res) => {
  try {
    const user = await UsersService.readUserInfo(usersDto)

    res.send({ user })
  } catch(err) {
    console.log(err)
    res.status(400).send()
  }
}

const readUserInfoById = async (id, req, res) => {
  try {
    const user = await UsersService.readUserInfoById(id)

    res.send({ user })
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

const updateUser = async (usersDto, req, res) => {
  try {
    const user = await UsersService.updateUser(usersDto, req.body)

    res.send('Successful update!')
  } catch(err) {
    console.log(err)
    res.status(400).send()
  }
}

export default {
  createUser,
  loginUser,
  readUserInfo,
  readUserInfoById,
  updateUser
}
