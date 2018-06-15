export async function up(knex) {
  return knex.schema.createTable('team', table => {
    table.increments();
    table.string('name').notNull();
    table.string('image').notNull();
    table.string('slug').notNull();
    table.string('api_id').notNull();
    table
      .integer('sport_id')
      .unsigned()
      .references('id')
      .inTable('sport')
      .onDelete('CASCADE')
      .notNull();
    table
      .integer('conference_id')
      .unsigned()
      .references('id')
      .inTable('conference')
      .onDelete('CASCADE');
    table
      .integer('division_id')
      .unsigned()
      .references('id')
      .inTable('division')
      .onDelete('CASCADE');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team');
}
