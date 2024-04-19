// import dotenv from 'dotenv';
// dotenv.config();

// module.exports = {
//     host: process.env.REDSHIFT_HOST,
//     user: process.env.REDSHIFT_USER,
//     password: process.env.REDSHIFT_PASSWORD,
//     database: process.env.REDSHIFT_DB,
//   };


import dotenv from 'dotenv';
dotenv.config();

export const host = process.env.REDSHIFT_HOST;
export const user = process.env.REDSHIFT_USER;
export const password = process.env.REDSHIFT_PASSWORD;
export const database = process.env.REDSHIFT_DB;
export const port = process.env.REDSHIFT_PORT;
