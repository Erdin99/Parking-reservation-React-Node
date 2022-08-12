import path from 'path'

export default {
  development: {
    client: 'postgresql',
    connection: {
      host : process.env.HOST,
      port : process.env.PORTDATABASE,
      database: process.env.DATABASE,
      user:     process.env.USER,
      password: process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, './migrations'),
      tableName: 'knex_migrations'
    }
  },
  /* // Production
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  */
};
