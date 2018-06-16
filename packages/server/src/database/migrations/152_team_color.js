export async function up(knex) {
  return knex.schema.createTable('team_color', table => {
    table.increments();
    table.string('value').notNull();
    table
      .boolean('primary')
      .defaultTo(false)
      .notNull();
    table
      .integer('team_id')
      .unsigned()
      .references('id')
      .inTable('team')
      .onDelete('CASCADE')
      .withKeyName('FK_team_color_team');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team_hashtag');
}
