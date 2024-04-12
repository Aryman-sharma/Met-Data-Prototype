const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config');

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
  dec: DataTypes.FLOAT
});

module.exports = Weather;
