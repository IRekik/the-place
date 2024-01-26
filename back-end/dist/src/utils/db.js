"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Opens a connection to the database
console.log(process.env.PG_USER);
const pool = new pg_1.Pool({
    user: process.env.PG_USER,
    host: 'dpg-cmmvo48cmk4c73e4p880-a.oregon-postgres.render.com',
    database: 'theplace_db',
    password: 'GEBlsrUDAxlqmSCJAOnHXmcPTLpq9pB8',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});
exports.default = pool;
