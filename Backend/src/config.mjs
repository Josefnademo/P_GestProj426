const db_name = "db_unesco";
const db_user = "root";
const db_password = "root";
const db_host = "localhost";
const db_port = 6033;
const db_dialect = "mysql";
const sequelize_log = false;
const port = 3000;
const private_key = "meow";
const dbConfig = {
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_name,
  port: db_port,
};

export default {
  private_key,
  db_name,
  db_user,
  port,
  db_password,
  db_host,
  db_port,
  db_dialect,
  sequelize_log,
  dbConfig,
};
