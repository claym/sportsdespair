export async function up(knex) {
  return knex.schema.createTable('group', table => {
    table.increments();
    table.string('name').notNull();
    //table.string('slug').notNull();
    table.string('api_id').notNull();
    table
      .integer('parent_id')
      .unsigned()
      .references('id')
      .inTable('group')
      .onDelete('CASCADE')
      .withKeyName('FK_group_parent');
    table
      .integer('league_id')
      .unsigned()
      .references('id')
      .inTable('league')
      .onDelete('CASCADE')
      .withKeyName('FK_group_league');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('group');
}
