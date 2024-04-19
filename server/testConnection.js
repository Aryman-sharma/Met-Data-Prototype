// testConnection.js

import pool from './config/db_connection.js';
// (async () => {
//   try {
//     // Wait for the pool to connect
//     let val = await pool.connect();
//     console.log(val);

//     // Execute a sample query
//     // const { rows } = await pool.query('SELECT * FROM precipitation');
//     console.log('Successfully connected to the database.');
//     // console.log('Sample query result:', rows);
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   } finally {
//     // Close the connection pool
//     await pool.end();
//   }
// })();

const test = async()=>{
  let val = await pool.connect();
  console.log(val);
}

await test();

