// const { Client } = require('pg');

// // Configuration for your Redshift cluster

// const redshiftConfig = {
//   user: 'awsuser',
//   host: 'redshift-cluster-2.c3jaxtqg6bc5.us-east-1.redshift.amazonaws.com',
//   database: 'dev',
//   password: 'Aryman.12345',
//   port: 5439 // default port for Redshift
// };

// // Create a new client instance
// const client = new Client(redshiftConfig);

// // Connect to the Redshift cluster
// client.connect()
//   .then(() => {
//     console.log('Connected to Redshift cluster');

//     // Run a query
//     const queryText = 'SELECT * FROM "public"."precipitation" WHERE "state" = \'HIMACHAL PRADESH\' AND "distict" = \'KULLU\' AND "year_val" >= 1901 AND "year_val" <= 1902';

//     client.query(queryText, (err, res) => {
//       if (err) {
//         console.error('Error executing query:', err);
//       } else {
//         console.log('Query result:', res.rows);
//       }
//       // Close the client connection
//       client.end();
//     });
//   })
//   .catch(err => console.error('Error connecting to Redshift cluster:', err));

// import { user, host, database, password, port } from "./db_config.js";

const cors = require("cors");
const express = require("express");
const { Client } = require("pg");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Configuration for your Redshift cluster
const redshiftConfig = {
  user: 'awsuser',
  host:'redshift-cluster-2.c3jaxtqg6bc5.us-east-1.redshift.amazonaws.com',
  database:'dev',
  password: 'Aryman.12345',
  port:'5439',
};

// Create a new client instance
const client = new Client(redshiftConfig);

// Connect to the Redshift cluster
client
  .connect()
  .then(() => {
    console.log("Connected to Redshift cluster");
  })
  .catch((err) => console.error("Error connecting to Redshift cluster:", err));

// API endpoint to generate data
app.post("/api/weather/generateData", async (req, res) => {
  try {
    let { state, district, fromYear, toYear, parameter } = req.body;

    // Check if required parameters are present
    if (!state || !district || !fromYear || !toYear || !parameter) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    console.log(state);
    console.log(district);
    console.log(fromYear);
    console.log(toYear);
    console.log(parameter);

    // Convert state and district to uppercase for comparison
    state = state.toUpperCase();
    district = district.toUpperCase();

    
    const queryText = `
    SELECT *
    FROM "public".${parameter}
    WHERE "state"= $1 AND "distict"= $2 AND "year_val">= $3 AND "year_val"<= $4
  `;
    const { rows } = await client.query(queryText, [
      state,
      district,
      fromYear,
      toYear,
    ]);

    // Send the query result back to the frontend
    res.json({ data: rows });
  } catch (error) {
    console.error("Error generating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/api/weather/generateData", async (req, res) => {
//   try {
//     const { state, district, fromYear, toYear, parameter } = req.body;

//     // Check if required parameters are present
//     if (!state || !district || !fromYear || !toYear || !parameter) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }

//     // Run the query with parameters from the request body
//     const queryText = `
//       SELECT *
//       FROM "public"."${parameter}"
//       WHERE "state" = $1 AND "distict" = $2 AND "year_val" >= $3 AND "year_val" <= $4
//     `;
//     const { rows } = await client.query(queryText, [state, district, fromYear, toYear]);
//     console.log(rows);

//     // Send the query result back to the frontend
//     res.json({ data: rows });
//   } catch (error) {
//     console.error("Error generating data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});