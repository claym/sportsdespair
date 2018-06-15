export async function up(knex) {
  return knex.schema.createTable('team_hashtag', table => {
    table.increments();
    table.string('value').notNull();
    table
      .boolean('primary')
      .defaultTo(false)
      .notNull();
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team_hashtag');
}
