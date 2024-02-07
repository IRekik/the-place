import knex from "knex";

// Opens a connection to the database using knex

const knexInstance = knex({
  client: "pg",
  connection: {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
    ssl: { rejectUnauthorized: false },
  },
});

export default knexInstance;
