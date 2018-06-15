export async function up(knex) {
  return knex.schema.createTable('league', table => {
    table.increments();
    table.string('name').notNull();
    table.string('abbr').notNull();
    table.string('image').notNull();
    table.string('slug').notNull();
    table.string('api_id').notNull();
    table
      .integer('sport_id')
      .unsigned()
      .references('id')
      .inTable('sport')
      .onDelete('CASCADE');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('league');
}
