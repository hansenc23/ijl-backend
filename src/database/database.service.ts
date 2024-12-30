import { Injectable } from '@nestjs/common';
import type db from '../drizzle/db';
import { InjectDrizzle } from './database.injector';

export type DrizzleTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

type DrizzleDatabase = typeof db;

type ReadonlyDrizzleDatabase = Pick<DrizzleDatabase, 'select' | 'selectDistinct' | 'query'>;

@Injectable()
export class DatabaseService {
  constructor(@InjectDrizzle() private readonly _drizzle: DrizzleDatabase) {}

  /**
   * For all writes and strongly consistent reads
   *
   * If in doubt, use this.
   */
  get primary(): DrizzleDatabase {
    return this._drizzle;
  }

  /**
   * READ ONLY - updates will fail
   *
   * There will be very a small delay in data being replicated to our read replicas
   * so avoid this when you need cannot tolerate stale data
   *   e.g. a read immediately after a write
   */
  get reader(): ReadonlyDrizzleDatabase {
    return this._drizzle;
  }
}
