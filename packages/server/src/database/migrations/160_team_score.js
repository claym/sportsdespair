export async function up(knex) {
  return knex.schema.createTable('team_score', table => {
    table.increments();
    table
      .integer('team_id')
      .unsigned()
      .references('id')
      .inTable('team')
      .onDelete('CASCADE')
      .withKeyName('FK_team_score_team');
    table.decimal('score').notNullable();
    table.date('date').notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team_hashtag');
}
