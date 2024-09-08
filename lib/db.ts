import { Pool } from 'pg';

// Create a connection pool to the PostgreSQL database
const vars = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
}
const pool = new Pool({
  connectionString: `postgres://${vars.user}:${vars.password}@localhost:${vars.port}/${vars.database}`,
});

// A function to query the database
export const query = async (text: string, params?: any[]) => {
  console.log(`postgres://${vars.user}:${vars.password}@localhost:${vars.port}/${vars.database}`)
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows; // Returns the rows from the query result
  } finally {
    client.release();
  }
};