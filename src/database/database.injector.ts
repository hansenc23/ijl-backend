import { Inject } from '@nestjs/common';

export const MYSQL_CLIENT = 'MYSQL_CLIENT';

export const DRIZZLE_ORM_INSTANCE = 'DRIZZLE_ORM_INSTANCE';

export const InjectDrizzle = () => {
  return Inject(DRIZZLE_ORM_INSTANCE);
};
export const InjectMysqlPool = () => {
  return Inject(MYSQL_CLIENT);
};
