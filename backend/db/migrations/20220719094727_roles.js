
exports.up = function(knex) {
    return knex.schema.createTable('roles', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("roles");
};
