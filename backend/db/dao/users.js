import db from '..'

const createUsers = async (first_name, last_name, username, email, password, salt_password, role_id) => {
  await db.raw(`
    WITH first_insert AS (
      INSERT INTO users(email, first_name, last_name, username, password, salt_password) 
      VALUES 
      (:email, :first_name, :last_name, :username, :password, :salt_password) 
      RETURNING id
    )
    INSERT INTO user_roles(user_id, role_id) 
    SELECT id, :role_id FROM first_insert;`, 
    {email, first_name, last_name, username, password, salt_password, role_id})
}


const findUser = async (email) => {
  const object = await db.raw(`SELECT * FROM users WHERE email = :email`, {email})
  return object.rows[0]
}

const findUserRole = async (id) => {
  // const object = await db.raw(`SELECT r.name FROM roles r 
  // INNER JOIN user_roles ur ON r.id = ur.role_id 
  // INNER JOIN users u ON ur.user_id = u.id 
  // WHERE u.id = :id`, 
  // {id})
  const object = await db.raw(`SELECT role_id FROM user_roles WHERE user_id = :id`, {id})
  return object.rows[0]
}

const findUserByUsername = async (username) => {
  const object = await db.raw(`SELECT * FROM users WHERE username = :username`, {username})
  return object.rows[0]
}

const readUserInfo = async (id) => {
  const object = await db.raw(`SELECT first_name, last_name, username, email FROM users WHERE id = :id`, {id})
  return object.rows[0]
}

const updateUser = async (id, first_name, last_name) => {
  await db.raw(`UPDATE users SET first_name = :first_name, last_name = :last_name WHERE id = :id`, {first_name, last_name, id})
}

export default {
  createUsers,
  findUser,
  findUserRole,
  findUserByUsername,
  readUserInfo,
  updateUser
}
