import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'umair',
  password: 'umair',
  database: 'topicsdb',
  port: 5432,
});

export default pool;
