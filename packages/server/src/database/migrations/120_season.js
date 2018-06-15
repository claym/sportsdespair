export async function up(knex) {
  return knex.schema.createTable('season', table => {
    table.increments();
    table.string('name').notNull();
    table.string('slug').notNull();
    table.date('starts_on').notNull();
    table.date('ends_on').notNull();
    table.string('api_id').notNull();
    table
      .integer('league_id')
      .unsigned()
      .references('id')
      .inTable('league')
      .onDelete('CASCADE')
      .withKeyName('FK_season_league');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('sport');
}
