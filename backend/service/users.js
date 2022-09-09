import UsersDAO from '../db/dao/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookie } from 'express-validator';

const createUsers = async (usersDto) => {
  const { first_name, last_name, username, email, password, role_id } = usersDto;
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(password, salt)
  var hashedPassword = await bcrypt.hash(password, 10)
  UsersDAO.createUsers(first_name, last_name, username, email, hashedPassword, hash, role_id);
}

const loginUser = async (req, res, email, password) => {
  const user = await UsersDAO.findUser(email)
  const role = await UsersDAO.findUserRoleByMail(email)
  const token = jwt.sign({user}, 'token', {expiresIn: '7 days'})
  console.log('token u loginUser -> ', token)
  res.cookie('tokenlogin', token)
  
  if (!user) {
    throw new Error('Unable to login (email)')
  }

  const isMatchRegularPassword = await bcrypt.compare(password, user.password)
  //const isMatchhSaltPassword = await bcrypt.compare(salt_password, user.salt_password)
  
  if (!isMatchRegularPassword) {
    throw new Error('Unable to login (regular password)')
  }

  // if(!isMatchhSaltPassword) {
  //   throw new Error('Unable to login (salt password)')
  // }
  return {user, role, token}
}

const findUserRole = (id) => {
  return UsersDAO.findUserRole(id)
}

const readUserInfo = (usersDto) => {
  return UsersDAO.readUserInfo(usersDto.id)
}

const readUserInfoById = (id) => {
  return UsersDAO.readUserInfo(id)
}

const updateUser =  (usersDto, usersDto1) => {
  const {first_name, last_name} = usersDto1;
  return UsersDAO.updateUser(usersDto.id, first_name, last_name);
} 

const logout = (user, req, res) => {
  user = {first_name: "", last_name: "", username: "", email: "", password: "", role_id: ""}
  const token = jwt.sign(user, 'token', {expiresIn: '0 s'})
  //console.log('token logout->', token)
}

export default{
  createUsers,
  loginUser,
  findUserRole,
  readUserInfo,
  readUserInfoById,
  updateUser,
  logout
} 
