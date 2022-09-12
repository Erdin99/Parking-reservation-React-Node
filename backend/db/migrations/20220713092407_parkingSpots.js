
exports.up = function(knex) {
    return knex.schema.createTable('parking_spots', (table) => {
        table.increments('id');
        table.integer('created_by_id').references('id').inTable('users').notNullable();
        table.string('created_by_username', 255).notNullable();
        table.string('created_by_email', 255).notNullable();
        table.string('parking_name', 255).notNullable();
        table.string('parking_address', 255).notNullable();
        table.integer('number_of_parking_spots').notNullable();
        table.string('basic_informations', 255).notNullable();
        table.float('price').notNullable();
        table.string('parking_image', 255).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("parking_spots");
};
