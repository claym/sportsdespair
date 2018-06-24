export async function up(knex) {
  return knex.schema.createTable('standings', table => {
    table.increments();
    table
      .integer('team_id')
      .unsigned()
      .references('id')
      .inTable('team')
      .onDelete('CASCADE')
      .withKeyName('FK_standings_team');
    table
      .integer('win')
      .notNullable()
      .defaultTo(0);
    table
      .integer('loss')
      .notNullable()
      .defaultTo(0);
    table
      .integer('draw')
      .notNullable()
      .defaultTo(0);
    table
      .decimal('pct', 4, 3)
      .notNullable()
      .defaultTo(0);
    table.integer('points').defaultTo(0);
    table
      .integer('points_fielded')
      .notNullable()
      .defaultTo(0);
    table
      .integer('points_allowed')
      .notNullable()
      .defaultTo(0);
    table
      .integer('streak')
      .notNullable()
      .defaultTo(0);
    table
      .integer('last_win')
      .notNullable()
      .defaultTo(0);
    table
      .integer('last_loss')
      .notNullable()
      .defaultTo(0);
    table
      .integer('last_draw')
      .notNullable()
      .defaultTo(0);
    table.integer('league_rank').notNullable();
    table.integer('conference_rank').defaultTo(1);
    table.integer('division_rank').defaultTo(1);
    table
      .decimal('league_back', 4, 1)
      .notNullable()
      .defaultTo(0);
    table.decimal('conference_back', 4, 1).defaultTo(0);
    table.decimal('division_back', 4, 1).defaultTo(0);
    table.date('date').notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team_hashtag');
}
