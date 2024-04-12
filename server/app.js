import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
// import generateData from './controllers/weather.controller';
dotenv.config();

const app = express();

app.use(json());
// app.use(express.json());
app.use(urlencoded({ extended: true }));


const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST','PUT','PATCH','DELETE'],      
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200      
  };
  
app.use(cors(corsOptions));
const pool = createPool({
  host: process.env.URI,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// app.post('/api/weather/generateData',async (req,res)=>{
//    try {
//     const { state, district, fromYear, toYear, parameter } = req.body;
//     const query = `
//       SELECT *
//       FROM weather_data
//       WHERE State = ? AND District = ? AND year_val >= ? AND year_val <= ?
//     `;
    
//     // Execute the query to retrieve data from the database
//     const [rows] = await pool.query(query, [state, district, fromYear, toYear, parameter]);
    
//     // Send the retrieved data back to the frontend
//     res.json({ data: rows });
//    } catch (error) {
//     console.log(error);
//     return error;
//    }
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/weather/generateData', async (req, res) => {
    try {
      const { state, district, fromYear, toYear, parameter } = req.body;
  
      // Check if required parameters are present
      if (!state || !district || !fromYear || !toYear || !parameter) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      // Validate parameters here if necessary
  
      // Construct the SQL query with parameterized values
      const query = `
        SELECT *
        FROM ${parameter}
        WHERE State = ? AND District = ? AND year_val >= ? AND year_val <= ?
      `;
      
      // Execute the query to retrieve data from the database
      const [rows] = await pool.query(query, [state, district, fromYear, toYear,parameter]);
      
      // Send the retrieved data back to the frontend
      res.json({ data: rows });
    } catch (error) {
      console.error('Error generating data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// const router = require("./routes/weather.routes");
// app.use('/api/weather/generateData',router);
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
