
exports.up = function(knex) {
    return knex.schema.createTable('parking_comments', (table) => {
        table.increments('id');
        table.integer('parking_id').references('id').inTable('parking_spots').notNullable();
        table.integer('created_comment_by_id').notNullable();
        table.string('created_comment_by_username', 255).notNullable();
        table.string('created_comment_by_email', 255).notNullable();
        table.string('comment', 255).notNullable();
        table.integer('grade').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("parking_comments");
};
