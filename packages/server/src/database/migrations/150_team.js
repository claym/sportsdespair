export async function up(knex) {
  return knex.schema.createTable('team', table => {
    table.increments();
    table.string('name').notNull();
    table.string('nickname');
    //table.string('image').notNull();
    table.string('slug').notNull();
    table.string('api_id').notNull();
    table.float('latitude');
    table.float('longitude');
    table.specificType('location', 'GEOGRAPHY');
    table
      .integer('league_id')
      .unsigned()
      .references('id')
      .inTable('sport')
      .onDelete('CASCADE')
      .withKeyName('FK_team_league')
      .notNull();
    table
      .integer('group_id')
      .unsigned()
      .references('id')
      .inTable('group')
      .onDelete('CASCADE')
      .withKeyName('FK_team_group');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('team');
}
