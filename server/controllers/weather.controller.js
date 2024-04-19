
exports.generateData =  async (req, res) => {
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
    FROM "public".$5
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
}

