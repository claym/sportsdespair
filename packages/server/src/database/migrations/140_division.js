export async function up(knex) {
  return knex.schema.createTable('division', table => {
    table.increments();
    table.string('name').notNull();
    //table.string('slug').notNull();
    table.string('api_id').notNull();
    table
      .integer('conference_id')
      .unsigned()
      .references('id')
      .inTable('conference')
      .onDelete('CASCADE')
      .withKeyName('FK_division_conference');
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('division');
}
