
exports.up = function(knex) {
    return knex.schema.createTable('parking_images', (table) => {
        table.increments('id');
        table.integer('parking_id').references('id').inTable('parking_spots').notNullable();
        table.string('image', 255).notNullable();
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("parking_images");
};
