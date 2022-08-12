
exports.up = function(knex) {
    return knex.schema.createTable('parking_reservation', (table) => {
        table.increments('id');
        table.integer('reserved_by_id').references('id').inTable('parking_spots').notNullable();
        table.string('reserved_by_username', 255).notNullable();
        table.string('reserved_by_email', 255).notNullable();
        table.integer('reservation_parking_id').references('id').inTable('users').notNullable();
        table.string('reservation_parking_name', 255).notNullable();
        table.string('reservation_parking_address', 255).notNullable();
        table.string('registration_plates', 255).notNullable();
        table.time('begin_reservation').notNullable();
        table.time('end_reservation').notNullable();
        table.string('code', 255).notNullable();
        table.string('status', 255).notNullable();
        table.integer('reservation_created_by_id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("parking_reservation");
};
