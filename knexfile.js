const path = require('path')
const BASE_PATH = path.join(__dirname, 'databases')

module.exports = {

  test: {
    client: 'sqlite3',
    connection: { filename: path.join(BASE_PATH, 'test.sqlite') },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    useNullAsDefault: true
  },

  development: {
    client: 'sqlite3',
    connection: { filename: path.join(BASE_PATH, 'dev.sqlite') },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: { filename: path.join(BASE_PATH, 'prod.sqlite') },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    useNullAsDefault: true
  }

};
