const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: (process.env.DB_PORT && parseInt(process.env.DB_PORT, 10)) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'ijl',
  pool: {
    min: 10,
    max: 200,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;
