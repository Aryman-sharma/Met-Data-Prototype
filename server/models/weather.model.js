const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

// Import the Redshift database connection configuration
const sequelize = new Sequelize({
  dialect: 'postgres', // Specify the PostgreSQL dialect
  host: process.env.REDSHIFT_HOST,
  port: process.env.REDSHIFT_PORT || 5439,
  database: process.env.REDSHIFT_DB,
  username: process.env.REDSHIFT_USER,
  password: process.env.REDSHIFT_PASSWORD,
  logging: false, // Disable logging
  dialectOptions: {
    ssl: true // Enable SSL for Redshift connections if needed
  }
});

// Define the Weather model
const Weather = sequelize.define('Weather', {
  stateid: { type: DataTypes.INTEGER, allowNull: false },
  districtid: { type: DataTypes.INTEGER, allowNull: false },
  State: { type: DataTypes.STRING, allowNull: false },
  state_dist_key: { type: DataTypes.STRING, allowNull: false },
  District: { type: DataTypes.STRING, allowNull: false },
  year_val: { type: DataTypes.INTEGER, allowNull: false },
  jan: DataTypes.FLOAT,
  feb: DataTypes.FLOAT,
  mar: DataTypes.FLOAT,
  apr: DataTypes.FLOAT,
  may: DataTypes.FLOAT,
  jun: DataTypes.FLOAT,
  jul: DataTypes.FLOAT,
  aug: DataTypes.FLOAT,
  sep: DataTypes.FLOAT,
  oct: DataTypes.FLOAT,
  nov: DataTypes.FLOAT,
  "dec": DataTypes.FLOAT // Use quotes for reserved keywords
});

module.exports = Weather;
