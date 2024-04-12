import pool from '../config/db.connection.js';

const generateData = async (req, res) => {
  try {
    const { state, district, fromYear, toYear, parameter } = req.body;
    const query = `
      SELECT *
      FROM weather_data
      WHERE State = ? AND District = ? AND year_val >= ? AND year_val <= ? AND parameter = ?
    `;
    
    // Execute the query to retrieve data from the database
    const [rows] = await pool.query(query, [state, district, fromYear, toYear, parameter]);
    
    // Send the retrieved data back to the frontend
    res.json({ data: rows });
  } catch (error) {
    console.error('Error generating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default generateData;
