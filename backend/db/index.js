import knex from 'knex'
import knexfile from './knexfile'

const db = knex(knexfile.development)

//console.log(knexfile.development)

export default db
