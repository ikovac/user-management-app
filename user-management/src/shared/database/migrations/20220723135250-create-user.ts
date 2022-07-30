import { Migration } from '@mikro-orm/migrations';

const ROLES = ['Admin', 'User'];
const TABLE_NAME = 'user';

export class CreateUser extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createUserTable = knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments('id');
      table.enum('role', ROLES);
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
    });

    this.addSql(createUserTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
