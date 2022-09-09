
exports.up = function(knex) {
    return knex.schema.createTable('common_wall', (table) => {
        table.increments('id');
        table.integer('created_post_by_id').references('id').inTable('users').notNullable();
        table.string('post', 255).notNullable();
        table.timestamps(true, true);
        table.string('created_post_by_username', 255).notNullable();
        table.string('created_post_by_email', 255).notNullable();
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable("common_wall");
};
