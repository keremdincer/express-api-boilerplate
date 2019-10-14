exports.up = (knex, Promise) =>
  knex.schema.createTable('users', table => {
    table.uuid('id').primary()
    table.string('email', 256).unique()
    table.string('name', 256)
    table.string('surname', 256)
    table.string('salt')
    table.string('hash')
    table.boolean('is_verified').notNullable().defaultTo(false)
    table.timestamp('created_at', true).notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at', true).notNullable().defaultTo(knex.fn.now())
  })

exports.down = (knex, Promise) => knex.schema.dropTable('users')
