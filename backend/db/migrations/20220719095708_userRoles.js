
exports.up = function(knex) {
    return knex.schema.createTable('user_roles', (table) => {
        table.integer('user_id').references('id').inTable('users').notNullable();
        table.integer('role_id').references('id').inTable('roles').notNullable();
        table.timestamps(true, true);

        table.primary(['user_id, role_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user_roles");
};
