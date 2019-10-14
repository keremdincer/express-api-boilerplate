const uuid = require('uuid/v4')
const { applySalt } = require('../../utilities/database')

exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex('users').del()
    .then(() => knex('users').insert([
      {
        id: uuid(),
        email: 'john.doe@joker.com',
        name: 'John',
        surname: 'Doe',
        ...applySalt('john_pass')
      },
      {
        id: uuid(),
        email: 'jane.doe@joker.com',
        name: 'Jane',
        surname: 'Doe',
        ...applySalt('jane_pass')
      },
      {
        id: uuid(),
        email: 'mark.doe@joker.com',
        name: 'Mark',
        surname: 'Doe',
        ...applySalt('mark_pass')
      }
    ]))
