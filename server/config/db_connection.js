// db_connection.js

import { user, host, database, password, port } from "./db_config.js";
import pkg from "pg";
const { Client } = pkg;

const redshiftConfig = {
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
};

// Export the connectToRedshift function directly
export async function connectToRedshift() {
  const client = new Client(redshiftConfig);

  try {
    // Connect to the Redshift cluster
    await client.connect();
    console.log("Connected to Redshift cluster");
    // Return the client object for further use
    return client;
  } catch (err) {
    // If connection fails, log the error
    console.error("Error connecting to Redshift cluster:", err);
    // Return null or throw the error depending on your error handling strategy
    throw err;
  }
}
