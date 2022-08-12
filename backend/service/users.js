import UsersDAO from '../db/dao/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createUsers = async (usersDto) => {
  const { first_name, last_name, username, email, password, role_id } = usersDto;
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(password, salt)
  var hashedPassword = await bcrypt.hash(password, 10)
  UsersDAO.createUsers(first_name, last_name, username, email, hashedPassword, hash, role_id);
}

const loginUser = async (email, password) => {
  const user = await UsersDAO.findUser(email)
  const token = jwt.sign({user}, 'token', {expiresIn: '7 days'})

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

  return {user, token}
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

export default{
  createUsers,
  loginUser,
  findUserRole,
  readUserInfo,
  readUserInfoById,
  updateUser,
} 
