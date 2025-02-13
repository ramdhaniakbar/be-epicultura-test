"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.resolve(__dirname, "../config/config.js"))[env];

const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging || false, // Disabling logging if not set
    port: config.port || 5432, // Default PostgreSQL port
    pool: {
      max: config.pool?.max || 5,
      min: config.pool?.min || 0,
      acquire: config.pool?.acquire || 30000,
      idle: config.pool?.idle || 10000,
    },
  });
}

// Read all model files in the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Ignore hidden files
      file !== basename && // Ignore this index.js file
      file.slice(-3) === ".js" && // Only include JS files
      !file.includes(".test.js") // Exclude test files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Execute associations if defined in models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;