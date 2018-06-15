export async function up(knex) {
  return knex.schema.createTable('sport', table => {
    table.increments();
    table.string('name').notNull();
    table.string('slug').notNull();
    table.string('image').notNull();
    table.timestamps(false, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('sport');
}
