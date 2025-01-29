import { Module, OnModuleInit, Logger, HttpException, HttpStatus, OnApplicationShutdown } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DRIZZLE_ORM_INSTANCE, MYSQL_CLIENT, InjectMysqlPool } from './database.injector';
import db, { poolConnection } from '../drizzle/db';
@Module({
  providers: [
    DatabaseService,
    { provide: DRIZZLE_ORM_INSTANCE, useValue: db },
    { provide: MYSQL_CLIENT, useValue: poolConnection },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(@InjectMysqlPool() private readonly _pool: typeof poolConnection) {}

  async onApplicationShutdown() {
    await this.shutdownDatabase();
  }

  async onModuleInit() {
    await this.verifyConnection();
  }

  private async verifyConnection() {
    this.logger.log('Initialising connection to the database');
    try {
      await this._pool.query('SELECT 1');
    } catch (e) {
      this.logger.error('Failed to connect to the database', e.stack);
      throw new HttpException('Failed to connect to database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async shutdownDatabase() {
    this.logger.debug('Shutting down database connection pool');
    try {
      await this._pool.end();
    } catch (e) {
      this.logger.error('Failed to shutdown database connection', e.stack);
      throw new HttpException('Failed to shutdown database connection', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
