export async function up(knex) {
  return knex.schema.createTable('user_score', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .withKeyName('FK_user_score_user');
    table.decimal('score').notNullable();
    table.date('date').notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team_hashtag');
}
