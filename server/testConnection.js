// testConnection.js

import pool from './config/db_connection.js';

(async () => {
  try {
    // Execute a sample query
    const [rows] = await pool.query('SELECT DISTINCT(State) From Precipitation');
    console.log('Successfully connected to the database.');
    console.log('Sample query result:', rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    // Close the connection pool
    await pool.end();
  }
})();
