import dotenv from 'dotenv';
dotenv.config();

export const host = process.env.URI;
export const user = process.env.USER;
export const password = process.env.PASSWORD;
export const database = process.env.DATABASE;
