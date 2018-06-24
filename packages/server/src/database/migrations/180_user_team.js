export async function up(knex) {
  return knex.schema.createTable('user_team', table => {
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table
      .integer('team_id')
      .unsigned()
      .references('id')
      .inTable('team')
      .onDelete('CASCADE')
      .withKeyName('FK_user_team');
    table.integer('weight');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team_hashtag');
}
